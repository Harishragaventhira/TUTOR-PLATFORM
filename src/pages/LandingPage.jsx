import { useNavigate } from "react-router-dom";
import { StarRating } from "../components/shared/StarRating";
import { testimonials } from "../data/dummyData";
import {
  BookOpen, Brain, MapPin, Wifi, CheckCircle,
  ArrowRight, Users, TrendingUp, Shield, Zap,
  ChevronRight, Share2, Link, Globe, ExternalLink,
  Calculator, Atom, FlaskConical, Microscope, Languages, Code
} from "lucide-react";

const popularSubjects = [
  { name: "Mathematics", icon: Calculator, color: "#3B82F6", courses: "120+ Courses", tutors: "450+ Tutors" },
  { name: "Physics", icon: Atom, color: "#8B5CF6", courses: "90+ Courses", tutors: "320+ Tutors" },
  { name: "Chemistry", icon: FlaskConical, color: "#10B981", courses: "110+ Courses", tutors: "380+ Tutors" },
  { name: "Biology", icon: Microscope, color: "#EC4899", courses: "80+ Courses", tutors: "290+ Tutors" },
  { name: "English", icon: Languages, color: "#F59E0B", courses: "150+ Courses", tutors: "510+ Tutors" },
  { name: "Comp. Sci", icon: Code, color: "#6366F1", courses: "200+ Courses", tutors: "600+ Tutors" },
];

const features = [
  { icon: BookOpen, title: "Recorded Courses", desc: "Learn at your own pace with HD video courses from top educators", color: "#0056D2", bg: "#EFF6FF" },
  { icon: Brain, title: "AI Doubt Assistant", desc: "Get instant answers to your doubts with our intelligent AI tutor", color: "#7C3AED", bg: "#F5F3FF" },
  { icon: Wifi, title: "Online Tuition", desc: "Connect with expert tutors from anywhere for live sessions", color: "#0891B2", bg: "#F0F9FF" },
  { icon: MapPin, title: "Location-Based Search", desc: "Find qualified tutors in your area for offline home tuition", color: "#16A34A", bg: "#F0FDF4" },
];

const howItWorks = [
  { step: "01", title: "Create Your Account", desc: "Sign up as a student or tutor in under 2 minutes. Completely free to join.", icon: Users },
  { step: "02", title: "Discover & Connect", desc: "Browse courses, find tutors by location, or post your learning requirements.", icon: MapPin },
  { step: "03", title: "Book Monthly Sessions", desc: "Book tutors on an affordable monthly plan — online or at your location.", icon: CheckCircle },
  { step: "04", title: "Learn & Grow", desc: "Start learning! Use AI for doubts, track progress, and ace your goals.", icon: TrendingUp },
];

const studentBenefits = [
  "Browse 1000+ video courses from top tutors",
  "AI doubt assistant available 24/7 while you study",
  "Book qualified tutors by location for home visits",
  "Monthly fee model — no hourly billing surprises",
  "Post your requirement and let tutors come to you",
  "Chat directly with tutors to discuss goals",
];

const tutorBenefits = [
  "Upload and sell courses to thousands of students",
  "Set your own monthly pricing — no platform cuts",
  "Choose online, offline, or hybrid teaching",
  "Get matched with students near your location",
  "View and accept inbound student requests",
  "Real-time messaging with enrolled students",
];

