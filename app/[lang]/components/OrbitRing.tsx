'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ORBIT_FLAGS = [
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

const RADIUS = 195
const SIZE = RADIUS * 2 + 100

export default function OrbitRing() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Subtle orbit track */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: RADIUS * 2, height: RADIUS * 2 }}
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {ORBIT_FLAGS.map((item, i) => {
          const angle = (i / ORBIT_FLAGS.length) * 360
          const rad = (angle * Math.PI) / 180
          const x = Math.round(Math.cos(rad) * RADIUS)
          const y = Math.round(Math.sin(rad) * RADIUS)

          return (
            <motion.div
              key={item.iso}
              className="absolute flex items-center justify-center"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: x - 24,
                marginTop: y - 24,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              title={item.name}
            >
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/35 flex items-center justify-center shadow-lg shadow-black/25 hover:scale-110 transition-transform cursor-default overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w40/${item.iso}.png`}
                  alt={item.name}
                  width={38}
                  height={26}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
