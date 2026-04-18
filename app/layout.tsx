import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const syne = Syne({
  subsets: ["latin"],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Satwik Mohanty | Fullstack Engineer',
  description: 'Fullstack Software Engineer specializing in scalable web systems, microservices, and AI-native applications. Building high-availability digital experiences.',
  keywords: ['Fullstack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Microservices', 'Portfolio'],
  authors: [{ name: 'Satwik Mohanty' }],
  openGraph: {
    title: 'Satwik Mohanty | Fullstack Engineer',
    description: 'Fullstack Software Engineer specializing in scalable web systems and AI-native applications.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${syne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
