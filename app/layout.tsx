import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: 'Alex Chen | Fullstack Developer',
  description: 'Fullstack developer specializing in building exceptional digital experiences. Currently focused on building scalable web applications with modern technologies.',
  keywords: ['Fullstack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'Alex Chen | Fullstack Developer',
    description: 'Fullstack developer specializing in building exceptional digital experiences.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f14',
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
