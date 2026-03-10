import type { Metadata } from 'next'

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
