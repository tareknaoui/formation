import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Le Chinois Vite & Bien DZ | Formation Mandarin Autonome 🇩🇿🇨🇳",
  description: "Formation Mandarin autonome pour étudiants, commerçants et professionnels algériens. Méthode Solo à 4 500 DA à vie avec vidéos HD, cahier PDF et soutien WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F8FAFC]">
        {/*
          THESIS: Premium dark-mode glassmorphic brand showcase for "Le Chinois Vite & Bien" replacing basic landing pages with an immersive learning portal experience.
          OWN-WORLD: Midnight Slate ground (#0B0F19/#0F172A), Crimson Mandarin Red (#EF4444) & Emerald Green accents, frosted glassmorphism cards.
          STORY: Visitor discovers Algerian Mandarin self-paced method, previews interactive video demo & HSK syllabus, meets Coach Reda, and enrolls via WhatsApp/CCP for 4 500 DA.
          FIRST VIEWPORT: High-impact hero with luminous badge, video demo modal trigger, 4 500 DA lifetime badge, and instant CTA.
          FORM: Persuade landing surface, seed key f8593c9d.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

