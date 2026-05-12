import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import ContentProtection from './components/ContentProtection'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'HOXA — Africa\'s Trusted P2P Exchange',
  description: 'HOXA protects every exchange with escrow-controlled transactions, live status tracking, seller reputation scoring, and secure payment confirmation.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <html lang={lang} className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased select-none" suppressHydrationWarning>
        <ContentProtection />
        {children}
      </body>
    </html>
  )
}
