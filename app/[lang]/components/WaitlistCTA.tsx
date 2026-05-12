'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { submitWaitlist } from '@/app/actions/waitlist'

type CTADict = {
  title: string
  subtitle: string
  inputPlaceholder: string
  inputHint: string
  submitButton: string
  submitting: string
  successTitle: string
  successMessage: string
  disclaimer: string
}

function isValidWhatsApp(value: string): boolean {
  // Must start with + and country code, then digits, spaces allowed
  return /^\+[1-9]\d{1,3}[\s\-]?(\d[\s\-]?){6,14}\d$/.test(value.trim())
}

export default function WaitlistCTA({ dict }: { dict: CTADict }) {
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (!isValidWhatsApp(phone)) {
      setErrorMsg('Please enter a valid WhatsApp number with country code (e.g. +233 XX XXX XXXX)')
      return
    }

    setStatus('loading')
    // Parse country code from the number (e.g. +233... → +233)
    const match = phone.trim().match(/^(\+\d{1,4})/)
    const countryCode = match?.[1] ?? '+0'
    const digits = phone.replace(/\D/g, '')

    const result = await submitWaitlist({
      name: '',
      phone: digits,
      countryCode,
      countryName: 'Unknown',
      currency: 'GHS',
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
  }

  return (
    <section id="waitlist" className="py-20 lg:py-28 bg-gradient-to-br from-[#0a2e1a] via-[#0F6A3D] to-[#0d4a2c] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
        >
          {dict.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-lg mb-10 max-w-lg mx-auto"
        >
          {dict.subtitle}
        </motion.p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
          >
            <CheckCircle2 size={40} className="text-green-300 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">{dict.successTitle}</h3>
            <p className="text-white/70">{dict.successMessage}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={dict.inputPlaceholder}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                  disabled={status === 'loading'}
                  autoComplete="tel"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || !phone}
                className="px-7 py-4 rounded-xl bg-white text-[#0F6A3D] font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-black/20 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {dict.submitting}
                  </>
                ) : dict.submitButton}
              </button>
            </div>

            {errorMsg && (
              <p className="text-red-300 text-xs text-left px-1">{errorMsg}</p>
            )}

            <p className="text-white/40 text-xs mt-1">{dict.inputHint}</p>
            <p className="text-white/30 text-xs">{dict.disclaimer}</p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
