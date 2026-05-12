'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Loader2, ChevronDown, Search } from 'lucide-react'
import { submitWaitlist } from '@/app/actions/waitlist'

type ModalDict = {
  title: string
  subtitle: string
  selectCountry: string
  phonePlaceholder: string
  submitButton: string
  submitting: string
  successTitle: string
  successMessage: string
  disclaimer: string
  invalidNumber: string
  close: string
}

type Country = {
  name: string
  code: string
  iso: string
  currency: 'GHS' | 'XOF' | 'XAF'
  minDigits: number
  maxDigits: number
}

export const COUNTRIES: Country[] = [
  { name: 'Ghana',                    code: '+233', iso: 'GH', currency: 'GHS', minDigits: 9,  maxDigits: 9  },
  { name: 'Senegal',                  code: '+221', iso: 'SN', currency: 'XOF', minDigits: 9,  maxDigits: 9  },
  { name: "Côte d'Ivoire",            code: '+225', iso: 'CI', currency: 'XOF', minDigits: 10, maxDigits: 10 },
  { name: 'Mali',                     code: '+223', iso: 'ML', currency: 'XOF', minDigits: 8,  maxDigits: 8  },
  { name: 'Burkina Faso',             code: '+226', iso: 'BF', currency: 'XOF', minDigits: 8,  maxDigits: 8  },
  { name: 'Niger',                    code: '+227', iso: 'NE', currency: 'XOF', minDigits: 8,  maxDigits: 8  },
  { name: 'Togo',                     code: '+228', iso: 'TG', currency: 'XOF', minDigits: 8,  maxDigits: 8  },
  { name: 'Benin',                    code: '+229', iso: 'BJ', currency: 'XOF', minDigits: 8,  maxDigits: 8  },
  { name: 'Guinea-Bissau',            code: '+245', iso: 'GW', currency: 'XOF', minDigits: 7,  maxDigits: 9  },
  { name: 'Cameroon',                 code: '+237', iso: 'CM', currency: 'XAF', minDigits: 9,  maxDigits: 9  },
  { name: 'Chad',                     code: '+235', iso: 'TD', currency: 'XAF', minDigits: 8,  maxDigits: 8  },
  { name: 'Gabon',                    code: '+241', iso: 'GA', currency: 'XAF', minDigits: 7,  maxDigits: 8  },
  { name: 'Republic of Congo',        code: '+242', iso: 'CG', currency: 'XAF', minDigits: 9,  maxDigits: 9  },
  { name: 'Central African Republic', code: '+236', iso: 'CF', currency: 'XAF', minDigits: 8,  maxDigits: 8  },
  { name: 'Equatorial Guinea',        code: '+240', iso: 'GQ', currency: 'XAF', minDigits: 9,  maxDigits: 9  },
]

const CURRENCY_LABEL: Record<string, string> = { GHS: 'GHS', XOF: 'XOF', XAF: 'XAF' }

function flagUrl(iso: string) {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
}

function FlagImg({ iso, size = 24 }: { iso: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(iso)}
      alt={iso}
      width={size}
      height={Math.round(size * 0.67)}
      style={{ objectFit: 'cover', borderRadius: 2, display: 'block' }}
    />
  )
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, '')
}

function isValidNumber(digits: string, country: Country): boolean {
  return digits.length >= country.minDigits && digits.length <= country.maxDigits
}

