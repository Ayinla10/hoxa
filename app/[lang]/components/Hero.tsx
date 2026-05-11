'use client'

import { motion, type Variants } from 'framer-motion'
import { Shield, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react'

type HeroDict = {
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  badge: string
  walletLabel: string
  balanceLabel: string
  balance: string
  rateLabel: string
  rate: string
  statusLabel: string
  statusValue: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Hero({ dict, onWaitlistClick }: { dict: HeroDict; onWaitlistClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a2e1a] via-[#0F6A3D] to-[#0d4a2c]">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1F8A4D]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F6A3D]/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-white">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-green-200 mb-6 backdrop-blur-sm"
            >
              <Shield size={12} />
              {dict.badge}
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
            >
              {dict.headline}
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
            >
              {dict.subheadline}
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={onWaitlistClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#0F6A3D] font-semibold text-base hover:bg-gray-50 transition-all shadow-xl shadow-black/20 group"
              >
                {dict.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onWaitlistClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                {dict.ctaSecondary}
              </button>
            </motion.div>
          </div>

          {/* Right: UI Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Main wallet card */}
              <div className="relative bg-gradient-to-br from-[#1a7a48] to-[#0d4a2c] rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{dict.walletLabel}</p>
                    <p className="text-white/70 text-xs mt-0.5">{dict.balanceLabel}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                </div>
                <p className="text-white text-3xl font-bold tracking-tight mb-6">{dict.balance}</p>
                <div className="flex items-center justify-between p-3 bg-white/8 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-300" />
                    <span className="text-white/60 text-xs">{dict.rateLabel}</span>
                  </div>
                  <span className="text-green-300 text-xs font-semibold">{dict.rate}</span>
                </div>
              </div>

              {/* Status card */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-5 -left-6 bg-white rounded-xl p-3.5 shadow-xl border border-gray-100 flex items-center gap-3 min-w-[180px]"
              >
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={16} className="text-[#0F6A3D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-medium">{dict.statusLabel}</p>
                  <p className="text-gray-900 text-xs font-semibold">{dict.statusValue}</p>
                </div>
              </motion.div>

              {/* Floating rate pill */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-[#0F6A3D] rounded-xl px-4 py-2.5 shadow-lg"
              >
                <p className="text-white/60 text-[10px] font-medium">GHS → CFA</p>
                <p className="text-white text-sm font-bold">0.0621</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
