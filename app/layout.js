import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Expenses Tracker",
  description: "Track your expenses with ease and manage your budget smartly.",
  keywords: ["expenses", "tracker", "budget", "money management", "personal finance"],
  authors: [{ name: "Bijay Shrestha" }],
  openGraph: {
    title: "Expenses Tracker",
    description: "Track your expenses with ease and manage your budget smartly.",
    url: "https://expense-tracker-bijay0817.vercel.app",
    siteName: "Expenses Tracker",
    images: [
      {
        url: "https://expense-tracker-bijay0817.vercel.app/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Expenses Tracker App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-site-verification"
            content="FRmXpdDZyE3fmx5BYctneKCx0JIhhTQagn_gSvDCZbQ"
          />
        </head>
        <body className={ubuntu.className}>
          <Toaster />
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
