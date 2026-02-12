export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  image: string;
  about: string;
  qualifications: string[];
  languages: string[];
  location: string;
  availableSlots: string[];
  experienceTimeline: { year: string; title: string; place: string }[];
  patientReviews: { name: string; rating: number; comment: string; date: string }[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  symptoms: string;
  status: "upcoming" | "completed" | "cancelled";
  fee: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const categories = [
  { name: "General Physician", icon: "Stethoscope", count: 45 },
  { name: "Dermatologist", icon: "Sparkles", count: 32 },
  { name: "Cardiologist", icon: "Heart", count: 28 },
  { name: "Pediatrician", icon: "Baby", count: 36 },
  { name: "Orthopedic", icon: "Bone", count: 22 },
  { name: "Neurologist", icon: "Brain", count: 18 },
];

const doctorImages = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964e05a?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop&crop=face",
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialization: "General Physician",
    experience: 12,
    rating: 4.8,
    reviews: 234,
    fee: 500,
    image: doctorImages[0],
    about: "Dr. Sarah Mitchell is a highly experienced general physician with over 12 years of practice. She specializes in preventive medicine, chronic disease management, and holistic patient care.",
    qualifications: ["MBBS - Harvard Medical School", "MD Internal Medicine - Johns Hopkins", "Fellowship in Preventive Medicine"],
    languages: ["English", "Spanish"],
    location: "New York, NY",
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"],
    experienceTimeline: [
      { year: "2012", title: "Residency", place: "Johns Hopkins Hospital" },
      { year: "2015", title: "Senior Physician", place: "Mayo Clinic" },
      { year: "2019", title: "Head of Internal Medicine", place: "NYC Medical Center" },
    ],
    patientReviews: [
      { name: "John D.", rating: 5, comment: "Dr. Mitchell is incredibly thorough and caring. She took the time to explain everything.", date: "2025-01-15" },
      { name: "Maria S.", rating: 5, comment: "Best doctor I've ever visited. Very professional and knowledgeable.", date: "2025-01-10" },
      { name: "Robert K.", rating: 4, comment: "Great experience overall. Short wait time and excellent consultation.", date: "2024-12-28" },
    ],
  },
  {
    id: "2",
    name: "Dr. James Chen",
    specialization: "Cardiologist",
    experience: 15,
    rating: 4.9,
    reviews: 312,
    fee: 800,
    image: doctorImages[2],
    about: "Dr. James Chen is a renowned cardiologist specializing in interventional cardiology. With 15 years of experience, he has performed thousands of cardiac procedures.",
    qualifications: ["MBBS - Stanford University", "MD Cardiology - Cleveland Clinic", "DM Interventional Cardiology"],
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    availableSlots: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00"],
    experienceTimeline: [
      { year: "2009", title: "Cardiology Fellow", place: "Cleveland Clinic" },
      { year: "2013", title: "Interventional Cardiologist", place: "UCSF Medical Center" },
      { year: "2020", title: "Chief of Cardiology", place: "SF Heart Institute" },
    ],
    patientReviews: [
      { name: "Alice W.", rating: 5, comment: "Dr. Chen saved my life. His expertise in cardiac care is unmatched.", date: "2025-01-20" },
      { name: "David L.", rating: 5, comment: "Extremely knowledgeable and patient. Explained my condition in detail.", date: "2025-01-05" },
    ],
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experience: 8,
    rating: 4.7,
    reviews: 189,
    fee: 600,
    image: doctorImages[1],
    about: "Dr. Priya Sharma is a board-certified dermatologist with expertise in cosmetic and clinical dermatology. She offers advanced treatments for various skin conditions.",
    qualifications: ["MBBS - AIIMS Delhi", "MD Dermatology - Yale University", "Fellowship in Cosmetic Dermatology"],
    languages: ["English", "Hindi"],
    location: "Los Angeles, CA",
    availableSlots: ["09:00", "09:30", "10:00", "11:00", "11:30", "14:00", "15:00", "15:30"],
    experienceTimeline: [
      { year: "2016", title: "Dermatology Resident", place: "Yale-New Haven Hospital" },
      { year: "2019", title: "Consultant Dermatologist", place: "LA Skin Clinic" },
      { year: "2022", title: "Director", place: "SkinGlow Dermatology" },
    ],
    patientReviews: [
      { name: "Sophie T.", rating: 5, comment: "My skin has never looked better! Dr. Sharma is a miracle worker.", date: "2025-01-18" },
      { name: "Emma R.", rating: 4, comment: "Professional and skilled. The clinic is also very well maintained.", date: "2024-12-30" },
    ],
  },
  {
    id: "4",
    name: "Dr. Michael Torres",
    specialization: "Pediatrician",
    experience: 10,
    rating: 4.8,
    reviews: 267,
    fee: 450,
    image: doctorImages[4],
    about: "Dr. Michael Torres is a compassionate pediatrician who has been caring for children for over a decade. He specializes in developmental pediatrics and childhood nutrition.",
    qualifications: ["MBBS - Columbia University", "MD Pediatrics - Children's Hospital Philadelphia", "Board Certified Pediatrician"],
    languages: ["English", "Portuguese"],
    location: "Miami, FL",
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2014", title: "Pediatric Resident", place: "Children's Hospital Philadelphia" },
      { year: "2017", title: "Pediatrician", place: "Miami Children's Hospital" },
      { year: "2021", title: "Head of Pediatrics", place: "Sunshine Kids Clinic" },
    ],
    patientReviews: [
      { name: "Jennifer M.", rating: 5, comment: "My kids love Dr. Torres! He's so gentle and patient with them.", date: "2025-01-12" },
      { name: "Carlos P.", rating: 5, comment: "The best pediatrician in Miami. Highly recommended!", date: "2025-01-08" },
    ],
  },
  {
    id: "5",
    name: "Dr. Emily Watson",
    specialization: "Orthopedic",
    experience: 14,
    rating: 4.6,
    reviews: 198,
    fee: 700,
    image: doctorImages[5],
    about: "Dr. Emily Watson is an orthopedic surgeon specializing in sports medicine and joint replacement. She has helped numerous athletes return to peak performance.",
    qualifications: ["MBBS - Duke University", "MS Orthopedics - Hospital for Special Surgery", "Fellowship in Sports Medicine"],
    languages: ["English", "French"],
    location: "Chicago, IL",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"],
    experienceTimeline: [
      { year: "2010", title: "Orthopedic Resident", place: "Hospital for Special Surgery" },
      { year: "2014", title: "Sports Medicine Surgeon", place: "Chicago Sports Clinic" },
      { year: "2020", title: "Chief Orthopedic Surgeon", place: "Midwest Ortho Center" },
    ],
    patientReviews: [
      { name: "Mark J.", rating: 5, comment: "Dr. Watson fixed my ACL tear and I'm back to running marathons!", date: "2025-01-14" },
      { name: "Lisa K.", rating: 4, comment: "Very professional. The recovery plan she created was excellent.", date: "2024-12-25" },
    ],
  },
  {
    id: "6",
    name: "Dr. Raj Patel",
    specialization: "Neurologist",
    experience: 18,
    rating: 4.9,
    reviews: 345,
    fee: 900,
    image: doctorImages[6],
    about: "Dr. Raj Patel is a leading neurologist with nearly two decades of experience treating complex neurological conditions. He specializes in movement disorders and neuroimmunology.",
    qualifications: ["MBBS - Oxford University", "MD Neurology - Massachusetts General Hospital", "DM Neuroimmunology"],
    languages: ["English", "Gujarati", "Hindi"],
    location: "Boston, MA",
    availableSlots: ["09:00", "10:00", "10:30", "11:00", "14:00", "15:00"],
    experienceTimeline: [
      { year: "2006", title: "Neurology Resident", place: "Massachusetts General Hospital" },
      { year: "2010", title: "Neurologist", place: "Harvard Medical School" },
      { year: "2018", title: "Chief of Neurology", place: "Boston Neuro Institute" },
    ],
    patientReviews: [
      { name: "Thomas B.", rating: 5, comment: "Dr. Patel is a brilliant neurologist. He diagnosed my condition when others couldn't.", date: "2025-01-22" },
      { name: "Nancy W.", rating: 5, comment: "Exceptional care and attention to detail. Truly one of the best.", date: "2025-01-16" },
    ],
  },
  {
    id: "7",
    name: "Dr. Amanda Foster",
    specialization: "General Physician",
    experience: 6,
    rating: 4.5,
    reviews: 124,
    fee: 400,
    image: doctorImages[3],
    about: "Dr. Amanda Foster is a dedicated general physician focusing on family medicine and women's health. She believes in personalized, evidence-based treatment approaches.",
    qualifications: ["MBBS - UCLA", "MD Family Medicine - Cedars-Sinai"],
    languages: ["English"],
    location: "Seattle, WA",
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    experienceTimeline: [
      { year: "2018", title: "Family Medicine Resident", place: "Cedars-Sinai Medical Center" },
      { year: "2021", title: "General Physician", place: "Seattle Family Health" },
    ],
    patientReviews: [
      { name: "Rachel G.", rating: 5, comment: "Dr. Foster is wonderful! She really listens to her patients.", date: "2025-01-19" },
      { name: "Kevin M.", rating: 4, comment: "Good experience. Dr. Foster is attentive and professional.", date: "2025-01-03" },
    ],
  },
  {
    id: "8",
    name: "Dr. William Park",
    specialization: "Cardiologist",
    experience: 20,
    rating: 4.9,
    reviews: 478,
    fee: 1000,
    image: doctorImages[7],
    about: "Dr. William Park is one of the most experienced cardiologists in the country with 20 years of expertise. He has pioneered several minimally invasive cardiac procedures.",
    qualifications: ["MBBS - University of Pennsylvania", "MD Cardiology - Mayo Clinic", "PhD Cardiac Research"],
    languages: ["English", "Korean"],
    location: "Houston, TX",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2004", title: "Cardiology Fellow", place: "Mayo Clinic" },
      { year: "2008", title: "Senior Cardiologist", place: "Texas Heart Institute" },
      { year: "2015", title: "Director of Cardiology", place: "Houston Heart Center" },
    ],
    patientReviews: [
      { name: "George H.", rating: 5, comment: "Dr. Park performed my bypass surgery flawlessly. I owe him my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class cardiologist. His expertise is remarkable.", date: "2025-01-11" },
    ],
  },
];

export const testimonials = [
  {
    name: "Jennifer Adams",
    role: "Patient",
    comment: "HealConnect made it so easy to find a specialist. I booked an appointment within minutes and the consultation was excellent!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Michael Brown",
    role: "Patient",
    comment: "I love the convenience of online consultations. The doctors on HealConnect are truly professional and caring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Lisa Thompson",
    role: "Patient",
    comment: "The appointment booking process is seamless. I've been using HealConnect for my family's healthcare needs for the past year.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "Simply browse through our list of doctors, select your preferred specialist, choose an available time slot, and fill in your details. It's that easy!",
  },
  {
    question: "Are the consultations online or in-person?",
    answer: "HealConnect supports both online video consultations and in-person visits. You can choose your preferred mode while booking.",
  },
  {
    question: "How do I pay for the consultation?",
    answer: "We accept all major payment methods including credit cards, debit cards, and digital wallets. Payment is collected at the time of booking.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer: "Yes, you can cancel or reschedule your appointment from your dashboard up to 2 hours before the scheduled time.",
  },
  {
    question: "Are the doctors verified?",
    answer: "All doctors on HealConnect go through a rigorous verification process. We verify their medical licenses, qualifications, and experience before onboarding.",
  },
];
