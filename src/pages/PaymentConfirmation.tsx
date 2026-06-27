import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PaymentConfirmationData {
  title?: string;
  planName?: string;
  amount: number;
  paymentId: string;
  orderId?: string;
  signature?: string;
  completedAt: string;
  details?: Record<string, string>;
}

export default function PaymentConfirmation() {
  const [confirmation, setConfirmation] = useState<PaymentConfirmationData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("healconnect_payment_confirmation");
    if (stored) {
      setConfirmation(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding pb-20">
        <div className="container-custom max-w-xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-10 shadow-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Payment Successful</h1>
            <p className="text-foreground text-sm mb-8">
              Your payment has been processed successfully. Thank you for choosing HealConnect.
            </p>

            {confirmation ? (
              <div className="space-y-4 rounded-3xl border border-border bg-background p-6 text-left text-sm text-foreground">
                {confirmation.title && (
                  <div>
                    <p className="font-semibold">Payment For</p>
                    <p>{confirmation.title}</p>
                  </div>
                )}
                {confirmation.planName && (
                  <div>
                    <p className="font-semibold">Plan</p>
                    <p>{confirmation.planName}</p>
                  </div>
                )}
                <div>
                  <p className="font-semibold">Amount</p>
                  <p>₹{confirmation.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Payment ID</p>
                  <p>{confirmation.paymentId}</p>
                </div>
                {confirmation.orderId && (
                  <div>
                    <p className="font-semibold">Order ID</p>
                    <p>{confirmation.orderId}</p>
                  </div>
                )}
                {confirmation.details && (
                  <div className="space-y-2 rounded-2xl border border-border bg-secondary/5 p-4">
                    {Object.entries(confirmation.details).map(([label, value]) => (
                      <div key={label}>
                        <p className="font-semibold">{label}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <p className="font-semibold">Completed At</p>
                  <p>{new Date(confirmation.completedAt).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-secondary/5 p-6 text-sm text-muted-foreground">
                No payment details are available. Please return to pricing and try again.
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/pricing">
                <Button className="w-full sm:w-auto">Back to Pricing</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full sm:w-auto">Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
