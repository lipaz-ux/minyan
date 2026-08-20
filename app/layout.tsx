import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Frank_Ruhl_Libre } from 'next/font/google'
import './globals.css'

// Editorial Hebrew serif used as the rendering fallback for MINYAN's licensed
// "Romema Spitzer" face until the real WOFF2 files are uploaded to /public/fonts.
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank-ruhl',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.minyantlv.com'),
  title: {
    default: 'מניין | בית לתרבות ויצירה יהודית בועטת',
    template: '%s | מניין',
  },
  description:
    'מניין הוא בית לתרבות ויצירה יהודית בועטת בתל אביב. ארוחות שבת, בתי מדרש, התכנסויות חגים ורוח - יהדות, קצת אחרת.',
  generator: 'v0.app',
  openGraph: {
    title: 'מניין | בית לתרבות ויצירה יהודית בועטת',
    description:
      'ארוחות שבת, בתי מדרש והתכנסויות רוח בתל אביב. יהדות, קצת אחרת.',
    locale: 'he_IL',
    type: 'website',
    siteName: 'מניין',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f4f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={`${frankRuhl.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
