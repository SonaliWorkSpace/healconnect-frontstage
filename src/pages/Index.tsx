import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Stethoscope, Sparkles, Heart, Baby, Bone, Brain, ArrowRight, Star, ChevronDown, ChevronUp, UserCheck, CalendarCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, testimonials, faqs } from "@/data/mockData";
import heroImage from "@/assets/hero-doctor.png";

const iconMap: Record<string, any> = { Stethoscope, Sparkles, Heart, Baby, Bone, Brain };

const steps = [
  { icon: Search, title: "Search Doctor", desc: "Browse our curated list of verified specialists across all medical fields." },
  { icon: CalendarCheck, title: "Book Appointment", desc: "Choose a convenient time slot and book your consultation in seconds." },
  { icon: Video, title: "Get Consultation", desc: "Connect with your doctor via video call or visit in-person at the clinic." },
];

export default function Index() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = () => {
    navigate(`/doctors?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <div className="container-custom relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
                <UserCheck className="w-4 h-4" /> Trusted by 50,000+ patients
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Book Trusted Doctors{" "}
                <span className="gradient-text">in Minutes</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Consult experienced specialists from the comfort of your home. Easy booking, verified doctors, and quality healthcare at your fingertips.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" onClick={() => navigate("/doctors")}>
                  Book Appointment <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="hero-outline" onClick={() => navigate("/doctors")}>
                  Explore Doctors
                </Button>
              </div>

              <div className="flex items-center gap-2 bg-card rounded-xl border border-border p-2 max-w-md shadow-sm">
                <Search className="w-5 h-5 text-muted-foreground ml-2" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="Search by specialization..."
                  className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
                />
                <Button size="sm" onClick={handleSearch}>Search</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={heroImage} alt="Doctor consultation" className="w-full rounded-2xl animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Browse by Specialization</h2>
            <p className="text-muted-foreground">Find the right doctor for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => {
              const Icon = iconMap[cat.icon] || Stethoscope;
              return (
                <Link
                  key={cat.name}
                  to={`/doctors?search=${encodeURIComponent(cat.name)}`}
                  className="bg-background rounded-xl p-5 text-center hover-lift border border-border group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} doctors</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to get quality healthcare</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center p-6 bg-card rounded-xl border border-border hover-lift">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">What Our Patients Say</h2>
            <p className="text-muted-foreground">Real experiences from real patients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background rounded-xl p-6 border border-border hover-lift">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Got questions? We've got answers</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground animate-fade-in">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
