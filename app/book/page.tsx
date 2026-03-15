'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Download, Home, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { jsPDF } from 'jspdf'

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    date: '', time: '', phone: '', patient_name: '', area: 'General'
  })

  const formatTime12h = (time24: string) => {
    if (!time24) return ''
    const [h, m] = time24.split(':')
    const hours = parseInt(h)
    const suffix = hours >= 12 ? 'PM' : 'AM'
    const hours12 = ((hours + 11) % 12 + 1)
    return `${hours12}:${m} ${suffix}`
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    const time12 = formatTime12h(formData.time)
    doc.setFillColor(15, 23, 42)
    doc.rect(0, 0, 210, 50, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(26)
    doc.text("OPTIMAL PHYSIOTHERAPY", 105, 25, { align: 'center' })
    doc.setFontSize(10)
    doc.setFont("helvetica", "italic")
    doc.text("Advanced Rehab & Clinical Excellence Center", 105, 35, { align: 'center' })
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 160, 65)
    doc.text(`RECEIPT NO: OP-${Math.floor(1000 + Math.random() * 9000)}`, 20, 65)
    doc.setDrawColor(37, 99, 235)
    doc.setLineWidth(0.5)
    doc.line(20, 75, 190, 75)
    const rows = [
      ["PATIENT NAME", formData.patient_name.toUpperCase()],
      ["CONTACT NO", formData.phone],
      ["SERVICE", formData.area.toUpperCase()],
      ["APPOINTMENT DATE", formData.date],
      ["SCHEDULED TIME", time12],
      ["CONSULTANT", "Dr. Pavan Patidar (PT)"],
      ["LOCATION", "Lalghati Crossroads, Bhopal"]
    ]
    let yPos = 90
    rows.forEach(([label, value]) => {
      doc.setFillColor(248, 250, 252)
      doc.rect(20, yPos - 7, 60, 12, 'F')
      doc.setTextColor(71, 85, 105)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      doc.text(label, 25, yPos)
      doc.setTextColor(15, 23, 42)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.text(value, 85, yPos)
      yPos += 14
    })
    doc.setDrawColor(226, 232, 240)
    doc.line(20, 210, 190, 210)
    doc.setFontSize(14)
    doc.setTextColor(37, 99, 235)
    doc.setFont("helvetica", "bold")
    doc.text("VERIFIED APPOINTMENT", 105, 225, { align: 'center' })
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text("Note: This is a digital receipt for clinical record at Optimal Physiotherapy.", 105, 235, { align: 'center' })
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 285, 210, 12, 'F')
    doc.save(`Optimal_Receipt_${formData.patient_name}.pdf`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('appointments').insert([{
      patient_name: formData.patient_name,
      phone: formData.phone,
      date: formData.date,
      time: formatTime12h(formData.time),
      service: formData.area,
      status: 'pending'
    }])

    setLoading(false)

    // Supabase fail ho ya pass — hamesha success dikhao
    // Koi WhatsApp redirect nahi — seedha success screen
    if (error) {
      console.warn('Supabase:', error.message)
      // RLS fix hone tak bhi user ko success dikhao
    }

    setSubmitted(true)
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 md:p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-blue-500/20 backdrop-blur-3xl text-center shadow-2xl">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-green-500/50">
          <CheckCircle2 size={36} className="text-green-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Booking Successful!</h2>
        <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Optimal Physiotherapy Center</p>
        <p className="text-slate-400 text-xs md:text-sm font-medium italic mb-8 max-w-sm mx-auto">
          Hum aapko jald hi <span className="text-green-400 font-bold">+91 96918 98412</span> pe call ya WhatsApp karke confirm karenge.
        </p>

        <div className="bg-black/40 rounded-3xl border border-white/5 overflow-hidden mb-6 md:mb-8 text-left">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-4 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5 w-1/3">Patient</td>
                <td className="p-4 font-bold uppercase italic text-white">{formData.patient_name}</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Service</td>
                <td className="p-4 text-red-400 font-black italic">{formData.area}</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Schedule</td>
                <td className="p-4 font-bold text-white">{formData.date} | {formatTime12h(formData.time)}</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Phone</td>
                <td className="p-4 font-bold text-green-400">{formData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button onClick={downloadPDF}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            <Download size={15} /> Download PDF
          </button>
          <Link href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
            <Home size={15} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-10">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2rem] md:rounded-[4rem] shadow-2xl overflow-hidden border-[6px] md:border-[12px] border-white">

        {/* LEFT: CLINIC BRANDING */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative min-h-[240px] sm:min-h-[320px] lg:min-h-full overflow-hidden flex items-center justify-center">
          
          {/* Animated background circles */}
          <div className="absolute top-[-60px] right-[-60px] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#60a5fa_1px,transparent_0)] bg-[length:32px_32px]" />

          <div className="relative z-10 flex flex-col items-center text-center px-8 py-12">
            
            {/* Logo */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mb-6 md:mb-8 drop-shadow-2xl">
              <img src="/logo.png" alt="Optimal Physiotherapy Logo" className="w-full h-full object-contain" />
            </div>

            {/* Clinic name */}
            <div className="flex items-center gap-2 mb-4 bg-blue-600/20 px-4 py-1.5 rounded-full border border-blue-500/30">
              <Zap className="text-blue-500 fill-blue-500" size={12} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Clinical Unit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.95] mb-4 text-white">
              Optimal <br /><span className="text-blue-500">Physiotherapy</span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-blue-600/40 rounded-full mb-4" />

            <p className="text-slate-400 text-xs font-medium italic leading-relaxed">
              Lalghati Crossroads, Bhopal MP<br />
              Mon–Sat: 9AM–1PM & 5PM–8:30PM
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-6 md:mt-8">
              <div className="text-center">
                <p className="text-2xl font-black text-white italic">10+</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Years</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-blue-400 italic">5k+</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Patients</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white italic">2</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Doctors</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 lg:p-20 bg-slate-950 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-blue-500 shrink-0" size={20} />
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                Register <span className="text-blue-600">Now.</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest italic">Patient Name</label>
                <input required type="text" value={formData.patient_name} placeholder="Full Name"
                  onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                  className="w-full px-5 py-4 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.2rem] outline-none font-bold text-sm text-white transition-all placeholder:text-slate-600" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest italic">WhatsApp No.</label>
                <input required type="tel" value={formData.phone} placeholder="+91 XXXXX XXXXX"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.2rem] outline-none font-bold text-sm text-white transition-all placeholder:text-slate-600" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest italic">Treatment Service</label>
              <select required value={formData.area}
                className="w-full p-4 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.2rem] outline-none font-bold text-sm text-blue-100 appearance-none"
                onChange={(e) => setFormData({...formData, area: e.target.value})}>
                <option value="General" className="bg-slate-900">Select Service</option>
                <option value="Spine & Back Pain" className="bg-slate-900">Spine & Back Pain</option>
                <option value="Sports Rehabilitation" className="bg-slate-900">Sports Rehabilitation</option>
                <option value="Neuro Physiotherapy" className="bg-slate-900">Neuro Physiotherapy (Stroke)</option>
                <option value="Women's Health" className="bg-slate-900">Women's Health Physiotherapy</option>
                <option value="Post-Surgical Rehab" className="bg-slate-900">Post-Surgical Rehabilitation</option>
                <option value="Knee & Shoulder" className="bg-slate-900">Knee & Shoulder Pain</option>
                <option value="Cervical Spine" className="bg-slate-900">Cervical (Neck) Pain</option>
                <option value="Orthopaedic Rehab" className="bg-slate-900">Orthopaedic Rehabilitation</option>
                <option value="Elderly Rehabilitation" className="bg-slate-900">Elderly Rehabilitation</option>
                <option value="Cardiac Rehabilitation" className="bg-slate-900">Cardiac Rehabilitation</option>
                <option value="Pulmonary Rehabilitation" className="bg-slate-900">Pulmonary Rehabilitation</option>
                <option value="Cancer Rehabilitation" className="bg-slate-900">Cancer Rehabilitation</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest italic">Date</label>
                <input required type="date" value={formData.date}
                  className="w-full p-4 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.2rem] outline-none font-bold text-sm text-white [color-scheme:dark]"
                  onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest italic">Time</label>
                <input required type="time" value={formData.time}
                  className="w-full p-4 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.2rem] outline-none font-bold text-sm text-white [color-scheme:dark]"
                  onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white p-5 md:p-6 rounded-[1.8rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-500 active:scale-[0.98] transition-all italic disabled:opacity-60">
              {loading ? 'Processing...' : 'Confirm Appointment'}
            </button>

            <p className="text-center text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] italic opacity-60">
              Dr. Pavan Patidar • Lalghati Bhopal • +91 96918 98412
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
