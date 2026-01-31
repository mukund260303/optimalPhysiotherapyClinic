'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Activity, Phone, MapPin, Clock, ArrowRight, Star, HeartPulse, ShieldCheck, Zap, Award, Microscope, Sparkles, Image as ImageIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* 1. PREMIUM GLASS NAVIGATION */}
      <nav className="flex justify-between items-center px-6 md:px-20 py-6 fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-slate-200/50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-xl shadow-blue-200 group-hover:rotate-12 transition-all">
            <Activity className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">Optimal<span className="text-blue-600">Physio</span></span>
            <span className="text-[7px] font-black text-slate-400 tracking-[0.4em] uppercase mt-1 italic">Advanced Rehab</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <a href="#services" className="hover:text-blue-600 transition-colors">Specialties</a>
          <Link href="/gallery" className="hover:text-blue-600 transition-colors flex items-center gap-2">
            <ImageIcon size={14} /> Gallery
          </Link>
          <a href="#location" className="hover:text-blue-600 transition-colors">Visit</a>
        </div>

        <Link href="/book" className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95">
          Get Started
        </Link>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 md:px-20 pt-40 pb-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-600/5 text-blue-600 px-4 py-2 rounded-full mb-8 border border-blue-600/10">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Premier Care in Lalghati</span>
            </div>
            
            <h1 className="text-6xl md:text-[90px] font-black leading-[0.85] tracking-tighter text-slate-900 mb-10">
              RESTORE <br /> <span className="text-blue-600">MOTION.</span> <br /> REVIVE LIFE.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed mb-12 italic border-l-4 border-blue-600 pl-6">
              Under the guidance of **Dr. Pavan Patidar (PT)**, we use advanced techniques to eliminate pain permanently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/book" className="group bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200">
                BOOK CONSULTATION <ArrowRight size={22} className="group-hover:translate-x-2 transition" />
              </Link>
              <a href="tel:+919691898412" className="bg-white border-2 border-slate-100 px-10 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:border-blue-600 transition-all">
                <Phone size={20} className="text-blue-600" />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-100 rounded-[5rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-[12px] border-white">
               <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Physiotherapy Session" 
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl border border-white/50 z-20 max-w-[280px]">
              <div className="flex gap-1 text-orange-400 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-orange-400" />)}
              </div>
              <p className="text-sm font-black text-slate-900 tracking-tight italic mb-1 uppercase">Top Rated in Bhopal</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Justdial Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID STATS */}
      <section className="px-6 md:px-20 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
             <h4 className="text-5xl font-black mb-2 tracking-tighter italic">10+</h4>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Years Clinic</p>
          </div>
          <div className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
             <h4 className="text-5xl font-black mb-2 tracking-tighter italic text-white">5k+</h4>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Success Stories</p>
          </div>
          <div className="md:col-span-2 relative h-[180px] rounded-[3rem] overflow-hidden group cursor-pointer">
             <Link href="/gallery">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                  alt="Medical Tech"
                />
                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                     <ImageIcon size={18} /> View Clinic Gallery
                   </p>
                </div>
             </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="px-6 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 tracking-widest">Expert Solutions</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">TREATMENT <br /> <span className="text-blue-600 italic">REDEFINED.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Sports Rehab", icon: <Zap />, img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=600", desc: "High-performance recovery for athletes." },
              { title: "Neuro Care", icon: <Award />, img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600", desc: "Scientific protocols for Neuro-recovery." },
              { title: "Spine Sync", icon: <Microscope />, img: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=600", desc: "Precision Spine Mobilization techniques." }
            ].map((s, i) => (
              <div key={i} className="group bg-white rounded-[4rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700">
                <div className="h-48 relative">
                   <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-blue-600">
                      {s.icon}
                   </div>
                </div>
                <div className="p-10 text-center">
                   <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{s.title}</h3>
                   <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATION (Lalghati Bhopal) */}
      <section id="location" className="px-6 md:px-20 pb-32">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative">
          <div className="p-16 md:p-24 text-white">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-12 italic">Visit <br /> <span className="text-blue-500">Lalghati.</span></h2>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <MapPin className="text-blue-500 mt-1" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Location</p>
                  <p className="text-xl font-bold italic">Lalghati Crossroads, Bhopal, MP</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Clock className="text-blue-500 mt-1" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Timing</p>
                  <p className="text-xl font-bold italic text-blue-500">Open: 10AM - 9PM (Mon-Sat)</p>
                </div>
              </div>
            </div>
            <Link href="/book" className="mt-16 inline-flex bg-white text-slate-900 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl">
               Reserve Your Slot
            </Link>
          </div>
          <div className="h-[500px] lg:h-auto bg-slate-800 grayscale hover:grayscale-0 transition-all duration-1000 relative">
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.4851252126297!2d77.369796!3d23.26875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c67bf3c8f8b0d%3A0xe5492d50454a852a!2sLalghati%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1706652000000!5m2!1sen!2sin" 
              className="w-full h-full absolute inset-0 opacity-80 hover:opacity-100 border-none" 
              loading="lazy"
             />
          </div>
        </div>
      </section>

      {/* 6. ENHANCED MEGA FOOTER */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6 md:px-20 rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                <Activity className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">Optimal<span className="text-blue-500">Physio</span></span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
              **Dr. Pavan Patidar (PT)** ke netrutva mein hum Bhopal ke patients ko world-class rehabilitation provide karte hain.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group"><span className="text-xs font-black">IG</span></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group"><span className="text-xs font-black">FB</span></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Quick Navigation</h4>
            <ul className="space-y-4">
              {['Treatments', 'Gallery', 'Admin Portal'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Admin Portal' ? '/admin' : link === 'Gallery' ? '/gallery' : '#'} className="text-slate-400 hover:text-white transition-all inline-block font-bold text-sm uppercase tracking-wider italic">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specializations */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Specializations</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest italic">
              <li>Sports Rehabilitation</li>
              <li>Neuro Physiotherapy</li>
              <li>Spine Mobilization</li>
            </ul>
          </div>

          {/* Column 4: Contact Hub */}
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 italic">Contact Hub</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-blue-500" />
                <p className="text-sm font-black">+91 96918 98412</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <MapPin size={18} className="text-blue-500" />
                <p className="font-bold">Lalghati, Bhopal, MP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">
            © 2026 Optimal Rehab Centre | Lalghati Bhopal
          </p>
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">ISO Certified Quality Care</span>
          </div>
        </div>
      </footer>
    </div>
  )
}