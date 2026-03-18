'use client'
import { Phone, Clock, MapPin } from 'lucide-react'

export default function TopInfoBar() {
  return (
    <div className="w-full h-8 bg-slate-900 text-white px-4 md:px-20 fixed top-0 left-0 right-0 z-[200] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">

        <div className="hidden sm:flex items-center gap-2 text-blue-400">
          <MapPin size={10} />
          <span>Lalghati Crossroads, Bhopal, MP</span>
        </div>

        <div className="flex items-center gap-4 md:gap-6 ml-auto sm:ml-0">
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <Clock size={10} />
            <span>Mon–Sat: 9AM–1PM &amp; 5PM–8:30PM</span>
          </div>
          <a
            href="tel:+919329579550"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <Phone size={10} />
            <span>+91 93295 79550</span>
          </a>
        </div>

      </div>
    </div>
  )
}
