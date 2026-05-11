import Link from 'next/link'

type FooterDict = {
  tagline: string
  description: string
  links: {
    product: string
    howItWorks: string
    features: string
    security: string
    company: string
    about: string
    careers: string
    contact: string
    legal: string
    privacy: string
    terms: string
  }
  copyright: string
  madeIn: string
}

export default function Footer({ dict, lang }: { dict: FooterDict; lang: string }) {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F6A3D] to-[#1F8A4D] flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">HOXA</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">{dict.tagline}</p>
            <p className="text-gray-600 text-xs">{dict.description}</p>
          </div>

          {/* Product */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">{dict.links.product}</p>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm hover:text-white transition-colors">{dict.links.howItWorks}</a></li>
              <li><a href="#features" className="text-sm hover:text-white transition-colors">{dict.links.features}</a></li>
              <li><a href="#security" className="text-sm hover:text-white transition-colors">{dict.links.security}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">{dict.links.company}</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">{dict.links.about}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{dict.links.careers}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{dict.links.contact}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">{dict.links.legal}</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">{dict.links.privacy}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">{dict.links.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">{dict.copyright}</p>
          <p className="text-gray-600 text-xs">{dict.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
