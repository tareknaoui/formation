import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CoursesSection } from "@/components/CoursesSection";
import { MethodSection } from "@/components/MethodSection";
import { BookingWidget } from "@/components/BookingWidget";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-[#F8FAFC]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CoursesSection />
        <MethodSection />
        <BookingWidget />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
