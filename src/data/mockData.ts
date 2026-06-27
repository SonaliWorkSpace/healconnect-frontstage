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
  { name: "General Physician", icon: "Stethoscope"},
  { name: "Dermatologist", icon: "Sparkles" },
  { name: "Cardiologist", icon: "Heart" },
  { name: "Pediatrician", icon: "Baby"},
  { name: "Orthopedic", icon: "Bone" },
  { name: "Neurologist", icon: "Brain" },
];

const doctorImages = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
  "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face",
  "https://plus.unsplash.com/premium_photo-1661473820951-99a3565f3fca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770134223774-13b735e29201?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1754715203698-70c7ad3a879d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1659353887222-630895f23cc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Animesh Jena ",
    specialization: "General Physician",
    experience: 12,
    rating: 4.2,
    reviews: 234,
    fee: 500,
    image: doctorImages[0],
    about: "Dr. Animesh Jena is a highly experienced general physician with over 12 years of practice. She specializes in preventive medicine, chronic disease management, and holistic patient care.",
    qualifications: ["MBBS - Harvard Medical School", "MD Internal Medicine - Johns Hopkins", "Fellowship in Preventive Medicine"],
    languages: ["English", "Hindi", "Odiya"],
    location: "New York, NY",
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"],
    experienceTimeline: [
      { year: "2012", title: "Residency", place: "Johns Hopkins Hospital" },
      { year: "2015", title: "Senior Physician", place: "Mayo Clinic" },
      { year: "2019", title: "Head of Internal Medicine", place: "NYC Medical Center" },
    ],
    patientReviews: [
      { name: "John D.", rating: 5, comment: "Dr. Animesh is incredibly thorough and caring. She took the time to explain everything.", date: "2025-01-15" },
      { name: "Maria S.", rating: 5, comment: "Best doctor I've ever visited. Very professional and knowledgeable.", date: "2025-01-10" },
      { name: "Robert K.", rating: 4, comment: "Great experience overall. Short wait time and excellent consultation.", date: "2024-12-28" },
    ],
  },
  {
    id: "2",
    name: "Dr. Dhaneswar Hansdah",
    specialization: "Dermatologist",
    experience: 10,
    rating: 3.9,
    reviews: 312,
    fee: 800,
    image: doctorImages[2],
    about: "Dr. Dhaneswar Hansdah is a renowned dermatologist specializing in cosmetic and clinical dermatology. He has over 15 years of experience treating various skin conditions.",
    qualifications: ["MBBS - Stanford University", "MD Dermatology - Cleveland Clinic", "DM Cosmetic Dermatology"],
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    availableSlots: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00"],
    experienceTimeline: [
      { year: "2009", title: "Dermatology Fellow", place: "Cleveland Clinic" },
      { year: "2013", title: "Clinical Dermatologist", place: "UCSF Medical Center" },
      { year: "2020", title: "Chief of Dermatology", place: "SF Skin Institute" },
    ],
    patientReviews: [
      { name: "Alice W.", rating: 5, comment: "Dr. Hansdah saved my skin. His expertise in dermatology is unmatched.", date: "2025-01-20" },
      { name: "David L.", rating: 5, comment: "Extremely knowledgeable and patient. Explained my condition in detail.", date: "2025-01-05" },
    ],
  },
  {
    id: "3",
    name: "Dr. Sonali Mohapatra",
    specialization: "Cardiologist",
    experience: 13,
    rating: 4.9,
    reviews: 189,
    fee: 900,
    image: doctorImages[1],
    about: "Dr. Sonali Mohapatra is a board-certified cardiologist with expertise in preventive cardiology and interventional procedures. She has performed over 1000 successful cardiac interventions.",
    qualifications: ["MBBS - AIIMS Delhi", "MD Cardiology - Mayo Clinic", "Fellowship in Interventional Cardiology"],
    languages: ["English", "Hindi"],
    location: "Los Angeles, CA",
    availableSlots: ["09:00", "09:30", "10:00", "11:00", "11:30", "14:00", "15:00", "15:30"],
    experienceTimeline: [
      { year: "2016", title: "Cardiology Resident", place: "Mayo Clinic" },
      { year: "2019", title: "Consultant Cardiologist", place: "LA Heart Institute" },
      { year: "2022", title: "Director of Cardiology", place: "HeartCare Medical Center" },
    ],
    patientReviews: [
      { name: "Sophie T.", rating: 5, comment: "My heart has never been healthier! Dr. Mohapatra is a miracle worker.", date: "2025-01-18" },
      { name: "Emma R.", rating: 4, comment: "Professional and skilled. The clinic is also very well maintained.", date: "2024-12-30" },
    ],
  },
  {
    id: "4",
    name: "Dr. Saswati Mohanty",
    specialization: "Pediatrician",
    experience: 12,
    rating: 4.9,
    reviews: 267,
    fee: 450,
    image: doctorImages[4],
    about: "Dr. Saswati Mohanty is a compassionate pediatrician who has been caring for children for over a decade. He specializes in developmental pediatrics and childhood nutrition.",
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
      { name: "Jennifer M.", rating: 5, comment: "My kids love Dr. Mohanty! He's so gentle and patient with them.", date: "2025-01-12" },
      { name: "Carlos P.", rating: 5, comment: "The best pediatrician in Miami. Highly recommended!", date: "2025-01-08" },
    ],
  },
  {
    id: "5",
    name: "Dr. Antaryami Pradhan",
    specialization: "Orthopedic",
    experience: 14,
    rating: 3,
    reviews: 198,
    fee: 300,
    image: doctorImages[8],
    about: "Dr. Antaryami Pradhan is an orthopedic surgeon specializing in sports medicine and joint replacement. She has helped numerous athletes return to peak performance.",
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
      { name: "Mark J.", rating: 5, comment: "Dr. Pradhan fixed my ACL tear and I'm back to running marathons!", date: "2025-01-14" },
      { name: "Lisa K.", rating: 4, comment: "Very professional. The recovery plan she created was excellent.", date: "2024-12-25" },
    ],
  },
  {
    id: "6",
    name: "Dr. Ritika Desai",
    specialization: "Neurologist",
    experience: 18,
    rating: 4,
    reviews: 345,
    fee: 900,
    image: doctorImages[6],
    about: "Dr. Ritika Desai is a leading neurologist with nearly two decades of experience treating complex neurological conditions. She specializes in movement disorders and neuroimmunology.",
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
      { name: "Thomas B.", rating: 5, comment: "Dr. Desai is a brilliant neurologist. She diagnosed my condition when others couldn't.", date: "2025-01-22" },
      { name: "Nancy W.", rating: 5, comment: "Exceptional care and attention to detail. Truly one of the best.", date: "2025-01-16" },
    ],
  },
  {
    id: "7",
    name: "Dr. Roshna Mishra",
    specialization: "General Physician",
    experience: 6,
    rating: 4.5,
    reviews: 124,
    fee: 400,
    image: doctorImages[3],
    about: "Dr. Roshna Mishra is a dedicated general physician focusing on family medicine and women's health. She believes in personalized, evidence-based treatment approaches.",
    qualifications: ["MBBS - UCLA", "MD Family Medicine - Cedars-Sinai"],
    languages: ["English"],
    location: "Seattle, WA",
    availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    experienceTimeline: [
      { year: "2018", title: "Family Medicine Resident", place: "Cedars-Sinai Medical Center" },
      { year: "2021", title: "General Physician", place: "Seattle Family Health" },
    ],
    patientReviews: [
      { name: "Rachel G.", rating: 5, comment: "Dr. Mishra is wonderful! She really listens to her patients.", date: "2025-01-19" },
      { name: "Kevin M.", rating: 4, comment: "Good experience. Dr. Mishra is attentive and professional.", date: "2025-01-03" },
    ],
  },
  {
    id: "8",
    name: "Dr. Sonalika Rout",
    specialization: "Cardiologist",
    experience: 20,
    rating: 4.9,
    reviews: 478,
    fee: 900,
    image: doctorImages[7],
    about: "Dr. Sonalika Rout is one of the most experienced cardiologists in the country with 20 years of expertise. She has pioneered several minimally invasive cardiac procedures.",
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
      { name: "George H.", rating: 5, comment: "Dr. Rout performed my bypass surgery flawlessly. I owe her my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class cardiologist. Her expertise is remarkable.", date: "2025-01-11" },
    ],
  },
    {
    id: "9",
    name: "Dr. Shibani Rath",
    specialization: "Dermatologist",
    experience: 10,
    rating: 4,
    reviews: 478,
    fee: 600,
    image: doctorImages[10],
    about: "Dr. Shibani Rath is a highly skilled dermatologist with over 20 years of experience in treating all types of skin conditions. She is known for her compassionate care and innovative treatment approaches.",
    qualifications: ["MBBS - University of Pennsylvania", "MD Dermatology - Mayo Clinic", "PhD Skin Research"],
    languages: ["Hindi", "English", "Odiya"],
    location: "Odisha, India",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2004", title: "Cardiology Fellow", place: "Mayo Clinic" },
      { year: "2008", title: "Senior Cardiologist", place: "Texas Heart Institute" },
      { year: "2015", title: "Director of Cardiology", place: "Houston Heart Center" },
    ],
    patientReviews: [
      { name: "George H.", rating: 5, comment: "Dr. Rath performed my skin treatment flawlessly. I owe her my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class dermatologist. Her expertise is remarkable.", date: "2025-01-11" },
    ],
  },
    {
    id: "10",
    name: "Dr. Komal Singh",
    specialization: "Neurologist",
    experience: 20,
    rating: 4.9,
    reviews: 478,
    fee: 900,
    image: doctorImages[11],
    about: "Dr. Komal Singh is one of the most experienced neurologists in the country with 20 years of expertise. She has pioneered several minimally invasive neurological procedures.",
    qualifications: ["MBBS - University of Pennsylvania", "MD Neurology - Mayo Clinic", "PhD Neurological Research"],
    languages: ["English", "Hindi"],
    location: "Haryana, India",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2004", title: "Cardiology Fellow", place: "Mayo Clinic" },
      { year: "2008", title: "Senior Cardiologist", place: "Texas Heart Institute" },
      { year: "2015", title: "Director of Cardiology", place: "Houston Heart Center" },
    ],
    patientReviews: [
      { name: "George H.", rating: 5, comment: "Dr. Singh performed my neurological treatment flawlessly. I owe her my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class neurologist. Her expertise is remarkable.", date: "2025-01-11" },
    ],
  },
    {
    id: "11",
    name: "Dr. Roshan Kumar",
    specialization: "Orthopedic",
    experience: 20,
    rating: 4.5,
    reviews: 478,
    fee: 850,
    image: doctorImages[12],
    about: "Dr. Roshan Kumar is one of the most experienced orthopedic surgeons in the country with 20 years of expertise. He has pioneered several minimally invasive orthopedic procedures.",
    qualifications: ["MBBS - University of Pennsylvania", "MD Orthopedics - Mayo Clinic", "PhD Orthopedic Research"],
    languages: ["English", "Hindi"],
    location: "Punjab, India",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2004", title: "Cardiology Fellow", place: "Mayo Clinic" },
      { year: "2008", title: "Senior Cardiologist", place: "Texas Heart Institute" },
      { year: "2015", title: "Director of Cardiology", place: "Houston Heart Center" },
    ],
    patientReviews: [
      { name: "George H.", rating: 5, comment: "Dr. Singh performed my orthopedic surgery flawlessly. I owe him my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class orthopedic surgeon. His expertise is remarkable.", date: "2025-01-11" },
    ],
  },
    {
    id: "12",
    name: "Dr. Anshuman Patnaik",
    specialization: "Pediatrician",
    experience: 20,
    rating: 3.5,
    reviews: 478,
    fee: 600,
    image: doctorImages[9],
    about: "Dr. Anshuman Patnaik is one of the most experienced pediatricians in the country with 20 years of expertise. He has pioneered several minimally invasive pediatric procedures.",
    qualifications: ["MBBS - University of Pennsylvania", "MD Pediatrics - Mayo Clinic", "PhD Pediatric Research"],
    languages: ["English", "Korean"],
    location: "Bombay, India",
    availableSlots: ["10:00", "10:30", "11:00", "14:00", "14:30"],
    experienceTimeline: [
      { year: "2004", title: "Cardiology Fellow", place: "Mayo Clinic" },
      { year: "2008", title: "Senior Cardiologist", place: "Texas Heart Institute" },
      { year: "2015", title: "Director of Cardiology", place: "Houston Heart Center" },
    ],
    patientReviews: [
      { name: "George H.", rating: 5, comment: "Dr. Patnaik performed my pediatric consultation flawlessly. I owe him my life.", date: "2025-01-25" },
      { name: "Patricia L.", rating: 5, comment: "World-class pediatrician. His expertise is remarkable.", date: "2025-01-11" },
    ],
  },
];

export const testimonials = [
  {
    name: "Rista Singh",
    role: "Patient",
    comment: "HealConnect made it so easy to find a specialist. I booked an appointment within minutes and the consultation was excellent!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Shefali Das",
    role: "Patient",
    comment: "I love the convenience of online consultations. The doctors on HealConnect are truly professional and caring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Satabdi Sahoo",
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
