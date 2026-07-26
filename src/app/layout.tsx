import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Le Chinois Vite et Bien DZ | Apprenez le Mandarin en Algérie 🇩🇿🇨🇳",
  description: "Formations et coaching individuel en mandarin avec le coach @le_chinois_vite_et_bien_dz. Méthode rapide pour étudiants, commerçants et professionnels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F8FAFC]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
