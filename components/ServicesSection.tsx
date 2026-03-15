'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'

const services = [
  { title: 'Pain & Mobility Management', sub: 'Chronic pain, joint stiffness & mobility restoration', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', wa: 'Pain & Mobility Management' },
  { title: 'Orthopaedic Rehabilitation', sub: 'Trauma, fracture, arthritis, replacement surgery, frozen shoulder', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', wa: 'Orthopaedic Rehabilitation' },
  { title: 'Spinal Cord Injury Rehab', sub: 'Comprehensive spinal cord injury recovery & mobility programs', img: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=600&q=80', wa: 'Spinal Cord Injury Rehabilitation' },
  { title: 'Stroke Rehabilitation', sub: 'Balance, mobility & functional recovery after stroke', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80', wa: 'Stroke Rehabilitation' },
  { title: 'Neuro Rehabilitation', sub: 'Peripheral neuropathy, diabetic neuropathy & neuro-recovery', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80', wa: 'Neuro Rehabilitation' },
  { title: 'Sports Injury Rehabilitation', sub: 'ACL, shoulder, knee & return-to-sport programs', img: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=600&q=80', wa: 'Sports Injury Rehabilitation' },
  { title: 'Elderly Rehabilitation', sub: 'Fall prevention, strength & balance for senior patients', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80', wa: 'Elderly Rehabilitation' },
  { title: 'Post-Surgical Rehabilitation', sub: 'Structured recovery after joint replacements & orthopedic surgeries', img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=600&q=80', wa: 'Post-Surgical Rehabilitation' },
  { title: 'Pre & Postnatal Physiotherapy', sub: 'Pelvic floor, prenatal & postnatal rehabilitation for women', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80', wa: 'Pre & Postnatal Physiotherapy' },
  { title: 'Cancer Rehabilitation', sub: 'Fatigue management, mobility & strength during cancer recovery', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80', wa: 'Cancer Rehabilitation' },
  { title: 'Cardiac Rehabilitation', sub: 'Heart recovery — exercise therapy & functional restoration', img: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=600&q=80', wa: 'Cardiac Rehabilitation' },
  { title: 'Pulmonary Rehabilitation', sub: 'Breathing exercises & lung function improvement programs', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80', wa: 'Pulmonary Rehabilitation' },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} id="services" className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <ScrollReveal variant="blurUp">
          <SectionHeading
            badge="Our Services"
            staticText="Our Physiotherapy &"
            typingWords={['Rehabilitation Services', 'Treatment Programs', 'Recovery Solutions', 'Expert Care Plans']}
            subtitle="Advanced rehabilitation techniques tailored for every condition — from acute injuries to complex neurological recovery."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.93 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="group bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image with zoom */}
              <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden">
                <motion.img
                  src={s.img} alt={s.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12, transition: { duration: 0.6 } }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                {/* Number badge */}
                <motion.div
                  className="absolute top-2 left-2 w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  <span className="text-white text-[9px] font-black">{String(i+1).padStart(2,'0')}</span>
                </motion.div>
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight mb-1 md:mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {s.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-relaxed italic mb-3 hidden sm:block line-clamp-2">
                  {s.sub}
                </p>
                <div className="mt-auto">
                  <motion.a
                    href={`https://wa.me/919691898412?text=Hello%20Optimal%20Physiotherapy%2C%20I%20want%20to%20book%20for%20${encodeURIComponent(s.wa)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-blue-50 text-blue-600 px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest overflow-hidden relative group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-600"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">Book Now</span>
                    <ArrowRight size={12} className="relative z-10 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
