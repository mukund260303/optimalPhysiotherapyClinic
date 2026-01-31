'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Search, RefreshCw, FileDown, CheckCircle2, Activity, 
  Camera, Trash2, Plus, Calendar, User, TrendingUp, Zap, 
  LayoutDashboard, ShieldCheck, LogOut, Image as ImageIcon,
  Monitor, Phone as PhoneIcon, HeartPulse, BrainCircuit, Scan, Lock, KeyRound
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'

export default function AdminDashboard() {
  // --- 1. AUTHENTICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [authLoading, setAuthLoading] = useState(true)

  const ADMIN_USER = "admin_pavan"
  const ADMIN_PASS = "optimal@2026"

  // --- 2. DATA STATES ---
  const [appointments, setAppointments] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [newPhoto, setNewPhoto] = useState({ image_url: '', caption: '', category: 'Clinic' })

  useEffect(() => {
    const authStatus = localStorage.getItem('isOptimalAdmin')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
    setAuthLoading(false)
  }, [])

  async function fetchData() {
    setLoading(true)
    const { data: apts } = await supabase.from('appointments').select('*').order('id', { ascending: false })
    const { data: pics } = await supabase.from('clinic_gallery').select('*').order('id', { ascending: false })
    setAppointments(apts || [])
    setGallery(pics || [])
    setLoading(false)
  }

  // --- 3. CORE ACTIONS ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isOptimalAdmin', 'true')
      setIsAuthenticated(true)
      fetchData()
    } else { alert("❌ Unauthorized! Check Username/Password") }
  }

  const handleLogout = () => {
    localStorage.removeItem('isOptimalAdmin'); 
    window.location.reload()
  }

  const handleConfirm = async (apt: any) => {
    const { error } = await supabase.from('appointments').update({ status: 'confirmed' }).eq('id', apt.id)
    if (!error) {
      setAppointments(prev => prev.map(a => a.id === apt.id ? {...a, status: 'confirmed'} : a))
      const patientPhone = apt.phone.startsWith('91') ? apt.phone : `91${apt.phone}`
      
      // Fixed WhatsApp Details
      const message = `*Optimal Physiotherapy (Lalghati)* %0A%0AHello *${apt.patient_name}*, aapki appointment confirm ho gayi hai. ✅ %0A%0A📅 *Date:* ${apt.date} %0A⏰ *Time:* ${apt.time} %0A🏥 *Service:* ${apt.service} %0A%0ASee you at the clinic!`;
      window.open(`https://wa.me/${patientPhone}?text=${message}`, '_blank')
    }
  }

  // --- 4. DELETE LOGIC (FIXED) ---
  const deleteAppointment = async (id: number) => {
    if (confirm("System se ye record delete kar dein?")) {
      const { error } = await supabase.from('appointments').delete().eq('id', id)
      if (!error) {
        setAppointments(prev => prev.filter(a => a.id !== id))
      } else {
        alert("Error: Database permission denied. SQL query zaroor chalayein.")
      }
    }
  }

  const deletePhoto = async (id: number) => {
    if (confirm("Gallery se ye photo hata dein?")) {
      const { error } = await supabase.from('clinic_gallery').delete().eq('id', id)
      if (!error) {
        setGallery(prev => prev.filter(img => img.id !== id))
      }
    }
  }

  const handleUpload = async () => {
    if (!newPhoto.image_url) return alert("URL Missing!")
    await supabase.from('clinic_gallery').insert([newPhoto])
    setNewPhoto({ image_url: '', caption: '', category: 'Clinic' })
    fetchData()
  }

  const downloadReportPDF = () => {
    const doc = new jsPDF()
    doc.text('OPTIMAL PHYSIOTHERAPY - CLINICAL REPORT', 14, 20)
    autoTable(doc, {
      startY: 30,
      head: [['Patient', 'Phone', 'Service', 'Date', 'Status']],
      body: appointments.map(a => [a.patient_name, a.phone, a.service, a.date, a.status.toUpperCase()]),
     headStyles: { fillColor: [37, 99, 235] }
    })
    doc.save(`Optimal_Report_${new Date().toLocaleDateString()}.pdf`)
  }

  const statsData = [
    { name: 'ACTIVE', value: appointments.filter(a => a.status === 'confirmed').length, color: '#2563eb' },
    { name: 'PENDING', value: appointments.filter(a => a.status === 'pending').length, color: '#94a3b8' }
  ]

  const filteredApts = appointments.filter(a => 
    (a.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || a.phone.includes(searchTerm)) &&
    (filterStatus === 'all' || a.status === filterStatus)
  )

  if (authLoading) return null

  // --- LOGIN UI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 blur-[120px] rounded-full" />
        <form onSubmit={handleLogin} className="max-w-md w-full bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl relative z-10">
          <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200"><ShieldCheck className="text-white" size={40} /></div>
          <h2 className="text-3xl font-black text-slate-800 text-center uppercase tracking-tighter italic underline decoration-blue-500 underline-offset-8">Admin <span className="text-blue-600">Access</span></h2>
          <div className="space-y-4 mt-10">
            <div className="relative"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="Admin ID" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 rounded-2xl outline-none font-bold" onChange={(e) => setUser(e.target.value)} /></div>
            <div className="relative"><KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="password" placeholder="Pass-Key" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 rounded-2xl outline-none font-bold" onChange={(e) => setPass(e.target.value)} /></div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-6 rounded-[2rem] font-black uppercase tracking-widest mt-8 hover:bg-slate-900 transition-all shadow-lg italic">Authorize Uplink</button>
        </form>
      </div>
    )
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-100 gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-blue-50 p-6 rounded-[2.2rem] text-blue-600 border border-blue-100 shadow-inner"><Monitor size={32} /></div>
            <div>
              <h1 className="text-5xl font-black italic uppercase leading-none tracking-tighter">Optimal <span className="text-blue-600 font-outline-1">Hub</span></h1>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2 mt-2 italic">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live System Monitor
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={downloadReportPDF} className="bg-slate-950 text-white px-10 py-5 rounded-[2.2rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"><FileDown size={22} /> Export PDF</button>
            <button onClick={handleLogout} className="p-6 bg-white rounded-[2.2rem] border-2 border-slate-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 shadow-sm"><LogOut size={28} /></button>
          </div>
        </div>

        {/* ANALYTICS */}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 bg-white p-10 rounded-[4.5rem] border border-slate-100 h-[400px] shadow-2xl group">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 italic flex items-center gap-3"><HeartPulse size={20} className="text-red-500 animate-pulse"/> Load Ratio</h3>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={statsData} innerRadius={70} outerRadius={95} paddingAngle={12} dataKey="value" stroke="none">
                   {statsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                 </Pie>
                 <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2 bg-white p-10 rounded-[4.5rem] border border-slate-100 h-[400px] shadow-2xl group">
             <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 italic flex items-center gap-3"><BrainCircuit size={20} className="text-blue-600"/> Growth Matrix</h3>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={statsData}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: '800'}} />
                 <YAxis hide />
                 <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={80}>
                   {statsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* GALLERY MANAGER */}
        <div className="bg-white p-12 rounded-[5rem] border border-slate-100 shadow-2xl overflow-hidden relative">
          <h3 className="text-[11px] font-black uppercase tracking-[0.5em] mb-12 flex items-center gap-4 text-slate-400 italic"><Camera size={24} className="text-blue-600" /> Neural visual Drive</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 relative z-10">
            <div className="md:col-span-2 space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-4 tracking-[0.2em] italic">Visual Source (URL)</label>
              <input placeholder="https://cdn.resource.com/img.jpg" value={newPhoto.image_url} className="w-full p-7 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 rounded-[2.5rem] outline-none font-bold text-sm shadow-inner" onChange={(e) => setNewPhoto({...newPhoto, image_url: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase ml-4 tracking-[0.2em] italic">Label</label>
              <input placeholder="Diagnostic Room..." value={newPhoto.caption} className="w-full p-7 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 rounded-[2.5rem] outline-none font-bold text-sm shadow-inner" onChange={(e) => setNewPhoto({...newPhoto, caption: e.target.value})} />
            </div>
            <div className="flex items-end">
              <button onClick={handleUpload} className="w-full bg-blue-600 hover:bg-slate-950 text-white font-black uppercase text-[11px] rounded-[2.5rem] p-7 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(37,99,235,0.2)] active:scale-95 transition-all italic"><Plus size={24} /> Inject Visual</button>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 custom-scrollbar">
            {gallery.map(img => (
              <div key={img.id} className="relative w-52 h-52 shrink-0 rounded-[3.5rem] overflow-hidden group border-4 border-slate-50 shadow-2xl transition-transform hover:scale-105">
                <img src={img.image_url} className="w-full h-full object-cover transition-all" alt="clinic" />
                <button onClick={() => deletePhoto(img.id)} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                  <Trash2 size={28} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DATA REGISTRY TABLE */}
        <div className="bg-white p-12 rounded-[5.5rem] border border-slate-100 shadow-2xl overflow-hidden relative">
           <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16 relative z-10">
              <div className="relative w-full lg:w-1/2">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={26} />
                <input type="text" placeholder="Scan System Records..." className="w-full pl-22 pr-10 py-7 bg-slate-50 border-2 border-slate-100 focus:border-blue-600 rounded-[3rem] outline-none font-bold text-slate-700 transition-all shadow-inner" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex bg-slate-100 p-2.5 rounded-[2.5rem] gap-4 border border-slate-200/50">
                {['all', 'pending', 'confirmed'].map((status) => (
                  <button key={status} onClick={() => setFilterStatus(status)} className={`px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all ${filterStatus === status ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400 hover:text-slate-600 italic'}`}>{status}</button>
                ))}
              </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="text-slate-400 text-[12px] font-black uppercase tracking-[0.4em] border-b border-slate-50 italic">
                 <tr><th className="p-10">Subject Identity</th><th className="p-10">Diagnostics</th><th className="p-10">Registry Status</th><th className="p-10 text-right">System Control</th></tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {filteredApts.map((apt) => (
                   <tr key={apt.id} className="hover:bg-blue-50/20 transition-all group relative">
                     <td className="p-10">
                        <div className="font-black text-slate-800 uppercase italic tracking-tighter text-3xl flex items-center gap-4 transition-transform group-hover:translate-x-2">
                          <User size={26} className="text-blue-600/20" /> {apt.patient_name}
                        </div>
                        <div className="text-[12px] text-slate-400 font-bold mt-3 tracking-[0.3em] flex items-center gap-3 italic ml-10 group-hover:text-blue-600 transition-colors"><PhoneIcon size={12} /> {apt.phone}</div>
                     </td>
                     <td className="p-10">
                        <div className="text-sm font-black text-slate-600 flex items-center gap-4 italic"><Calendar size={20} className="text-blue-500/40" /> {apt.date}</div>
                        <div className="text-[12px] text-blue-500 font-black mt-3 uppercase tracking-widest ml-10 flex items-center gap-3 group-hover:scale-105 transition-transform origin-left italic"><Zap size={12} className="fill-blue-400"/> {apt.time}</div>
                     </td>
                     <td className="p-10">
                        <div className={`px-8 py-3 rounded-full text-[11px] font-black uppercase border tracking-[0.3em] italic text-center w-fit ${apt.status === 'confirmed' ? 'bg-green-100 text-green-600 border-green-200 shadow-sm' : 'bg-orange-100 text-orange-600 border-orange-200'}`}>
                          {apt.status}
                        </div>
                     </td>
                     <td className="p-10 text-right space-x-5">
                        {apt.status === 'pending' && (
                          <button onClick={() => handleConfirm(apt)} className="bg-blue-600 text-white px-10 py-5 rounded-[2.2rem] font-black text-[11px] uppercase tracking-widest hover:bg-slate-950 transition-all shadow-2xl active:scale-90 inline-flex items-center gap-4 italic">
                            <CheckCircle2 size={22} /> Commit Confirm
                          </button>
                        )}
                        <button onClick={() => deleteAppointment(apt.id)} className="p-6 bg-white border-2 border-slate-100 rounded-[2.2rem] hover:bg-red-600 hover:text-white transition-all text-red-500 shadow-sm active:scale-75 group-hover:rotate-6">
                          <Trash2 size={24} />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  )
}