const stats = [
  { value: "50,000+", label: "Active Students" },
  { value: "8,000+", label: "Expert Tutors" },
  { value: "3,200+", label: "Courses Available" },
  { value: "4.8★", label: "Average Rating" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: "#1F2937" }}>
      {/* ===== NAVBAR ===== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
            style={{ background: "#0056D2" }}
          >
            TB
          </div>
          <span className="text-xl font-bold" style={{ color: "#0056D2" }}>TutorBridge</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Courses", "Tutors", "How It Works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium transition-colors"
              style={{ color: "#4B5563" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0056D2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hidden sm:block"
            style={{ color: "#0056D2", border: "1.5px solid #0056D2" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn-primary text-sm px-5 py-2 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ background: "linear-gradient(135deg, #EEF6FF 0%, #F0F4FF 50%, #F5F7FA 100%)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up"
            style={{ background: "#E6F0FF", color: "#0056D2", border: "1px solid #BFDBFE" }}
          >
            <Zap size={14} style={{ color: "#F59E0B" }} />
            India's #1 AI-Powered Tutor Marketplace
          </div>

          <h1
            className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up"
            style={{ color: "#1F2937", animationDelay: "0.1s" }}
          >
            <span style={{ color: "#0056D2" }}>Learn Smarter</span>
            <br />
            <span>with Tutors + AI</span>
            <br />
            <span className="text-4xl md:text-5xl" style={{ color: "#4B5563" }}>in One Platform</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ color: "#4B5563", animationDelay: "0.2s" }}
          >
            Connect with the best tutors, learn from world-class recorded courses, and get instant AI-powered doubt resolution — all under one roof.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={() => navigate("/signup")}
              className="btn-primary flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto justify-center"
            >
              <Users size={20} />
              Join as Student
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="btn-secondary flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto justify-center"
            >
              <TrendingUp size={20} />
              Join as Tutor
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {["Google Play 4.8★", "App Store 4.9★", "50,000+ Students"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#4B5563" }}>
                <CheckCircle size={14} style={{ color: "#22C55E" }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-14">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: "#E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center py-6 px-4" style={{ background: "#FFFFFF" }}>
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: "#0056D2" }}>
                  {value}
                </div>
                <div className="text-xs font-medium" style={{ color: "#6B7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR SUBJECTS ===== */}
      <section className="py-20 px-6" style={{ background: "#F9FAFB" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Explore Categories</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#1F2937" }}>
              Learn from <span style={{ color: "#0056D2" }}>Top Subjects</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularSubjects.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <a 
                  key={i} 
                  href="#join-section"
                  className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-200 cursor-pointer group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${sub.color}15` }}>
                    <Icon size={26} style={{ color: sub.color }} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 truncate w-full">{sub.name}</h3>
                  <div className="flex flex-col gap-1 w-full mt-auto pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-500 font-medium">{sub.courses}</span>
                    <span className="text-xs text-gray-500 font-medium">{sub.tutors}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="courses" className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Everything You Need</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#1F2937" }}>
              One Platform, <span style={{ color: "#0056D2" }}>Infinite Learning</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#4B5563" }}>
              From AI-powered doubt solving to location-based tutor search — TutorBridge has you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="glass-card p-6 card-hover">
                <div className="feature-icon mb-5" style={{ background: bg }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1F2937" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 px-6" style={{ background: "#F5F7FA" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Simple Process</p>
            <h2 className="text-4xl font-black mb-4" style={{ color: "#1F2937" }}>
              How <span style={{ color: "#0056D2" }}>TutorBridge</span> Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                {i < 3 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px z-0"
                    style={{ background: "linear-gradient(90deg, #BFDBFE, transparent)" }}
                  />
                )}
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white mb-4"
                  style={{ background: "#0056D2" }}
                >
                  {step}
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#E6F0FF" }}
                >
                  <Icon size={20} style={{ color: "#0056D2" }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1F2937" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Students */}
          <div className="glass-card p-8 card-hover">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#E6F0FF" }}>
                <Users size={20} style={{ color: "#0056D2" }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>For Students</p>
                <h3 className="text-xl font-bold" style={{ color: "#1F2937" }}>Everything to Excel</h3>
              </div>
            </div>
            {studentBenefits.map((b) => (
              <div key={b} className="flex items-start gap-3 mb-3">
                <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: "#22C55E" }} />
                <p className="text-sm" style={{ color: "#4B5563" }}>{b}</p>
              </div>
            ))}
            <button
              onClick={() => navigate("/signup")}
              className="btn-primary w-full py-3 rounded-xl mt-6 flex items-center justify-center gap-2"
            >
              Start Learning Free <ArrowRight size={16} />
            </button>
          </div>

          {/* Tutors */}
          <div className="glass-card p-8 card-hover" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F5F3FF" }}>
                <TrendingUp size={20} style={{ color: "#7C3AED" }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>For Tutors</p>
                <h3 className="text-xl font-bold" style={{ color: "#1F2937" }}>Grow Your Teaching Business</h3>
              </div>
            </div>
            {tutorBenefits.map((b) => (
              <div key={b} className="flex items-start gap-3 mb-3">
                <CheckCircle size={17} className="shrink-0 mt-0.5" style={{ color: "#0056D2" }} />
                <p className="text-sm" style={{ color: "#4B5563" }}>{b}</p>
              </div>
            ))}
            <button
              onClick={() => navigate("/signup")}
              className="btn-secondary w-full py-3 rounded-xl mt-6 flex items-center justify-center gap-2"
            >
              Start Teaching Today <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-6" style={{ background: "#F5F7FA" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Success Stories</p>
            <h2 className="text-4xl font-black" style={{ color: "#1F2937" }}>
              Students & Tutors <span style={{ color: "#0056D2" }}>Love TutorBridge</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card card-hover">
                <StarRating rating={t.rating} />
                <p className="text-sm mt-4 mb-5 leading-relaxed" style={{ color: "#4B5563" }}>
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section id="join-section" className="py-20 px-6" style={{ background: "#0056D2" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Shield size={44} className="text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg mb-10" style={{ color: "#BFDBFE" }}>
            Join 50,000+ students and 8,000+ tutors already on TutorBridge. It's free to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-all"
              style={{ background: "#FFFFFF", color: "#0056D2" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E6F0FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
            >
              Join as Student <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              Join as Tutor <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6" style={{ background: "#1F2937" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
                  style={{ background: "#0056D2" }}
                >
                  TB
                </div>
                <span className="text-xl font-bold text-white">TutorBridge</span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#9CA3AF" }}>
                India's most advanced AI-powered tutor marketplace connecting students and educators.
              </p>
              <div className="flex gap-3">
                {[Share2, Link, Globe, ExternalLink].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0056D2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  >
                    <Icon size={14} style={{ color: "#9CA3AF" }} />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Browse Courses", "Find Tutors", "Post Request", "AI Assistant"] },
              { title: "For Tutors", links: ["Start Teaching", "Upload Course", "Set Availability", "Earnings"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold text-sm text-white mb-4">{title}</h4>
                {links.map((link) => (
                  <p
                    key={link}
                    className="text-sm mb-2 cursor-pointer transition-colors"
                    style={{ color: "#9CA3AF" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                  >
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-between pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-sm" style={{ color: "#6B7280" }}>© 2025 TutorBridge. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <p
                  key={item}
                  className="text-xs cursor-pointer transition-colors"
                  style={{ color: "#6B7280" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