export default function WaitlistModal({
  dict,
  isOpen,
  onClose,
}: {
  dict: ModalDict
  isOpen: boolean
  onClose: () => void
}) {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0])
  const [phone, setPhone] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')
    const digits = onlyDigits(phone)
    if (!isValidNumber(digits, selected)) {
      setErrorMsg(dict.invalidNumber)
      return
    }
    setStatus('loading')
    try {
      const result = await submitWaitlist({
        phone: digits,
        countryCode: selected.code,
        countryName: selected.name,
        currency: selected.currency,
      })
      if ('success' in result) {
        setStatus('success')
      } else {
        setStatus('idle')
        if (result.error === 'duplicate') {
          setErrorMsg('This number is already on the waitlist.')
        } else if (result.error === 'rate_limited') {
          setErrorMsg('Too many attempts. Please try again later.')
        } else {
          setErrorMsg('Something went wrong. Please try again.')
        }
      }
    } catch {
      setStatus('idle')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setPhone('')
      setErrorMsg('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#0a2e1a] to-[#0F6A3D] px-6 pt-8 pb-6">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-colors"
                  aria-label={dict.close}
                >
                  <X size={16} />
                </button>
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4 border border-white/20">
                  <span className="text-white font-bold text-base">H</span>
                </div>
                <h2 className="text-white font-bold text-xl mb-1">{dict.title}</h2>
                <p className="text-white/65 text-sm">{dict.subtitle}</p>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 size={44} className="text-[#0F6A3D] mx-auto mb-3" />
                    <h3 className="text-gray-900 font-bold text-lg mb-1">{dict.successTitle}</h3>
                    <p className="text-gray-500 text-sm">{dict.successMessage}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <div className="flex gap-2">
                        {/* Country selector */}
                        <div className="relative" ref={dropdownRef}>
                          <button
                            type="button"
                            onClick={() => { setDropdownOpen(!dropdownOpen); setSearch('') }}
                            className="flex items-center gap-2 px-3 py-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#0F6A3D]/40 transition-colors text-sm font-medium text-gray-700 min-w-[110px] whitespace-nowrap"
                          >
                            <FlagImg iso={selected.iso} size={24} />
                            <span className="text-gray-600">{selected.code}</span>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full mt-1 w-72 bg-white rounded-xl border border-gray-100 shadow-xl z-10 overflow-hidden"
                              >
                                <div className="p-2 border-b border-gray-100">
                                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                                    <Search size={13} className="text-gray-400" />
                                    <input
                                      autoFocus
                                      type="text"
                                      value={search}
                                      onChange={(e) => setSearch(e.target.value)}
                                      placeholder="Search country..."
                                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                                    />
                                  </div>
                                </div>
                                <ul className="max-h-52 overflow-y-auto py-1">
                                  {filteredCountries.map((c) => (
                                    <li key={c.iso}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelected(c)
                                          setDropdownOpen(false)
                                          setPhone('')
                                          setErrorMsg('')
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selected.iso === c.iso ? 'bg-green-50' : ''}`}
                                      >
                                        <FlagImg iso={c.iso} size={22} />
                                        <span className="flex-1 text-left text-gray-800 font-medium">{c.name}</span>
                                        <span className="text-gray-400 text-xs">{c.code}</span>
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                                          c.currency === 'GHS' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                                        }`}>{CURRENCY_LABEL[c.currency]}</span>
                                      </button>
                                    </li>
                                  ))}
                                  {filteredCountries.length === 0 && (
                                    <li className="px-4 py-4 text-sm text-gray-400 text-center">No results</li>
                                  )}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <input
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/[^\d\s\-]/g, ''))
                            setErrorMsg('')
                          }}
                          placeholder={dict.phonePlaceholder}
                          className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#0F6A3D] focus:ring-2 focus:ring-[#0F6A3D]/10 transition-all"
                          disabled={status === 'loading'}
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-red-500 text-xs mt-1.5 ml-1">{errorMsg}</p>
                      )}

                      <div className="flex items-center gap-1.5 mt-2 ml-1">
                        <FlagImg iso={selected.iso} size={16} />
                        <p className="text-gray-400 text-xs">{selected.name} · {selected.code} · {CURRENCY_LABEL[selected.currency]}</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading' || !phone.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0F6A3D] to-[#1F8A4D] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {dict.submitting}
                        </>
                      ) : dict.submitButton}
                    </button>

                    <p className="text-gray-400 text-xs text-center">{dict.disclaimer}</p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
