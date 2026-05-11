'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Smartphone } from 'lucide-react'

type AppDict = {
  title: string
  subtitle: string
  features: string[]
}

export default function AppShowcase({ dict }: { dict: AppDict }) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {dict.title}
            </h2>
            <p className="text-gray-500 text-lg mb-10">{dict.subtitle}</p>
            <div className="space-y-4">
              {dict.features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-[#0F6A3D]" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm">{feat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Phone shell */}
              <div className="w-[260px] sm:w-[280px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-gradient-to-br from-[#0a2e1a] to-[#0F6A3D] rounded-[2rem] overflow-hidden" style={{ height: '500px' }}>
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-2">
                    <span className="text-white/60 text-[10px] font-medium">9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full" />
                    <div className="flex gap-1">
                      <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
                      <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-3 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/50 text-[10px]">Good morning</p>
                        <p className="text-white font-bold text-base">Kofi Asante</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">KA</span>
                      </div>
                    </div>

                    {/* Balance card */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/15 mb-3">
                      <p className="text-white/50 text-[10px] mb-1">Available Balance</p>
                      <p className="text-white font-bold text-2xl">GHS 12,450</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <p className="text-green-300 text-[10px]">Escrow: Active</p>
                      </div>
                    </div>

                    {/* Live rate */}
                    <div className="bg-white/8 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-[9px]">Live Rate</p>
                        <p className="text-white font-semibold text-sm">1 GHS = 0.0621 CFA</p>
                      </div>
                      <div className="text-green-300 text-[10px] font-semibold bg-green-400/10 px-2 py-1 rounded-lg">▲ 0.4%</div>
                    </div>
                  </div>

                  {/* Seller list */}
                  <div className="px-5">
                    <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-2">Top Sellers</p>
                    {[
                      { name: 'Kofi A.', rate: '0.0621', stars: '4.9' },
                      { name: 'Ama B.', rate: '0.0619', stars: '4.8' },
                    ].map((seller, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/8 rounded-xl px-3 py-2.5 mb-2 border border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{seller.name[0]}</span>
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">{seller.name}</p>
                            <p className="text-white/40 text-[9px]">★ {seller.stars}</p>
                          </div>
                        </div>
                        <p className="text-green-300 text-xs font-semibold">{seller.rate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -right-8 top-16 bg-white rounded-2xl p-3 shadow-xl border border-gray-100"
              >
                <Smartphone size={20} className="text-[#0F6A3D]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
