'use client'
import { useState, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  
  const ADMIN_USER = "admin_pavan"
  const ADMIN_PASS = "optimal@2026"

  useEffect(() => {
    const authStatus = localStorage.getItem('isOptimalAdmin')
    if (authStatus === 'true') {
      window.location.href = '/admin'
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isOptimalAdmin', 'true')
      window.location.href = '/admin'
    } else {
      alert("Galat Credentials! Access Denied.")
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden text-white font-sans">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full" />
      
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-8 z-10">
        <div className="text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Admin <span className="text-blue-500">Access</span></h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2 italic">Optimal Physiotherapy Control</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-blue-400 uppercase ml-2 tracking-widest italic">Identity</label>
            <input 
              type="text" 
              placeholder="Username"
              className="w-full p-5 bg-blue-950/30 border-2 border-blue-900/30 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-white transition-all"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-blue-400 uppercase ml-2 tracking-widest italic">Secret Key</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-5 bg-blue-950/30 border-2 border-blue-900/30 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-white transition-all"
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all italic">
          Authorize Access
        </button>
      </form>
    </div>
  )
}
