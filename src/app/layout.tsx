import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter as InterFont } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner";

const inter = InterFont({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A simple expense tracker to help you keep track of your expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
