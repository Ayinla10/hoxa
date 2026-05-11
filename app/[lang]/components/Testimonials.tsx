'use client'

import { motion } from 'framer-motion'

type TestimonialsDict = {
  title: string
  subtitle: string
  items: Array<{
    name: string
    location: string
    text: string
    rating: number
    avatar: string
  }>
}

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
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
            className="text-gray-500 text-lg"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {dict.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <span key={s} className="text-amber-400 text-base">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F6A3D] to-[#1F8A4D] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{item.avatar}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
