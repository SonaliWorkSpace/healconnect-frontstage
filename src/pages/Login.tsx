import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


export default function Login() {
  // const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    toast({ title: "Please fill all fields", variant: "destructive" });
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    toast({ title: "Welcome back!" });
    navigate("/dashboard");

  } catch (error) {
    toast({ title: "Invalid credentials", variant: "destructive" });
  }
};

const handleForgotPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!forgotPasswordEmail) {
    toast({ title: "Please enter your email address", variant: "destructive" });
    return;
  }

  setIsResettingPassword(true);

  try {
    await sendPasswordResetEmail(auth, forgotPasswordEmail);
    toast({ title: "Password reset email sent!", description: "Check your email for instructions to reset your password." });
    setForgotPasswordOpen(false);
    setForgotPasswordEmail("");
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      toast({ title: "Email not found", description: "No account found with this email address.", variant: "destructive" });
    } else if (error.code === "auth/invalid-email") {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
    } else {
      toast({ title: "Error", description: "Failed to send password reset email. Please try again.", variant: "destructive" });
    }
  } finally {
    setIsResettingPassword(false);
  }
};


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Heal<span className="text-primary">Connect</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-foreground text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="font-bold">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="font-bold">Password</Label>
              <div className="relative">
                <Input id="password" type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setForgotPasswordOpen(true)} 
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <p className="text-center text-sm text-foreground mt-4">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Your Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="font-bold">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isResettingPassword}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isResettingPassword}
            >
              {isResettingPassword && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isResettingPassword ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
