'use client'

import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'

type ReputationDict = {
  title: string
  subtitle: string
  body: string
  stats: Array<{ value: string; label: string }>
  sellerCard: {
    name: string
    badge: string
    trades: string
    rating: string
    rate: string
    tag: string
  }
}

export default function SellerReputation({ dict }: { dict: ReputationDict }) {
  const card = dict.sellerCard
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {dict.title}
            </h2>
            <p className="text-[#0F6A3D] font-semibold mb-5">{dict.subtitle}</p>
            <p className="text-gray-500 text-base leading-relaxed mb-10">{dict.body}</p>

            <div className="grid grid-cols-3 gap-4">
              {dict.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seller card visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm space-y-4">
              {/* Main card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F6A3D] to-[#1F8A4D] flex items-center justify-center">
                      <span className="text-white font-bold">{card.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{card.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <BadgeCheck size={12} className="text-[#0F6A3D]" />
                        <span className="text-[#0F6A3D] text-xs font-medium">{card.tag}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                    {card.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-gray-900 font-bold text-lg">{card.rating}</p>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-gray-900 font-bold text-lg">{card.trades.split(' ')[0]}</p>
                    <p className="text-gray-400 text-xs">{card.trades.split(' ')[1]}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-gray-500 text-xs">Live Rate</span>
                  <span className="text-[#0F6A3D] text-sm font-semibold">{card.rate}</span>
                </div>
              </div>

              {/* Stars row */}
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="text-amber-400 text-lg">★</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
