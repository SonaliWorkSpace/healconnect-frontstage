import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Crown, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 999,
    period: "/month",
    duration: "1 Month",
    icon: Zap,
    popular: false,
    savings: null,
    features: [
      "Profile listed on HealConnect",
      "Up to 50 appointment bookings",
      "Basic analytics dashboard",
      "Email support",
      "Patient reviews enabled",
    ],
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    price: 4999,
    period: "/6 months",
    duration: "6 Months",
    icon: Star,
    popular: true,
    savings: "Save ₹995",
    features: [
      "Everything in Monthly",
      "Unlimited appointment bookings",
      "Advanced analytics & insights",
      "Priority support",
      "Featured badge on profile",
      "Top search placement",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 8999,
    period: "/year",
    duration: "12 Months",
    icon: Crown,
    popular: false,
    savings: "Save ₹2,989",
    features: [
      "Everything in Half-Yearly",
      "Unlimited bookings & features",
      "Dedicated account manager",
      "Custom profile branding",
      "Video consultation support",
      "Priority listing in all searches",
      "Exclusive webinar access",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    const subscription = {
      id: crypto.randomUUID(),
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      subscribedAt: new Date().toISOString(),
      expiresAt: getExpiryDate(plan.id),
      status: "active",
    };

    const existing = JSON.parse(localStorage.getItem("healconnect_subscriptions") || "[]");
    existing.push(subscription);
    localStorage.setItem("healconnect_subscriptions", JSON.stringify(existing));

    setShowSuccess(true);
    toast({
      title: "Subscription Activated!",
      description: `You've subscribed to the ${plan.name} plan.`,
    });
  };

  const getExpiryDate = (planId: string) => {
    const now = new Date();
    if (planId === "monthly") now.setMonth(now.getMonth() + 1);
    else if (planId === "half-yearly") now.setMonth(now.getMonth() + 6);
    else now.setFullYear(now.getFullYear() + 1);
    return now.toISOString();
  };

  if (showSuccess) {
    const plan = plans.find((p) => p.id === selectedPlan);
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 md:pt-28 section-padding">
          <div className="container-custom max-w-lg text-center">
            <div className="bg-card rounded-2xl border border-border p-10 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Subscription Activated!</h1>
              <p className="text-muted-foreground mb-4">
                Your <span className="font-semibold text-foreground">{plan?.name}</span> plan is now active. Your profile will be listed on HealConnect.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Expires on: {new Date(getExpiryDate(selectedPlan!)).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <Button onClick={() => setShowSuccess(false)}>Back to Plans</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
              <Shield className="w-3.5 h-3.5 mr-1.5" /> For Doctors
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h1>
            <p className="text-foreground text-lg">
              Subscribe to list your profile on HealConnect and start receiving patient bookings. Cancel anytime.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-card rounded-2xl border p-6 md:p-8 transition-all hover:shadow-xl hover:-translate-y-1 ${
                    plan.popular ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold shadow-md">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{plan.name}</h3>
                      <p className="text-xs font-semibold text-foreground">{plan.duration}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                      <span className="text-sm font-medium text-foreground">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <p className="text-xs text-primary font-medium mt-1">{plan.savings}</p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate(`/payment?plan=${plan.id}`)}
                  >
                    Join Us
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Note */}
          <p className="text-center text-sm font-bold text-foreground mt-10 max-w-xl mx-auto">
            Once your subscription expires, your profile will be removed from the platform. Renew anytime to stay listed and continue receiving appointments.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
