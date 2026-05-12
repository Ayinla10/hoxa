'use client'

import { motion, type Variants } from 'framer-motion'
import { Shield, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react'
import OrbitRing from './OrbitRing'

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
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
}

const FLAGS = [
  { iso: 'gh', name: 'Ghana' },
  { iso: 'sn', name: 'Senegal' },
  { iso: 'ci', name: "Côte d'Ivoire" },
  { iso: 'ml', name: 'Mali' },
  { iso: 'bf', name: 'Burkina Faso' },
  { iso: 'ne', name: 'Niger' },
  { iso: 'tg', name: 'Togo' },
  { iso: 'bj', name: 'Benin' },
  { iso: 'gw', name: 'Guinea-Bissau' },
  { iso: 'cm', name: 'Cameroon' },
  { iso: 'td', name: 'Chad' },
  { iso: 'ga', name: 'Gabon' },
  { iso: 'cg', name: 'Congo' },
  { iso: 'cf', name: 'CAR' },
  { iso: 'gq', name: 'Eq. Guinea' },
]

function SlideFlags() {
  const doubled = [...FLAGS, ...FLAGS]
  return (
    <div className="w-full overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 18s linear infinite',
        }}
      >
        {doubled.map((flag, i) => (
          <div
            key={i}
            style={{ width: 72, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '0 8px' }}
          >
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/flags/${flag.iso}.svg`} alt={flag.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, textAlign: 'center', whiteSpace: 'nowrap' }}>
              {flag.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ dict, onWaitlistClick }: { dict: HeroDict; onWaitlistClick: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e1a] via-[#0F6A3D] to-[#0d4a2c]">

      {/* Background dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      {/* ── MOBILE layout (< lg) ── */}
      <div className="lg:hidden px-5 pt-24 pb-12 flex flex-col">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-green-200 mb-4 backdrop-blur-sm self-start"
        >
          <Shield size={12} />
          {dict.badge}
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[1.75rem] font-bold leading-[1.2] tracking-tight text-white mb-4"
        >
          {dict.headline}
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-white/70 text-sm leading-relaxed mb-7"
        >
          {dict.subheadline}
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col gap-3 mb-9"
        >
          <button onClick={onWaitlistClick}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-[#0F6A3D] font-semibold text-sm shadow-lg"
          >
            {dict.ctaPrimary} <ArrowRight size={15} />
          </button>
          <button onClick={onWaitlistClick}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/30 text-white font-semibold text-sm"
          >
            {dict.ctaSecondary}
          </button>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-3">Supported Countries</p>
          <SlideFlags />
        </motion.div>
      </div>

      {/* ── DESKTOP layout (≥ lg) ── */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 items-center max-w-7xl mx-auto px-8 pt-52 pb-48">

        <div className="text-white">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-green-200 mb-6 backdrop-blur-sm"
          >
            <Shield size={12} />
            {dict.badge}
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            {dict.headline}
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
          >
            {dict.subheadline}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex gap-3"
          >
            <button onClick={onWaitlistClick}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#0F6A3D] font-semibold text-base hover:bg-gray-50 transition-all shadow-xl shadow-black/20 group"
            >
              {dict.ctaPrimary}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button onClick={onWaitlistClick}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 transition-all"
            >
              {dict.ctaSecondary}
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-end"
        >
          <div className="relative flex items-center justify-center">
            <OrbitRing />
            <div className="absolute z-10 w-60">
              <div className="bg-gradient-to-br from-[#1a7a48] to-[#0d4a2c] rounded-2xl p-5 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{dict.walletLabel}</p>
                    <p className="text-white/70 text-xs mt-0.5">{dict.balanceLabel}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">H</span>
                  </div>
                </div>
                <p className="text-white text-2xl font-bold tracking-tight mb-5">{dict.balance}</p>
                <div className="flex items-center justify-between p-3 bg-white/8 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-300" />
                    <span className="text-white/60 text-xs">{dict.rateLabel}</span>
                  </div>
                  <span className="text-green-300 text-xs font-semibold">{dict.rate}</span>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-5 -left-8 bg-white rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-2.5 min-w-[155px]"
              >
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={14} className="text-[#0F6A3D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-medium">{dict.statusLabel}</p>
                  <p className="text-gray-900 text-xs font-semibold">{dict.statusValue}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -top-4 -right-6 bg-[#0F6A3D] rounded-xl px-3 py-2 shadow-lg border border-white/10"
              >
                <p className="text-white/60 text-[10px] font-medium">CFA → GHS</p>
                <p className="text-white text-sm font-bold">16.13</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave — desktop only */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
