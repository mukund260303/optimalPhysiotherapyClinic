'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Eye, Target, Award, Users, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'

const missionPoints = [
  { icon: <TrendingUp size={16} />, text: 'Treating injuries & conditions to restore movement and function' },
  { icon: <ShieldCheck size={16} />, text: 'Preventive care — stop problems before they start' },
  { icon: <Award size={16} />, text: 'Evidence-Based Practice — clinically proven protocols' },
  { icon: <Users size={16} />, text: 'Professional Development — continuously advancing skills' },
  { icon: <Target size={16} />, text: 'Enhancing quality of life through prevention, treatment & rehab' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal variant="blurUp">
          <SectionHeading
            badge="About Optimal Physiotherapy"
            staticText="Utilizing Cutting-Edge &"
            typingWords={['Time-Tested Treatments', 'Advanced Techniques', 'Evidence-Based Care', 'Modern Rehabilitation']}
            subtitle="Optimal Physiotherapy is a trusted rehabilitation centre in Lalghati, Bhopal — providing expert, personalized, evidence-based physiotherapy to maximize patients' independence, mobility & quality of life."
          />
        </ScrollReveal>

        {/* Vision + Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16">

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -70, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 overflow-hidden group cursor-default"
          >
            <motion.div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/35 transition-all duration-700" />
            {/* Animated ring on hover */}
            <motion.div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border-2 border-blue-400/0 group-hover:border-blue-400/30 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                >
                  <Eye size={22} className="text-blue-400" />
                </motion.div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 mb-0.5">Our</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">Vision</h3>
                </div>
              </div>
              <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed italic">
                To be a <strong className="text-white">leading force in physical rehabilitation</strong> — transforming lives through innovative therapy, patient-centered care, and a commitment to <strong className="text-blue-400">movement without limits.</strong>
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-slate-400 text-xs md:text-sm font-medium italic">
                  Maximize every patient's <span className="text-blue-400 font-bold">independence</span>, <span className="text-blue-400 font-bold">mobility</span> & <span className="text-blue-400 font-bold">quality of life.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="bg-blue-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden group cursor-default"
          >
            <motion.div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <motion.div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                >
                  <Target size={22} className="text-white" />
                </motion.div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-100 mb-0.5">Our</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">Mission</h3>
                </div>
              </div>
              <p className="text-blue-100 text-xs md:text-sm font-medium leading-relaxed italic mb-5">
                To <strong className="text-white">empower every individual</strong> to regain movement through compassionate, evidence-based physiotherapy.
              </p>
              <div className="space-y-2">
                {missionPoints.map((pt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.09, ease: 'easeOut' }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex items-start gap-2.5 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 cursor-default"
                  >
                    <div className="text-blue-200 mt-0.5 shrink-0">{pt.icon}</div>
                    <p className="text-white text-xs font-bold leading-relaxed">{pt.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {[
            { src: '/gallery/Dr-pavan.png', name: 'Dr. Pavan Patidar (PT)', degree: 'MPT (Orthopaedic)', exp: '12 Years Experience', role: 'Senior Physiotherapist', tags: ['Spine', 'Knee', 'Shoulder', 'Sports Injury'], points: ['Expert in spine, knee, shoulder & sports injury physiotherapy', 'Member of Global Research & Welfare Society, Bhopal M.P.', 'Ex Physiotherapist — Chirayu Medical College & Hospital, Bhopal'], pos: 'object-[center_100%]', accent: 'blue', delay: 0.3 },
            { src: '/gallery/dr-Ravina.png', name: 'Dr. Ravina Patidar (PT)', degree: 'MPT (Neuro)', exp: '8 Years Experience', role: 'Senior Physiotherapist', tags: ['Stroke', 'Neuro', 'Neuropathy', "Women's Health"], points: ["Expert in stroke, peripheral neuropathy, diabetic neuropathy & women's health", 'Member of Global Research & Welfare Society, Bhopal M.P.', 'Ex Physiotherapist — CMAS Kohefiza Hospital, Bhopal M.P.'], pos: 'object-[center_0%]', accent: 'purple', delay: 0.45 },
          ].map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: doc.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', transition: { duration: 0.3 } }}
              className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-lg group cursor-default"
            >
              <div className="flex flex-row">
                {/* Photo — fixed size, always side by side */}
                <div className="w-28 sm:w-36 shrink-0 overflow-hidden relative" style={{minHeight: '200px'}}>
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.08, transition: { duration: 0.6 } }}
                  >
                    <Image
                      src={doc.src} alt={doc.name}
                      fill
                      className={`object-cover ${doc.pos}`}
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${doc.accent === 'blue' ? 'from-transparent to-blue-600/20' : 'from-transparent to-purple-600/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight mb-1">{doc.name}</h3>
                  <p className={`text-sm font-bold ${doc.accent === 'blue' ? 'text-blue-600' : 'text-purple-600'} mb-1`}>{doc.degree}</p>
                  <p className="text-xs text-slate-400 italic mb-3">{doc.role} · {doc.exp}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {doc.tags.map((t, j) => (
                      <motion.span key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: doc.delay + 0.1 + j * 0.07 }}
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${doc.accent === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}
                      >{t}</motion.span>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {doc.points.map((pt, j) => (
                      <motion.div key={j}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: doc.delay + 0.2 + j * 0.08 }}
                        className="flex items-start gap-2"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${doc.accent === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{pt}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal variant="fadeUp" delay={0.5} className="text-center mt-10 md:mt-16">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/book" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 md:px-12 py-5 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-2xl shadow-blue-100">
              Book Your Appointment <ArrowRight size={16} />
            </Link>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  )
}
