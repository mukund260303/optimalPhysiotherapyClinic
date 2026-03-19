'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react'

const slides = [
  { tag: 'Trusted Physiotherapy — Lalghati Bhopal', staticText: 'Best Physiotherapy\n', typingWords: ['Clinic in Bhopal', 'Centre in Lalghati', 'for Back Pain', 'for Sports Injury'], sub: 'Dr. Pavan Patidar & Dr. Ravina Patidar — advanced care for spine, sports injuries & neuro rehab.', cta: 'Book Consultation', bg: 'from-blue-950 via-slate-900 to-slate-900', accentClass: 'bg-blue-600', textColor: 'text-blue-400', img: '/gallery/awards1.webp' },
  { tag: 'Sports Injury Rehabilitation', staticText: 'Get Back in the\n', typingWords: ['Game Faster', 'Field Stronger', 'Court Ready'], sub: 'High-performance sports injury recovery using evidence-based physiotherapy protocols.', cta: 'View Sports Rehab', bg: 'from-emerald-950 via-slate-900 to-slate-900', accentClass: 'bg-emerald-500', textColor: 'text-emerald-400', img: '/gallery/hero2.jpeg' },
  { tag: 'Neuro Rehabilitation — Stroke & Neuropathy', staticText: 'Regain Strength\n', typingWords: ['After Stroke', 'After Paralysis', 'With Confidence'], sub: 'Expert neuro-physiotherapy by Dr. Ravina Patidar — stroke recovery, peripheral & diabetic neuropathy.', cta: 'Explore Neuro Care', bg: 'from-purple-950 via-slate-900 to-slate-900', accentClass: 'bg-purple-500', textColor: 'text-purple-400', img: '/gallery/clinic8.png' },
  { tag: "Women's Health Physiotherapy", staticText: 'Expert Care for\n', typingWords: ["Women's Health", 'Prenatal Care', 'Postnatal Rehab'], sub: "Specialized physiotherapy for pelvic floor disorders, prenatal & postnatal rehabilitation.", cta: "Book Women's Care", bg: 'from-rose-950 via-slate-900 to-slate-900', accentClass: 'bg-rose-500', textColor: 'text-rose-400', img: '/gallery/hero3.jpeg' },
  { tag: 'Spine & Back Pain Treatment', staticText: 'Precision Spine\n', typingWords: ['Mobilization', 'Rehabilitation', 'Pain Relief'], sub: 'Advanced spinal mobilization for back pain, disc problems, spondylosis and postural correction.', cta: 'Book Spine Consult', bg: 'from-amber-950 via-slate-900 to-slate-900', accentClass: 'bg-amber-500', textColor: 'text-amber-400', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80' },
]

function useTypewriter(words: string[], active: boolean) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  useEffect(() => { setDisplayed(''); setWordIdx(0); setIsDeleting(false); setIsPaused(false) }, [words[0]])
  useEffect(() => {
    if (!active) return
    const current = words[wordIdx % words.length]
    if (isPaused) { const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, 1600); return () => clearTimeout(t) }
    const t = setTimeout(() => {
      if (!isDeleting) { setDisplayed(current.slice(0, displayed.length + 1)); if (displayed.length + 1 === current.length) setIsPaused(true) }
      else { setDisplayed(current.slice(0, displayed.length - 1)); if (displayed.length - 1 === 0) { setIsDeleting(false); setWordIdx(w => w + 1) } }
    }, isDeleting ? 35 : 75)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, isPaused, wordIdx, words, active])
  return displayed
}

function SlideContent({ slide, active }: { slide: typeof slides[0]; active: boolean }) {
  const typed = useTypewriter(active ? slide.typingWords : [''], active)
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
      {/* Badge */}
      <div className={`inline-flex items-center gap-2 ${slide.accentClass} bg-opacity-25 border border-white/15 text-white px-3 py-1.5 rounded-full mb-5 md:mb-8`}>
        <span className={`w-1.5 h-1.5 rounded-full ${slide.accentClass} animate-pulse`} />
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{slide.tag}</span>
      </div>
      {/* Heading — smaller on mobile */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-5 md:mb-8 min-h-[100px] sm:min-h-[130px] md:min-h-[160px]">
        <span className="whitespace-pre-line">{slide.staticText}</span>
        <span className={`${slide.textColor} italic`}>
          {typed}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[2px] md:w-[3px] h-[0.8em] bg-current rounded-sm align-middle ml-1" />
        </span>
      </h1>
      {/* Sub — shorter on mobile */}
      <p className="text-slate-300 text-sm md:text-xl font-medium max-w-xl leading-relaxed mb-8 md:mb-12 italic line-clamp-3 md:line-clamp-none">
        {slide.sub}
      </p>
      {/* CTAs — stacked on mobile */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/book" className={`group ${slide.accentClass} text-white px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl`}>
          {slide.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a href="tel:+919329579550" className="bg-white/10 border border-white/20 text-white px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
          <Phone size={14} /> +91 93295 79550
        </a>
      </div>
    </motion.div>
  )
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => { setDirection(1); setCurrent(p => (p + 1) % slides.length) }, 7000)
  }
  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current) } }, [])

  const goTo = (idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); startTimer() }
  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + slides.length) % slides.length); startTimer() }
  const next = () => { setDirection(1); setCurrent(c => (c + 1) % slides.length); startTimer() }

  const slide = slides[current]

  return (
    <section className={`relative min-h-[100svh] bg-gradient-to-br ${slide.bg} transition-colors duration-700 overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.div key={`img-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
          <Image src={slide.img} alt={slide.tag} fill className="object-cover opacity-50" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center min-h-[100svh] px-5 sm:px-8 md:px-20 pt-24 pb-16">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            <div key={`content-${current}`}>
              <SlideContent slide={slide} active={true} />
            </div>
          </AnimatePresence>

          {/* Slide nav */}
          <div className="mt-10 md:mt-14 flex items-center gap-3">
            <button onClick={prev} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center border border-white/20 transition-all">
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? `w-8 ${slide.accentClass}` : 'w-2.5 bg-white/30'}`} />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center border border-white/20 transition-all">
              <ChevronRight size={16} className="text-white" />
            </button>
            <span className="text-white/40 text-[10px] font-black ml-1 uppercase tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
