import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fit Connect Client',
  description: 'Client page for the fit connect, an application to share workouts and easily track your clients. ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("bg-slate-400", inter.className)}>{children}</body>
    </html>
  )
}
