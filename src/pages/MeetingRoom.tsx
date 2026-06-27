import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Video, AlertCircle, Camera, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function MeetingRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadAppointment = async () => {
      setLoading(true);
      const appointmentDoc = await getDoc(doc(db, "appointments", id));
      if (!appointmentDoc.exists()) {
        toast({ title: "Meeting not found", variant: "destructive" });
        navigate("/dashboard");
        return;
      }
      setAppointment({ id: appointmentDoc.id, ...appointmentDoc.data() });
      setLoading(false);
    };

    loadAppointment();
  }, [id, navigate, toast]);

  const meetingTime = useMemo(() => {
    if (!appointment) return null;
    return new Date(`${appointment.date}T${appointment.time}`);
  }, [appointment]);

  const startCountdown = (target: Date) => {
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "The meeting is starting now.";
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  };

  const [countdown, setCountdown] = useState<string>("");

  const openExternalMeeting = () => {
    if (!appointment?.joinLink) {
      toast({ title: "No meeting link available", variant: "destructive" });
      return;
    }
    window.open(appointment.joinLink, "_blank");
  };

  const copyMeetingLink = async () => {
    if (!appointment?.joinLink) {
      toast({ title: "No meeting link available", variant: "destructive" });
      return;
    }

    try {
      await navigator.clipboard.writeText(appointment.joinLink);
      toast({ title: "Meeting link copied", description: "You can paste it into your browser or share it with participants." });
    } catch (error) {
      toast({ title: "Copy failed", description: "Please copy the link manually.", variant: "destructive" });
    }
  };

  const enableCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setCameraEnabled(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (error: any) {
      setCameraError(error?.message || "Unable to access camera");
      toast({ title: "Camera access failed", description: error?.message || "Allow camera access to enable webcam.", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (stream) {
      return () => {
        stream.getTracks().forEach((track) => track.stop());
      };
    }
    return undefined;
  }, [stream]);

  useEffect(() => {
    if (!meetingTime) return;

    const update = () => {
      setCountdown(startCountdown(meetingTime));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [meetingTime]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 md:pt-28 section-padding">
          <div className="container-custom max-w-3xl mx-auto text-center py-20">
            <p className="text-lg text-foreground">Loading meeting...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding pb-20">
        <div className="container-custom max-w-5xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/dashboard")}> 
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Button>

          <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Video Call Room</h1>
                <p className="mt-2 text-muted-foreground">
                  This is a fake meeting room. Your scheduled meeting details are shown below.
                </p>
              </div>
              <div className="rounded-3xl bg-primary/5 px-5 py-4 text-sm text-foreground">
                <p className="font-semibold">Starts on</p>
                <p>{new Date(`${appointment.date}T${appointment.time}`).toLocaleString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}</p>
                <p className="mt-2 text-sm text-primary">{countdown}</p>
              </div>
            </div>

            <div className="mt-10 rounded-[32px] bg-card p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Meeting Room</p>
                  <h2 className="text-2xl font-semibold text-foreground">{appointment.doctorName}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{appointment.specialization}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-[0.18em] text-secondary-foreground">
                  {appointment.meetingProvider === "zoom" ? "Zoom" : "Google Meet"}
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Scheduled</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{appointment.date}</p>
                  <p className="text-sm text-muted-foreground mt-1">At {appointment.time}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Patient</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{appointment.patientEmail}</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-border bg-card p-6">
                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-3xl border border-border bg-background p-4">
                    <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-950/5">
                      <video
                        ref={videoRef}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                      />
                      {!cameraEnabled && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/90 text-center text-foreground">
                          <Camera className="h-10 w-10" />
                          <p className="text-sm">Enable your webcam to preview the call.</p>
                          <Button variant="secondary" onClick={enableCamera}>
                            Turn on camera
                          </Button>
                        </div>
                      )}
                    </div>
                    {cameraError && (
                      <p className="mt-3 text-sm text-destructive">{cameraError}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="inline-flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        <span>{cameraEnabled ? "Webcam active" : "Webcam off"}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <span>Audio preview enabled</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border bg-background p-6 text-center flex flex-col justify-between">
                    <div>
                      <p className="text-foreground text-lg font-semibold">Scheduled Meeting</p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Click the button below to open the real scheduled meeting in {appointment.meetingProvider === "zoom" ? "Zoom" : "Google Meet"}.
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button className="w-full sm:w-auto" onClick={openExternalMeeting}>
                        Launch video call
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto" onClick={copyMeetingLink}>
                        Copy meeting link
                      </Button>
                    </div>
                    {appointment.joinLink && (
                      <p className="mt-4 text-xs text-muted-foreground break-all">
                        {appointment.joinLink}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
