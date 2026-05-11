import { getDictionary, type Locale } from './dictionaries'
import Navbar from './components/Navbar'
import PageClient from './components/PageClient'
import TrustIndicators from './components/TrustIndicators'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Escrow from './components/Escrow'
import AppShowcase from './components/AppShowcase'
import SellerReputation from './components/SellerReputation'
import Security from './components/Security'
// import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import WaitlistCTA from './components/WaitlistCTA'
import Footer from './components/Footer'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <PageClient heroDict={dict.hero} modalDict={dict.modal} />
        <TrustIndicators dict={dict.trust} />
        <HowItWorks dict={dict.howItWorks} />
        <Features dict={dict.features} />
        <Escrow dict={dict.escrow} />
        <AppShowcase dict={dict.appShowcase} />
        <SellerReputation dict={dict.reputation} />
        <Security dict={dict.security} />
        {/* <Testimonials dict={dict.testimonials} /> */}
        <FAQ dict={dict.faq} />
        <WaitlistCTA dict={dict.cta} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  )
}
