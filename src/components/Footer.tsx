import { Link } from "react-router-dom";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Heal<span className="text-primary">Connect</span></span>
            </Link>
            <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
              Book trusted doctors in minutes. Consult experienced specialists from the comfort of your home.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/doctors" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Find Doctors</Link></li>
              <li><Link to="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">My Appointments</Link></li>
              <li><Link to="/contact" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Join Us</Link></li>
              <li><Link to="/pricing" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Specializations</h4>
            <ul className="space-y-2">
              {["General Physician", "Cardiologist", "Dermatologist", "Pediatrician","Neurologist","Orthopedic"].map(s => (
                <li key={s}><Link to="/doctors" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" /> support@healconnect.com
              </li>
              <li className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" /> 8397645129, 9876534729
              </li>
              <li className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> Bhubaneswar, Odisha, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 font-bold border-t border-border text-center text-sm text-muted-foreground">
          © 2026 HealConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
