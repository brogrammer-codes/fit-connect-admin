import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit Connect Admin",
  description: "This is a fit connect admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar signedIn={!!userId}/>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
