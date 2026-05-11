'use client'

import { motion } from 'framer-motion'
import { Lock, Radio, UserCheck, Star, Bell, Scale } from 'lucide-react'

type FeaturesDict = {
  title: string
  subtitle: string
  items: Array<{ title: string; desc: string }>
}

const icons = [Lock, Radio, UserCheck, Star, Bell, Scale]

export default function Features({ dict }: { dict: FeaturesDict }) {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {dict.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {dict.items.map((item, i) => {
            const Icon = icons[i] || Lock
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-[#0F6A3D]/25 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-gradient-to-br group-hover:from-[#0F6A3D] group-hover:to-[#1F8A4D] flex items-center justify-center mb-4 transition-all duration-300">
                  <Icon size={20} className="text-[#0F6A3D] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-gray-900 font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
