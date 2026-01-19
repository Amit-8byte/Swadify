import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Swadify Kitchen | Corporate Meal Delivery",
  description:
    "Swadify Kitchen delivers hygienic, home-style meals to corporate offices.",
  icons: {
    icon: "/images/loader-bg.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        
        <Header />
        {/* Header height = 80px */}
        <main className="pt-20">
          {children}
          <WhatsAppButton />
        </main>
      
      </body>
    </html>
  );
}
