'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Lock } from 'lucide-react'

type EscrowDict = {
  title: string
  subtitle: string
  body: string
  points: string[]
  tagline: string
}

export default function Escrow({ dict }: { dict: EscrowDict }) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0a2e1a] via-[#0F6A3D] to-[#0d4a2c] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs">
              {/* Escrow lock visual */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Lock size={36} className="text-white" />
                </div>
                <p className="text-white font-bold text-xl mb-1">Escrow Active</p>
                <p className="text-white/60 text-sm mb-6">Funds locked & protected</p>

                {/* Transaction flow */}
                <div className="space-y-2">
                  {['Buyer sends GHS', 'Funds enter escrow', 'Seller confirmed', 'CFA released'].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-2.5 border border-white/10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < 3 ? 'bg-green-400' : 'bg-white/20'}`}>
                        {i < 3 && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-xs font-medium ${i < 3 ? 'text-white' : 'text-white/40'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <div className="text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
            >
              {dict.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-green-300 font-semibold mb-6"
            >
              {dict.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-base leading-relaxed mb-8"
            >
              {dict.body}
            </motion.p>

            <div className="space-y-3 mb-8">
              {dict.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={11} className="text-green-300" />
                  </div>
                  <span className="text-white/80 text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-green-300 font-semibold text-lg italic"
            >
              "{dict.tagline}"
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
