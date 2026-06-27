import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/mockData";

interface Props {
  doctor: Doctor;
  loading?: boolean;
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
      <div className="h-10 bg-muted rounded-lg" />
    </div>
  );
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover-lift group">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{doctor.name}</h3>
          <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">{doctor.experience}+ years exp.</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-medium text-foreground">{doctor.rating}</span>
            <span className="text-foreground">({doctor.reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">{doctor.location}</span>
          <span className="font-bold text-foreground">₹{doctor.fee}</span>
        </div>
      </div>

      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
        <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
      </Button>
    </div>
  );
}
