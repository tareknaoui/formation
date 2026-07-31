import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SyllabusSection } from "@/components/SyllabusSection";
import { CoachSection } from "@/components/CoachSection";
import { MethodSection } from "@/components/MethodSection";
import { EnrollmentSection } from "@/components/EnrollmentSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-red-500 selection:text-white">
      {/* Glassmorphic Navigation */}
      <Navbar />

      {/* Main Surface Sections */}
      <main className="flex-grow space-y-0">
        {/* Cinematic Dark Hero with Video Demo Trigger */}
        <HeroSection />

        {/* HSK 1 to 3 Curriculum Breakdown */}
        <SyllabusSection />

        {/* Coach Credentials & Story */}
        <CoachSection />

        {/* 4 Pillars of Méthode Solo */}
        <MethodSection />

        {/* High-Converting Enrollment & CCP/BaridiMob Guide */}
        <EnrollmentSection />
      </main>

      {/* Dark Footer */}
      <Footer />
    </div>
  );
}
