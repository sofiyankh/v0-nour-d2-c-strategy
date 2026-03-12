import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Amiri, Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Providers from '@/components/providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: 'NOUR — Grown Here. Made for You.',
  description: 'Premium natural cosmetics engineered for Mediterranean skin. Made with Tunisian ingredients, by Tunisian women, for Tunisian women.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body className="font-cairo antialiased">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
