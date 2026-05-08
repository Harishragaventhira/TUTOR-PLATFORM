export const mockTutorVerifications = [
  {
    id: "TVREQ-001",
    tutorName: "Priya Sharma",
    email: "priya.math@example.com",
    phone: "+91 9876543210",
    subject: "Mathematics",
    experience: "5 years",
    status: "Pending",
    appliedDate: "2023-10-15",
    documents: [
      { name: "Aadhar Card.pdf", type: "ID Proof" },
      { name: "B.Ed_Degree.pdf", type: "Education" },
      { name: "ProfilePic.jpg", type: "Photo" }
    ],
    bio: "Passionate math teacher with 5 years experience creating engaging lesson plans.",
    location: "Mumbai, 400050",
    mode: "Online & Offline",
    fee: "₹800/hr"
  },
  {
    id: "TVREQ-002",
    tutorName: "Rahul Verma",
    email: "rahul.physics@example.com",
    phone: "+91 9123456780",
    subject: "Physics",
    experience: "3 years",
    status: "Rejected",
    appliedDate: "2023-10-12",
    rejectionReason: "Experience certificate is blurred and unreadable. Please upload a clearer copy.",
    documents: [
      { name: "PAN Card.pdf", type: "ID Proof" },
      { name: "M.Sc_Physics.pdf", type: "Education" }
    ],
    bio: "Making physics easy for 11th and 12th standard students.",
    location: "Delhi, 110001",
    mode: "Online",
    fee: "₹600/hr"
  },
  {
    id: "TVREQ-003",
    tutorName: "Anita Desai",
    email: "anita.english@example.com",
    phone: "+91 9988776655",
    subject: "English Literature",
    experience: "8 years",
    status: "Approved",
    appliedDate: "2023-10-10",
    documents: [
      { name: "Passport.pdf", type: "ID Proof" },
      { name: "MA_English.pdf", type: "Education" }
    ],
    bio: "Expert in English grammar, literature, and spoken English.",
    location: "Bangalore, 560001",
    mode: "Offline",
    fee: "₹1000/hr"
  }
];

export const mockStudents = [
  {
    id: "STU-101",
    name: "Arjun Kumar",
    email: "arjun123@example.com",
    phone: "+91 7766554433",
    school: "Delhi Public School",
    standard: "12th Grade",
    board: "CBSE",
    targetSubjects: ["Physics", "Mathematics"],
    learningMode: "Online",
    budget: "₹5000/month",
    joinDate: "2023-09-01",
    status: "Active"
  },
  {
    id: "STU-102",
    name: "Sneha Reddy",
    email: "sneha.r@example.com",
    phone: "+91 8877665544",
    school: "Narayana Junior College",
    standard: "11th Grade",
    board: "State Board",
    targetSubjects: ["Chemistry", "Biology"],
    learningMode: "Offline (Tutor place)",
    budget: "₹6000/month",
    joinDate: "2023-09-15",
    status: "Active"
  }
];

export const mockAdminStats = {
  totalStudents: 1245,
  totalTutors: 312,
  pendingVerifications: 18,
  totalCourses: 89,
  totalBookings: 342,
  activeRequests: 45,
};

export const mockStudentVerifications = [
  {
    id: "SVREQ-001",
    studentName: "Arjun Kumar",
    email: "arjun123@example.com",
    phone: "+91 7766554433",
    board: "CBSE",
    standard: "12th Grade",
    status: "Pending",
    appliedDate: "2023-10-18",
    documents: [
      { name: "School_ID.pdf", type: "ID Proof" },
      { name: "Previous_Marksheet.pdf", type: "Education" }
    ],
    bio: "Looking for a physics and math tutor for board exams.",
    location: "Delhi, 110001",
    targetSubjects: ["Physics", "Mathematics"]
  },
  {
    id: "SVREQ-002",
    studentName: "Sneha Reddy",
    email: "sneha.r@example.com",
    phone: "+91 8877665544",
    board: "State Board",
    standard: "11th Grade",
    status: "Rejected",
    appliedDate: "2023-10-16",
    rejectionReason: "ID proof is not clear.",
    documents: [
      { name: "Aadhar.pdf", type: "ID Proof" }
    ],
    bio: "I need help with chemistry organic reactions.",
    location: "Hyderabad, 500001",
    targetSubjects: ["Chemistry"]
  }
];
