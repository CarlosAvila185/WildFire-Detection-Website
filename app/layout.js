// app/layout.js
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'

// Google fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  title: 'Wildfire Detection System',
  description: 'Real-time wildfire detection in Kamloops',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full">
        {children}
      </body>
    </html>
  )
}
