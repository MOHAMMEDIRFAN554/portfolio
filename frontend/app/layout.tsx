import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { CustomCursor } from '@/components/ui/custom-cursor'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const _outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Mohammed Irfan | Full Stack Engineer',
  description: 'Full Stack MERN Developer | Building exceptional digital experiences with React, Node.js, and MongoDB',
  keywords: 'Full Stack Developer, MERN, React, Node.js, MongoDB, Next.js, Portfolio',
  authors: [{ name: 'Mohammed Irfan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio.example.com',
    title: 'Mohammed Irfan | Full Stack Engineer',
    description: 'Full Stack MERN Developer | Building exceptional digital experiences',
    images: [
      {
        url: 'https://portfolio.example.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Irfan | Full Stack Engineer',
    description: 'Full Stack MERN Developer',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#0d0a14" />
      </head>
      <body className={`${_inter.variable} ${_outfit.variable} font-sans antialiased text-white selection:bg-primary/30 selection:text-white`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
