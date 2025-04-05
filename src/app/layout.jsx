import { Suspense } from "react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import GoogleTranslate from "@/components/google-translate";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    template: "%s | ETSAP",
    default: "ETSAP | Emerging tech skills for Africa Program",
  },
  description:
    "A transformative initiative hosted by SkillOnline, ACCREDIA, Intertek and CIRPS - A European consortium supported by the EU. In partnership with International Bio-research institute and Enugu State TECH HUB - Enugu State GOVERNMENT, NIGERIA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <Providers>
          <Suspense>{children}</Suspense>
          <GoogleTranslate />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
