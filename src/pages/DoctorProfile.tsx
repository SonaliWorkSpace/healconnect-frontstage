import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Award, ChevronLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { doctors } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const doctor = doctors.find(d => d.id === id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Doctor not found</h1>
          <Button onClick={() => navigate("/doctors")}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  const today = new Date();
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!selectedDate || !selectedTime) return;
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding">
        <div className="container-custom max-w-4xl">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/doctors")}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Doctors
          </Button>

          {/* Header */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-2xl object-cover ring-4 ring-primary/10" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
                <p className="text-primary font-medium mt-1">{doctor.specialization}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {doctor.experience}+ years</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {doctor.location}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-warning text-warning" /> {doctor.rating} ({doctor.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {doctor.languages.map(l => (
                    <span key={l} className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">{l}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Consultation Fee</p>
                <p className="text-2xl font-bold text-foreground">₹{doctor.fee}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{doctor.about}</p>
              </div>

              {/* Qualifications */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Qualifications</h2>
                <ul className="space-y-2">
                  {doctor.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience Timeline */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Experience</h2>
                <div className="space-y-4">
                  {doctor.experienceTimeline.map((exp, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {i < doctor.experienceTimeline.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-xs font-medium text-primary">{exp.year}</p>
                        <p className="font-medium text-foreground text-sm">{exp.title}</p>
                        <p className="text-xs text-muted-foreground">{exp.place}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Patient Reviews</h2>
                <div className="space-y-4">
                  {doctor.patientReviews.map((r, i) => (
                    <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-foreground">{r.name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Book Appointment
                </h2>

                <div className="space-y-3 mb-4">
                  <p className="text-sm font-medium text-foreground">Select Date</p>
                  <div className="grid grid-cols-3 gap-2">
                    {dates.map(d => {
                      const day = new Date(d);
                      return (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`text-center p-2 rounded-lg border text-xs transition-all ${
                            selectedDate === d ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          <div className="font-medium">{day.toLocaleDateString("en", { weekday: "short" })}</div>
                          <div>{day.getDate()}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-foreground">Select Time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availableSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`text-center p-2 rounded-lg border text-xs transition-all ${
                          selectedTime === time ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleBook}
                >
                  {!isAuthenticated ? "Login to Book" : "Book Appointment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          doctor={doctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onClose={() => setShowBooking(false)}
        />
      )}

      <Footer />
    </div>
  );
}
