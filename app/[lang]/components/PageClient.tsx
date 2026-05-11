'use client'

import { useState } from 'react'
import Hero from './Hero'
import WaitlistModal from './WaitlistModal'

type PageClientProps = {
  heroDict: Parameters<typeof Hero>[0]['dict']
  modalDict: Parameters<typeof WaitlistModal>[0]['dict']
}

export default function PageClient({ heroDict, modalDict }: PageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Hero dict={heroDict} onWaitlistClick={() => setModalOpen(true)} />
      <WaitlistModal dict={modalDict} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
