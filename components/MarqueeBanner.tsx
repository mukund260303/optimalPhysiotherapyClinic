'use client'
import { motion } from 'framer-motion'

const items = ['⚡ Sports Rehabilitation', '🧠 Neuro Physiotherapy', '🦴 Spine Mobilization', '❤️ Cardiac Rehabilitation', '🤰 Pre & Postnatal Physio', '♿ Elderly Rehabilitation', '🏥 Post-Surgical Rehab', '💊 Cancer Rehabilitation', '🫁 Pulmonary Rehabilitation', '🦵 Orthopaedic Rehab', '💪 Pain & Mobility Management', '🧬 Stroke Rehabilitation']

export default function MarqueeBanner() {
  const doubled = [...items, ...items]
  return (
    <div className="w-full bg-blue-600 py-3 overflow-hidden">
      <motion.div className="flex gap-0 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5 sm:px-8 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
            {item}<span className="text-blue-300 text-base">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
