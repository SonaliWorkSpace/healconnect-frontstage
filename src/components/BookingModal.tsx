import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Doctor, Appointment } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

const RAZORPAY_KEY = "rzp_test_SefovVVcRCxv1X";
const RAZORPAY_SCRIPT_ID = "razorpay-sdk";
const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

async function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) return true;

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


interface Props {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  onClose: () => void;
}

export default function BookingModal({ doctor, selectedDate, selectedTime, onClose }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [isProcessing, setIsProcessing] = useState(false);
  const [meetingProvider, setMeetingProvider] = useState<"google-meet" | "zoom">("google-meet");
  const [form, setForm] = useState({
    name: user?.displayName || "",
    age: "",
    email: user?.email || "",
    symptoms: "",
  });

  const createVideoLink = (provider: string, date: string, time: string) => {
    const seed = `${doctor.id}-${date}-${time}-${provider}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }

    const getRandomString = (length: number) => {
      const chars = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      let value = Math.abs(hash);
      for (let i = 0; i < length; i += 1) {
        result += chars[value % chars.length];
        value = Math.floor(value / chars.length) || value + i + 1;
      }
      return result;
    };

    const getRandomDigits = (length: number) => {
      let result = "";
      let value = Math.abs(hash);
      for (let i = 0; i < length; i += 1) {
        result += String((value % 10) || 1);
        value = Math.floor(value / 10) || value + i + 1;
      }
      return result;
    };

    if (provider === "zoom") {
      return `https://zoom.us/j/${getRandomDigits(10)}`;
    }

    return `https://meet.google.com/${getRandomString(3)}-${getRandomString(4)}-${getRandomString(3)}`;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.age || !form.email || !form.symptoms) {
    toast({ title: "Please fill all fields", variant: "destructive" });
    return;
  }

  if (!auth.currentUser) {
    toast({ title: "Please login again", variant: "destructive" });
    return;
  }

  setIsProcessing(true);

  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded || !window.Razorpay) {
    setIsProcessing(false);
    toast({ title: "Unable to load Razorpay", description: "Please try again later.", variant: "destructive" });
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: doctor.fee * 100,
    currency: "INR",
    name: "HealConnect",
    description: `Consultation with ${doctor.name}`,
    handler: async (response: any) => {
      try {
        const joinLink = createVideoLink(meetingProvider, selectedDate, selectedTime);
        const appointmentData: Record<string, any> = {
          userId: auth.currentUser?.uid,
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialization: doctor.specialization,
          date: selectedDate,
          time: selectedTime,
          patientName: form.name,
          patientAge: Number(form.age),
          patientEmail: form.email,
          symptoms: form.symptoms,
          status: "upcoming",
          fee: doctor.fee,
          paymentId: response.razorpay_payment_id,
          meetingProvider,
          joinLink,
          createdAt: Timestamp.now(),
        };

        if (response.razorpay_order_id) {
          appointmentData.paymentOrderId = response.razorpay_order_id;
        }
        if (response.razorpay_signature) {
          appointmentData.paymentSignature = response.razorpay_signature;
        }

        await addDoc(collection(db, "appointments"), appointmentData);

        toast({ title: "Appointment booked successfully!" });

        sessionStorage.setItem("healconnect_payment_confirmation", JSON.stringify({
          title: `Appointment with ${doctor.name}`,
          amount: doctor.fee,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id || "",
          completedAt: new Date().toISOString(),
          details: {
            Date: selectedDate,
            Time: selectedTime,
            Doctor: doctor.name,
          },
        }));

        navigate("/payment-success");
      } catch (error: any) {
        console.error("Appointment save error:", error);
        toast({ title: "Appointment save failed", description: error?.message ?? "Please try again.", variant: "destructive" });
      }
    },
    prefill: {
      name: form.name,
      email: form.email,
    },
    notes: {
      doctorId: doctor.id,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
    },
    theme: {
      color: "#2563eb",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
  setIsProcessing(false);
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {step === "form" ? "Book Appointment" : "Booking Confirmed!"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
              <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-medium text-foreground text-sm">{doctor.name}</p>
                <p className="text-xs text-muted-foreground">{selectedDate} at {selectedTime}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder="30" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="meeting-provider">Meeting Provider</Label>
              <select
                id="meeting-provider"
                value={meetingProvider}
                onChange={(e) => setMeetingProvider(e.target.value as "google-meet" | "zoom")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="google-meet">Google Meet</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea id="symptoms" value={form.symptoms} onChange={e => setForm(f => ({ ...f, symptoms: e.target.value }))} placeholder="Describe your symptoms..." rows={3} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Consultation Fee</span>
              <span className="text-lg font-bold text-foreground">₹{doctor.fee}</span>
            </div>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing Payment..." : "Confirm Booking"}
            </Button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Appointment Booked!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your appointment with {doctor.name} on {selectedDate} at {selectedTime} has been confirmed.
              </p>
            </div>
            <Button onClick={onClose} className="w-full">Done</Button>
          </div>
        )}
      </div>
    </div>
  );
}
