// NIRF 2025 India Rankings, top 12 per category (Engineering, Medical, Law), as published by the Ministry of Education.
// Sources: https://www.nirfindia.org/Rankings/2025/{EngineeringRanking,MedicalRanking,LawRanking}.html (checked 21 Oct 2026).
// NIRF ranks only institutes that took part. Management is in nirf2025.ts.

export interface NirfTopRow { rank: number; name: string; city: string; state: string; score: number }

export const nirf2025Engineering: NirfTopRow[] = [
  { rank: 1, name: "Indian Institute of Technology Madras", city: "Chennai", state: "Tamil Nadu", score: 88.72 },
  { rank: 2, name: "Indian Institute of Technology Delhi", city: "New Delhi", state: "Delhi", score: 85.74 },
  { rank: 3, name: "Indian Institute of Technology Bombay", city: "Mumbai", state: "Maharashtra", score: 83.65 },
  { rank: 4, name: "Indian Institute of Technology Kanpur", city: "Kanpur", state: "Uttar Pradesh", score: 81.82 },
  { rank: 5, name: "Indian Institute of Technology Kharagpur", city: "Kharagpur", state: "West Bengal", score: 78.69 },
  { rank: 6, name: "Indian Institute of Technology Roorkee", city: "Roorkee", state: "Uttarakhand", score: 75.44 },
  { rank: 7, name: "Indian Institute of Technology Hyderabad", city: "Hyderabad", state: "Telangana", score: 72.31 },
  { rank: 8, name: "Indian Institute of Technology Guwahati", city: "Guwahati", state: "Assam", score: 72.24 },
  { rank: 9, name: "National Institute of Technology Tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu", score: 68.14 },
  { rank: 10, name: "Indian Institute of Technology (Banaras Hindu University) Varanasi", city: "Varanasi", state: "Uttar Pradesh", score: 67.24 },
  { rank: 11, name: "Birla Institute of Technology & Science -Pilani", city: "Pilani", state: "Rajasthan", score: 67.02 },
  { rank: 12, name: "Indian Institute of Technology Indore", city: "Indore", state: "Madhya Pradesh", score: 66.65 },
]

export const nirf2025Medical: NirfTopRow[] = [
  { rank: 1, name: "All India Institute of Medical Sciences, Delhi", city: "New Delhi", state: "Delhi", score: 91.8 },
  { rank: 2, name: "Post Graduate Institute of Medical Education and Research", city: "Chandigarh", state: "Chandigarh", score: 82.58 },
  { rank: 3, name: "Christian Medical College", city: "Vellore", state: "Tamil Nadu", score: 76.48 },
  { rank: 4, name: "Jawaharlal Institute of Post Graduate Medical Education & Research", city: "Puducherry", state: "Pondicherry", score: 73.3 },
  { rank: 5, name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences", city: "Lucknow", state: "Uttar Pradesh", score: 70.09 },
  { rank: 6, name: "Banaras Hindu University", city: "Varanasi", state: "Uttar Pradesh", score: 70.05 },
  { rank: 7, name: "National Institute of Mental Health & Neuro Sciences, Bangalore", city: "Bengaluru", state: "Karnataka", score: 69.77 },
  { rank: 8, name: "King George's Medical University", city: "Lucknow", state: "Uttar Pradesh", score: 68.77 },
  { rank: 9, name: "Amrita Vishwa Vidyapeetham", city: "Coimbatore", state: "Tamil Nadu", score: 68.52 },
  { rank: 10, name: "Kasturba Medical College, Manipal", city: "Manipal", state: "Karnataka", score: 68.05 },
  { rank: 11, name: "Saveetha Institute of Medical and Technical Sciences", city: "Chennai", state: "Tamil Nadu", score: 66.5 },
  { rank: 12, name: "Dr. D. Y. Patil Vidyapeeth", city: "Pune", state: "Maharashtra", score: 65.17 },
]

export const nirf2025Law: NirfTopRow[] = [
  { rank: 1, name: "National Law School of India University", city: "Bengaluru", state: "Karnataka", score: 82.97 },
  { rank: 2, name: "National Law University", city: "New Delhi", state: "Delhi", score: 80.0 },
  { rank: 3, name: "Nalsar University of Law", city: "Hyderabad", state: "Telangana", score: 79.5 },
  { rank: 4, name: "The West Bengal National University of Juridical Sciences", city: "Kolkata", state: "West Bengal", score: 79.39 },
  { rank: 5, name: "Gujarat National Law University", city: "Gandhinagar", state: "Gujarat", score: 76.23 },
  { rank: 6, name: "Indian Institute of Technology Kharagpur", city: "Kharagpur", state: "West Bengal", score: 74.09 },
  { rank: 7, name: "Symbiosis Law School, Pune", city: "Pune", state: "Maharashtra", score: 74.07 },
  { rank: 8, name: "Jamia Millia Islamia", city: "New Delhi", state: "Delhi", score: 66.39 },
  { rank: 9, name: "Aligarh Muslim University", city: "Aligarh", state: "Uttar Pradesh", score: 65.82 },
  { rank: 10, name: "Siksha 'O' Anusandhan", city: "Bhubaneswar", state: "Odisha", score: 65.36 },
  { rank: 11, name: "Shanmugha Arts Science Technology & Research Academy", city: "Thanjavur", state: "Tamil Nadu", score: 65.29 },
  { rank: 12, name: "Babasheb Bhimrao Ambedkar University", city: "Lucknow", state: "Uttar Pradesh", score: 65.26 },
]

export const NIRF_CATEGORY_URL = {
  Engineering: "https://www.nirfindia.org/Rankings/2025/EngineeringRanking.html",
  Medical: "https://www.nirfindia.org/Rankings/2025/MedicalRanking.html",
  Law: "https://www.nirfindia.org/Rankings/2025/LawRanking.html",
  Management: "https://www.nirfindia.org/Rankings/2025/ManagementRanking.html",
} as const
