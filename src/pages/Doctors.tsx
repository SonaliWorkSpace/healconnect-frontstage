import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard, { DoctorCardSkeleton } from "@/components/DoctorCard";
import { doctors } from "@/data/mockData";

const specializations = ["All", ...new Set(doctors.map(d => d.specialization))];

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get("search") || "";
  const [search, setSearch] = useState(initial);
  const [spec, setSpec] = useState("All");
  const [minExp, setMinExp] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter(d => {
      const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchSpec = spec === "All" || d.specialization === spec;
      const matchExp = !minExp || d.experience >= Number(minExp);
      const matchFee = !maxFee || d.fee <= Number(maxFee);
      const matchRating = !minRating || d.rating >= Number(minRating);
      return matchSearch && matchSpec && matchExp && matchFee && matchRating;
    });
  }, [search, spec, minExp, maxFee, minRating]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 md:pt-28 section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Doctor</h1>
            <p className="text-foreground">Browse our verified specialists and book an appointment</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or specialization..."
              className="flex-1"
            />
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-card rounded-xl border border-border animate-fade-in">
              <Select value={spec} onValueChange={setSpec}>
                <SelectTrigger><SelectValue placeholder="Specialization" /></SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {specializations.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Min experience (yrs)" type="number" value={minExp} onChange={e => setMinExp(e.target.value)} />
              <Input placeholder="Max fee (₹)" type="number" value={maxFee} onChange={e => setMaxFee(e.target.value)} />
              <Input placeholder="Min rating" type="number" step="0.1" value={minRating} onChange={e => setMinRating(e.target.value)} />
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSpec("All"); setMinExp(""); setMaxFee(""); setMinRating(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
