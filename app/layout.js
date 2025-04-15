import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Expenses Tracker",
  description: "Track your expenses with ease",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
      <html lang='en'>
        <body className={ubuntu.className}><Toaster />
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
