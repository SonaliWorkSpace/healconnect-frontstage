import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  savings?: string | null;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 999,
    duration: "1 Month",
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
    duration: "6 Months",
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
    duration: "12 Months",
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

const RAZORPAY_KEY = "rzp_test_SefovVVcRCxv1X";
const RAZORPAY_SCRIPT_ID = "razorpay-sdk";
const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

async function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const existingScript = document.getElementById(RAZORPAY_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = RAZORPAY_SCRIPT_ID;
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get("plan") || "monthly";
  const plan = plans.find((item) => item.id === planId) ?? plans[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      setError("Unable to load Razorpay checkout. Please try again later.");
      setLoading(false);
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: plan.price * 100,
      currency: "INR",
      name: "HealConnect",
      description: `${plan.name} subscription`,
      image: "",
      handler: function (response: any) {
        const confirmation = {
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          paymentId: response.razorpay_payment_id,
          razorpayPaymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          razorpayOrderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          razorpaySignature: response.razorpay_signature,
          completedAt: new Date().toISOString(),
        };
        sessionStorage.setItem("healconnect_payment_confirmation", JSON.stringify(confirmation));
        navigate("/payment-success");
      },
      notes: {
        planId: plan.id,
      },
      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding pb-20">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="mb-10 lg:flex lg:items-center lg:justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
                Razorpay Test Mode
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Complete Your Payment
              </h1>
              <p className="text-foreground text-lg max-w-2xl">
                You selected the <span className="font-semibold">{plan.name}</span> plan. Proceed with Razorpay test checkout to confirm your subscription.
              </p>
            </div>
            <Button variant="outline" className="mt-6 lg:mt-0" onClick={() => navigate("/pricing")}> 
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
            </Button>
          </div>

          <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">Selected Plan</p>
                <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">{plan.duration}</p>
              </div>
              <div>
                <div className="rounded-3xl bg-primary/5 px-5 py-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="rounded-2xl border border-border p-4 text-sm text-foreground">
                  {feature}
                </div>
              ))}
            </div>

            {plan.savings && (
              <div className="mt-8 rounded-3xl bg-secondary/10 px-5 py-4 text-sm font-medium text-foreground">
                {plan.savings}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button className="w-full sm:w-auto" onClick={handleCheckout} disabled={loading}>
                {loading ? "Loading Razorpay..." : "Pay with Razorpay"}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/pricing")}>Choose another plan</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
