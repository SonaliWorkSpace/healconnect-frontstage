import { useState, useEffect } from "react";
import { CalendarCheck, Clock, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";



export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🔐 Protect Route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📥 Fetch Appointments From Firestore
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "appointments"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(data);
    });

    return () => unsubscribe();
  }, []);

  // ❌ Cancel Appointment (Firestore Update)
  const cancelAppointment = async (id: string) => {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status: "cancelled",
      });

      toast({ title: "Appointment cancelled" });
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  const openMeetingLink = (id?: string) => {
    if (!id) {
      toast({ title: "No meeting selected", variant: "destructive" });
      return;
    }
    navigate(`/meeting/${id}`);
  };

  const upcoming = appointments.filter((a) => a.status === "upcoming");

  const past = appointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Welcome, {user?.displayName}
            </h1>
            <p className="text-muted-foreground">Manage your appointments</p>
          </div>

          {/* Upcoming */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-primary" /> Upcoming
              Appointments
            </h2>
            {upcoming.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No upcoming appointments
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((a) => (
                  <div
                    key={a.id}
                    className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-primary/50"
                    onClick={() => openMeetingLink(a.id)}
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {a.doctorName}
                      </h3>
                      <p className="text-sm text-primary">{a.specialization}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarCheck className="w-3.5 h-3.5" /> {a.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {a.time}
                        </span>
                      </div>
                      {a.meetingProvider && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Meeting via {a.meetingProvider === "zoom" ? "Zoom" : "Google Meet"}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Symptoms: {a.symptoms}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">
                        ₹{a.fee}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openMeetingLink(a.id);
                        }}
                      >
                        Join
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelAppointment(a.id);
                        }}
                      >
                        <X className="w-3 h-3 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" /> Past
              Appointments
            </h2>
            {past.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <p className="text-muted-foreground">No past appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {past.map((a) => (
                  <div
                    key={a.id}
                    className="bg-card rounded-xl border border-border p-5 opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {a.doctorName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {a.specialization} • {a.date} at {a.time}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          a.status === "cancelled"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
