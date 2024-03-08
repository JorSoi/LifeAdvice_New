import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import '@/scss/globals.scss'
import OverlayContextProvider from '@/components/global/OverlayContextProvider/OverlayContextProvider'
import getCurrentRootURL from '@/lib/getCurrentRootURL'

//Using next font optimization to locally host fonts for performance optimization.
const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LifeAdvice',
  description: 'Discover bite-sized, personal and authentic life learnings from people all over the world! Help others learn from your personal life experiences and elevate your personal growth together with a community of curious, supportive and like-minded people.',
  applicationName: 'LifeAdvice',
  authors: [{ name: "Jorim Soika", url: "https://www.linkedin.com/in/jorim-soika/" }],
  keywords: ['Life learnings', 'Personal growth', 'Personal development', 'Life advice', 'Self-improvement', 'Mindful living'],
  creator: 'Jorim Soika',
  publisher: 'Jorim Soika',
  metadataBase: new URL(getCurrentRootURL())
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${garamond.variable} ${inter.variable}`}>
      <body>
        <OverlayContextProvider>
          {children}
        </OverlayContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
