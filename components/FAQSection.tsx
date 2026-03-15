'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'

const faqs = [
  { q: 'Optimal Physiotherapy mein kaun kaun si conditions treat hoti hain?', a: 'Hum spine pain, back pain, neck pain, sports injuries (ACL, shoulder, knee), stroke rehabilitation, peripheral neuropathy, diabetic neuropathy, post-surgical rehabilitation, pelvic floor disorders, prenatal & postnatal care, aur pediatric physiotherapy provide karte hain.' },
  { q: 'Kya aap one-to-one physiotherapy sessions provide karte hain?', a: 'Haan! Har patient ko Dr. Pavan Patidar ya Dr. Ravina Patidar ke saath dedicated one-to-one session milta hai — focused attention, proper guidance, aur better recovery outcomes.' },
  { q: 'Clinic ki timings kya hain aur appointment kaise lein?', a: 'Clinic Monday se Saturday — Morning: 9:00 AM se 1:00 PM aur Evening: 5:00 PM se 8:30 PM. Call: +91 96918 98412 ya WhatsApp karein.' },
  { q: 'First visit mein kya expect karein?', a: 'Pehli visit mein complete physical assessment — pain history, posture analysis, movement evaluation. Phir ek personalized treatment plan banaya jaayega.' },
  { q: 'Kya physiotherapy surgery se pehle bhi helpful hai?', a: 'Bilkul! Pre-surgical physiotherapy body ko prepare karti hai aur post-surgery recovery bahut faster hoti hai. Pre-habilitation se outcomes better hote hain.' },
  { q: 'Kitne sessions lagenge recovery ke liye?', a: 'Acute conditions mein typically 6-10 sessions, jabki chronic ya neurological conditions mein zyada time lag sakta hai. Doctor pehli assessment ke baad estimate denge.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <ScrollReveal variant="blurUp">
          <SectionHeading
            badge="Got a Question"
            staticText="Frequently Asked"
            typingWords={['Questions', 'Queries', 'Doubts', 'Concerns']}
            subtitle="Koi bhi doubt? Neeche common questions ke answers hain."
          />
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
            >
              <motion.button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-7 text-left"
                whileTap={{ scale: 0.99 }}
              >
                <span className="font-black text-slate-800 text-sm leading-snug">
                  <span className="text-blue-600 font-black mr-2 text-base">{String(i + 1).padStart(2, '0')}.</span>
                  {faq.q}
                </span>
                <motion.div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 md:px-7 pb-5 md:pb-7 text-slate-500 text-xs md:text-sm leading-relaxed italic font-medium border-t border-slate-50 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
