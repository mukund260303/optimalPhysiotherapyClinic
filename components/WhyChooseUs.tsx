'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, UserCheck, Microscope, HeartPulse } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal'

const reasons = [
  { icon: <ShieldCheck size={28} className="text-blue-600" />, title: 'Experience & Expertise', desc: 'Dr. Pavan (12+ yrs) & Dr. Ravina (8+ yrs) bring specialized clinical expertise to deliver safe, evidence-based physiotherapy.', bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100' },
  { icon: <UserCheck size={28} className="text-emerald-600" />, title: 'One-to-One Care', desc: 'Every patient receives dedicated one-to-one consultation — focused attention, better understanding, faster recovery.', bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
  { icon: <Microscope size={28} className="text-purple-600" />, title: 'Advanced Rehabilitation', desc: 'Modern techniques for spine mobilization, neuro rehabilitation, and sports injury recovery.', bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-purple-100' },
  { icon: <HeartPulse size={28} className="text-rose-600" />, title: 'Patient-Centered', desc: 'Pain relief + restoring mobility, confidence and independence through carefully planned rehab programs.', bg: 'bg-rose-50', border: 'border-rose-100', iconBg: 'bg-rose-100' },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal variant="blurUp">
          <SectionHeading
            badge="Why Choose Us"
            staticText="The Reasons to Choose"
            typingWords={['Optimal Physiotherapy', 'Expert Doctors', 'Evidence-Based Care', 'Lalghati Bhopal']}
            subtitle="Bhopal ka sabse trusted physiotherapy clinic — experience, care, aur results ke saath."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className={`${r.bg} border ${r.border} rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col gap-4 cursor-pointer group relative overflow-hidden`}
            >
              {/* Animated bg circle on hover */}
              <motion.div
                className={`absolute -bottom-8 -right-8 w-28 h-28 ${r.iconBg} rounded-full opacity-0 group-hover:opacity-60`}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.4 }}
              />
              {/* Icon with bounce */}
              <motion.div
                className={`w-14 h-14 ${r.iconBg} rounded-2xl flex items-center justify-center shadow-sm relative z-10`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15, transition: { duration: 0.5 } }}
              >
                {r.icon}
              </motion.div>
              <h3 className="text-base font-black uppercase tracking-tight leading-tight text-slate-900 relative z-10">{r.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium italic relative z-10">{r.desc}</p>
              {/* Animated bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
