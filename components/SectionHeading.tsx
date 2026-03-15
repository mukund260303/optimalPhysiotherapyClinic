'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  badge?: string
  staticText: string
  typingWords: string[]
  subtitle?: string
  center?: boolean
  light?: boolean
}

function useTypewriter(words: string[], active: boolean, speed = 70, pause = 1800, del = 35) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!active) return
    const current = words[wordIdx % words.length]
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, pause)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) setIsPaused(true)
      } else {
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) { setIsDeleting(false); setWordIdx(w => w + 1) }
      }
    }, isDeleting ? del : speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, isPaused, wordIdx, words, active, speed, pause, del])

  return displayed
}

export default function SectionHeading({ badge, staticText, typingWords, subtitle, center = true, light = false }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const typed = useTypewriter(typingWords, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${center ? 'text-center' : 'text-left'} mb-16`}
    >
      {badge && (
        <span className={`inline-block px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${light ? 'bg-white/15 text-white border border-white/20' : 'bg-blue-50 text-blue-600'}`}>
          {badge}
        </span>
      )}

      <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95] ${light ? 'text-white' : 'text-slate-900'}`}>
        {staticText}
        <br />
        <span className="text-blue-500 italic inline-flex items-center gap-1">
          {typed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[3px] h-[0.8em] bg-blue-500 rounded-sm align-middle ml-1"
          />
        </span>
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mt-5 text-sm md:text-base font-medium italic max-w-xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-500'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
