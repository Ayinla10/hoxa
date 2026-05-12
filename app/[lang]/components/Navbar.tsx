'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

type Dict = {
  nav: {
    howItWorks: string
    features: string
    security: string
    faq: string
    startExchanging: string
    becomeASeller: string
  }
}

export default function Navbar({ dict, lang }: { dict: Dict; lang: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const otherLang = lang === 'en' ? 'fr' : 'en'
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`)

  const navLinks = [
    { href: '#how-it-works', label: dict.nav.howItWorks },
    { href: '#features', label: dict.nav.features },
    { href: '#security', label: dict.nav.security },
    { href: '#faq', label: dict.nav.faq },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F6A3D] to-[#1F8A4D] flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              HOXA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#0F6A3D] ${
                  scrolled ? 'text-gray-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={otherPath}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                scrolled
                  ? 'border-gray-200 text-gray-600 hover:border-[#0F6A3D] hover:text-[#0F6A3D]'
                  : 'border-white/30 text-white/80 hover:border-white hover:text-white'
              }`}
            >
              {otherLang.toUpperCase()}
            </Link>

            <a
              href="#waitlist"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F6A3D] to-[#1F8A4D] text-white hover:opacity-90 transition-opacity shadow-lg shadow-green-900/20"
            >
              {dict.nav.startExchanging}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={otherPath}
              className={`text-sm font-semibold px-2.5 py-1 rounded-lg border ${
                scrolled ? 'border-gray-200 text-gray-600' : 'border-white/30 text-white'
              }`}
            >
              {otherLang.toUpperCase()}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1.5 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2 flex flex-col gap-2">
              <a
                href="#waitlist"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-[#0F6A3D] to-[#1F8A4D] text-white text-center"
              >
                {dict.nav.startExchanging}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
