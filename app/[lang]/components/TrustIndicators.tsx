'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, Activity, CreditCard, Star } from 'lucide-react'

type TrustDict = {
  title: string
  items: Array<{ label: string; desc: string }>
}

const icons = [ShieldCheck, UserCheck, Activity, CreditCard, Star]

export default function TrustIndicators({ dict }: { dict: TrustDict }) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold text-[#0F6A3D] uppercase tracking-widest mb-10"
        >
          {dict.title}
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {dict.items.map((item, i) => {
            const Icon = icons[i] || ShieldCheck
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 hover:border-[#0F6A3D]/20 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-[#0F6A3D] flex items-center justify-center mb-3 transition-colors">
                  <Icon size={20} className="text-[#0F6A3D] group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-900 font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
