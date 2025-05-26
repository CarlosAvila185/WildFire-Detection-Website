// app/page.js
'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import MapLoader from './components/MapLoader'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // On mount: read localStorage or system preference, apply class
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved === 'dark' || (saved === null && prefersDark)

    document.documentElement.classList.toggle('dark', dark)
    setIsDark(dark)
    setMounted(true)
  }, [])

  // Toggle handler
  const toggleTheme = () => {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  // Don't render theme‐dependent UI until after mount
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-500">
        <header className="py-4 bg-gray-50 border-b border-gray-200">
          <h1 className="text-center text-2xl font-semibold">
            Wildfire Detection System
          </h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-4xl h-[60vh] bg-gray-100 rounded-2xl shadow-xl" />
        </main>
      </div>
    )
  }

  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* HEADER */}
      <header className="relative flex items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="mx-auto text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Wildfire Detection System
        </h1>
        <button
          onClick={toggleTheme}
          className="absolute right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark
            ? <Sun className="w-5 h-5 text-yellow-400" />
            : <Moon className="w-5 h-5 text-gray-600" />
          }
        </button>
      </header>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-500">
          <div className="h-1 bg-teal-400 dark:bg-teal-600"></div>
          <div className="w-full h-[60vh]">
            <MapLoader />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
        &copy; {year} Your Organization. All rights reserved.
      </footer>
    </div>
  )
}
