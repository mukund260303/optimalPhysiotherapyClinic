'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Youtube, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'

const videos = [
  {
    id: 'qurpXKFcarE',
    title: 'Awareness for Frozen Shoulder at Optimal Physiotherapy Bhopal',
    thumb: 'https://img.youtube.com/vi/qurpXKFcarE/maxresdefault.jpg',
  },
  {
    id: 'g6P53D6U1DU',
    title: 'Awareness About Neck Pain Syndrome',
    thumb: 'https://img.youtube.com/vi/g6P53D6U1DU/maxresdefault.jpg',
  },
  {
    id: '5QtWad4s6Tg',
    title: 'Importance of Physiotherapy in Spinal Cord Injury',
    thumb: 'https://img.youtube.com/vi/5QtWad4s6Tg/maxresdefault.jpg',
  },
  {
    id: 'vBQ9HMufCqw',
    title: 'World Physiotherapy Day 2023 — Optimal Physiotherapy Bhopal',
    thumb: 'https://img.youtube.com/vi/vBQ9HMufCqw/maxresdefault.jpg',
  },
]

export default function YoutubeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-16">
          <ScrollReveal variant="fadeLeft">
            <SectionHeading badge="We are on YouTube" staticText="Watch Our" typingWords={['Patient Stories', 'Recovery Videos', 'Treatment Sessions']} center={false} />
          </ScrollReveal>
          <ScrollReveal variant="fadeRight" delay={0.2}>
            <motion.a href="https://www.youtube.com/@optimalphysiotherapy9860" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-colors shrink-0"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Youtube size={16} /> Subscribe
            </motion.a>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {videos.map((v, i) => (
            <motion.a key={i} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <motion.div className="w-full h-full" whileHover={{ scale: 1.1, transition: { duration: 0.6 } }}>
                  <Image src={v.thumb} alt={v.title} fill className="object-cover" unoptimized />
                </motion.div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                  <motion.div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl"
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </motion.div>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 rounded-xl px-2.5 py-1.5 flex items-center gap-1">
                  <Youtube size={11} className="text-white" /><span className="text-white text-[9px] font-black uppercase tracking-wider">YouTube</span>
                </div>
              </div>
              <div className="p-4 md:p-6 flex items-start justify-between gap-2">
                <p className="text-xs md:text-sm font-black text-slate-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">{v.title}</p>
                <ExternalLink size={14} className="text-slate-300 group-hover:text-red-400 shrink-0 mt-0.5 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
