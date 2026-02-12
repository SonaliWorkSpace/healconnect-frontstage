import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Doctor, Appointment } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  onClose: () => void;
}

export default function BookingModal({ doctor, selectedDate, selectedTime, onClose }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    name: user?.name || "",
    age: "",
    phone: user?.phone || "",
    symptoms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone || !form.symptoms) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDate,
      time: selectedTime,
      patientName: form.name,
      patientAge: Number(form.age),
      patientPhone: form.phone,
      symptoms: form.symptoms,
      status: "upcoming",
      fee: doctor.fee,
    };

    const existing = JSON.parse(localStorage.getItem("healconnect_appointments") || "[]");
    existing.push(appointment);
    localStorage.setItem("healconnect_appointments", JSON.stringify(existing));

    setStep("success");
    toast({ title: "Appointment booked successfully!" });
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
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555 0000" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea id="symptoms" value={form.symptoms} onChange={e => setForm(f => ({ ...f, symptoms: e.target.value }))} placeholder="Describe your symptoms..." rows={3} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Consultation Fee</span>
              <span className="text-lg font-bold text-foreground">₹{doctor.fee}</span>
            </div>
            <Button type="submit" className="w-full">Confirm Booking</Button>
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
