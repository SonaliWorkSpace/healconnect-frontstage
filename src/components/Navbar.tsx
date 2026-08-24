import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Stethoscope, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

const handleLogout = async () => {
  await logout();
  navigate("/");
};


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-card/90 backdrop-blur-lg shadow-md border-b border-border" : "bg-transparent"
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Heal<span className="text-primary">Connect</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/doctors" className="text-sm font-bold text-foreground hover:text-foreground transition-colors">Doctors</Link>
            <Link to="/contact" className="text-sm font-bold text-foreground hover:text-foreground transition-colors">Join Us</Link>
            <Link to="/pricing" className="text-sm font-bold text-foreground hover:text-foreground transition-colors">Pricing</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-sm font-bold text-foreground hover:text-foreground transition-colors">Dashboard</Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleDark} className="rounded-full">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
           {isAuthenticated ? (
  <div className="flex items-center gap-3">
    <Link
      to="/dashboard"
      className="flex items-center gap-2 text-sm font-medium text-foreground"
    >
      <User className="w-4 h-4" />
      {user?.displayName || user?.email}
    </Link>

    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="w-4 h-4 mr-1" /> Logout
    </Button>
  </div>
) : (

              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Login</Button>
                <Button size="sm" onClick={() => navigate("/signup")}>Sign Up</Button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDark} className="rounded-full">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-full">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="container-custom py-4 space-y-3">
            <Link to="/" className="block text-sm font-bold text-foreground py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/doctors" className="block text-sm font-bold text-foreground py-2" onClick={() => setIsOpen(false)}>Doctors</Link>
            <Link to="/contact" className="block text-sm font-bold text-foreground py-2" onClick={() => setIsOpen(false)}>Join Us</Link>
            <Link to="/pricing" className="block text-sm font-bold text-foreground py-2" onClick={() => setIsOpen(false)}>Pricing</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="block text-sm font-bold text-foreground py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
            <div className="pt-2 border-t border-border space-y-2">
              {isAuthenticated ? (
                <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={() => { navigate("/login"); setIsOpen(false); }}>Login</Button>
                  <Button className="w-full" onClick={() => { navigate("/signup"); setIsOpen(false); }}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
