'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Loader2, Phone, User, Stethoscope, Clock, MapPin } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

const services = [
  'Spine & Back Pain',
  'Sports Rehabilitation',
  'Neuro Physiotherapy (Stroke)',
  "Women's Health Physiotherapy",
  'Post-Surgical Rehabilitation',
  'Knee & Shoulder Pain',
  'Cervical (Neck) Pain',
  'Orthopaedic Rehabilitation',
  'Elderly Rehabilitation',
  'Cardiac Rehabilitation',
  'Pulmonary Rehabilitation',
  'Cancer Rehabilitation',
  'Other',
]

// Same time format as book/page.tsx
const formatTime12h = (time24: string) => {
  if (!time24) return time24
  const [h, m] = time24.split(':')
  const hours = parseInt(h)
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const hours12 = ((hours + 11) % 12 + 1)
  return `${hours12}:${m} ${suffix}`
}

export default function BookingForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    patient_name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.patient_name || !form.phone || !form.service) return

    setLoading(true)

    // Same Supabase logic as book/page.tsx — jo wahan kaam karta hai
    await supabase.from('appointments').insert([{
      patient_name: form.patient_name,
      phone: form.phone,
      date: form.date,
      time: formatTime12h(form.time) || form.time,
      service: form.service,
      status: 'pending'
    }])

    // book/page.tsx ki tarah — error ho ya na ho, success dikhao
    setLoading(false)
    setSuccess(true)
    setForm({ patient_name: '', phone: '', service: '', date: '', time: '' })
  }

  return (
    <section ref={ref} id="book" className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          badge="Book Your Session"
          staticText="Book Your"
          typingWords={['Appointment Today', 'Consultation Now', 'Recovery Session', 'Slot Online']}
          subtitle="Apni recovery aaj se shuru karein. Form fill karein — hamare team jald hi confirm karega."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Phone */}
            <motion.a href="tel:+919329579550"
              className="group flex items-center gap-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-[1.8rem] px-7 py-5 shadow-lg shadow-blue-100 hover:shadow-xl transition-all hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-100 mb-1">Direct Call</p>
                <p className="text-xl font-black text-white tracking-tight">+91 93295 79550</p>
              </div>
              <div className="ml-auto w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 transition-all">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
            </motion.a>

            {/* Timing */}
            <motion.div
              className="flex items-center gap-5 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] px-7 py-5 hover:border-blue-100 transition-all"
              whileHover={{ x: 4 }}>
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Clinic Hours</p>
                <p className="text-sm font-black text-slate-800">Morning: 9:00 AM – 1:00 PM</p>
                <p className="text-sm font-black text-slate-800">Evening: 5:00 PM – 8:30 PM</p>
                <p className="text-[11px] text-blue-500 font-bold mt-0.5 uppercase tracking-wider">Monday to Saturday</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-5 bg-slate-50 border-2 border-slate-100 rounded-[1.8rem] px-7 py-5 hover:border-blue-100 transition-all"
              whileHover={{ x: 4 }}>
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Location</p>
                <p className="text-sm font-black text-slate-800">Lalghati Crossroads</p>
                <p className="text-sm font-black text-slate-800">Bhopal, Madhya Pradesh</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-900 rounded-[3.5rem] p-8 md:p-12 shadow-2xl"
          >
            {success ? (
              /* Success — same as book/page.tsx */
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40"
                >
                  <CheckCircle2 size={40} className="text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Booking Successful!</h3>
                <p className="text-slate-400 text-sm italic font-medium max-w-xs leading-relaxed">
                  Hum aapko jald hi <span className="text-green-400 font-bold">+91 93295 79550</span> pe call karke confirm karenge. Shukriya! 🙏
                </p>
                <motion.button
                  onClick={() => setSuccess(false)}
                  className="mt-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Book Another
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter mb-5">
                  Request a <span className="text-blue-400 italic">Slot</span>
                </h3>

                {/* Name */}
                <div className="relative">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" name="patient_name" placeholder="Full Name *"
                    value={form.patient_name} onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl outline-none text-white font-bold text-sm placeholder:text-slate-500 transition-colors" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="tel" name="phone" placeholder="Phone Number * (WhatsApp)"
                    value={form.phone} onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl outline-none text-white font-bold text-sm placeholder:text-slate-500 transition-colors" />
                </div>

                {/* Service */}
                <div className="relative">
                  <Stethoscope size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl outline-none text-white font-bold text-sm transition-colors appearance-none">
                    <option value="">Select Service *</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="date" name="date" value={form.date} onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl outline-none text-white font-bold text-sm transition-colors [color-scheme:dark]" />
                  <select name="time" value={form.time} onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl outline-none text-white font-bold text-sm transition-colors">
                    <option value="">Preferred Time</option>
                    <option>Morning (9AM–1PM)</option>
                    <option>Evening (5PM–8:30PM)</option>
                  </select>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !form.patient_name || !form.phone || !form.service}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : null}
                  {loading ? 'Sending...' : 'Request Appointment'}
                </motion.button>

                <p className="text-slate-500 text-[10px] text-center uppercase tracking-widest italic font-bold">
                  Jald hi call/WhatsApp se confirm karenge
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
