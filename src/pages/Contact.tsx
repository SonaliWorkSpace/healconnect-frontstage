import { useState } from "react";
import { Send, Stethoscope, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const specializations = ["General Physician", "Dermatologist", "Cardiologist", "Pediatrician", "Orthopedic", "Neurologist", "Other"];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    clinic: "",
    message: "",
  });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.specialization || !form.message) {
    toast({ title: "Please fill all required fields", variant: "destructive" });
    return;
  }

  try {
    await emailjs.send(
      "service_qay6imw",
      "template_3urq7xm",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        specialization: form.specialization,
        experience: form.experience,
        clinic: form.clinic,
        message: form.message,
      },
      "gl9OJJUSoKJFeFWNU"
    );

    setSubmitted(true);
    toast({ title: "Request submitted successfully!" });

  } catch (error) {
    toast({
      title: "Something went wrong!",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};


  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Stethoscope className="w-4 h-4" /> JOIN US
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Join HealConnect</h1>
            <p className="text-foreground max-w-lg mx-auto">
              Are you a doctor looking to expand your practice? Fill out the form below and our team will set up your profile.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Info sidebar */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-bold text-foreground">Why join us?</h3>
                <ul className=" space-y-4 text-sm text-foreground">
                  {[
                    "Reach thousands of patients online",
                    "Manage appointments effortlessly",
                    "Build your professional profile",
                    "Get verified doctor badge",
                    "Free onboarding support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-3">
                <h3 className="font-bold text-foreground">Contact Info</h3>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Mail className="w-4 h-4 text-primary" /> doctors@healconnect.com
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="w-4 h-4 text-primary" /> 8673546782, 9652974643
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {submitted ? (
                <div className="bg-card rounded-2xl border border-border p-10 text-center animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-success" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Request Submitted!</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you, Dr. {form.name}. Our team will review your application and get back to you within 24–48 hours.
                  </p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", specialization: "", experience: "", clinic: "", message: "" }); }}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-4 ">
                    <div className="space-y-1  ">
                      <Label htmlFor="name" className="font-bold">Full Name *</Label>
                      <Input id="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Dr. John Smith" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="font-bold">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="doctor@example.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="font-bold">Phone Number</Label>
                      <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 555 0000" />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-bold">Specialization *</Label>
                      <Select value={form.specialization} onValueChange={v => update("specialization", v)}>
                        <SelectTrigger><SelectValue placeholder="Select specialization" /></SelectTrigger>
                        <SelectContent className="bg-popover border border-border z-50">
                          {specializations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="experience" className="font-bold">Years of Experience</Label>
                      <Input id="experience" type="number" value={form.experience} onChange={e => update("experience", e.target.value)} placeholder="10" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="clinic" className="font-bold">Clinic / Hospital</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="clinic" className="pl-9" value={form.clinic} onChange={e => update("clinic", e.target.value)} placeholder="ABC Medical Center" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="font-bold">Tell us about yourself *</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={e => update("message", e.target.value)}
                      placeholder="Briefly describe your qualifications, areas of expertise, and why you'd like to join HealConnect..."
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" /> Submit Request
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
