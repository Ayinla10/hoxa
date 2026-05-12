'use client'

import { useEffect } from 'react'

export default function ContentProtection() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault()

    document.addEventListener('contextmenu', prevent)
    document.addEventListener('copy', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('selectstart', prevent)

    return () => {
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('selectstart', prevent)
    }
  }, [])

  return null
}
