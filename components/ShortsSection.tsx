'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Youtube } from 'lucide-react'

const shorts = [
  {
    id: '_U-sG5stjfo',
    title: 'Optimal Physiotherapy Health & Wellness',
    thumb: 'https://img.youtube.com/vi/_U-sG5stjfo/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/_U-sG5stjfo',
  },
  {
    id: '3QLhbmY3g58',
    title: 'Knee Problem Treatment',
    thumb: 'https://img.youtube.com/vi/3QLhbmY3g58/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/3QLhbmY3g58',
  },
  {
    id: 'ZA0OVmVBX4s',
    title: 'Chest Injury | Football Injury',
    thumb: 'https://img.youtube.com/vi/ZA0OVmVBX4s/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/ZA0OVmVBX4s',
  },
  {
    id: 'SWIss8bJixQ',
    title: 'Tennis Elbow Treatment',
    thumb: 'https://img.youtube.com/vi/SWIss8bJixQ/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/SWIss8bJixQ',
  },
  {
    id: 'MODLjmmARgI',
    title: 'Physiotherapy for Neck Pain',
    thumb: 'https://img.youtube.com/vi/MODLjmmARgI/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/MODLjmmARgI',
  },
  {
    id: 'cuolGLPE-ZM',
    title: 'Operation ke baad Physiotherapy se mila Aaram',
    thumb: 'https://img.youtube.com/vi/cuolGLPE-ZM/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/cuolGLPE-ZM',
  },
  {
    id: '-0cKdQ4a5m4',
    title: 'Strengthening Exercises with Theraband',
    thumb: 'https://img.youtube.com/vi/-0cKdQ4a5m4/maxresdefault.jpg',
    url: 'https://www.youtube.com/shorts/-0cKdQ4a5m4',
  },
]

export default function ShortsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center">
                <Youtube size={16} className="text-white fill-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500">YouTube Shorts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">
              Quick <span className="text-red-500 italic">Tips & Reels</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1 italic">Short videos on physiotherapy tips, exercises & treatments</p>
          </div>

          <a
            href="https://www.youtube.com/@optimalphysiotherapyhealthandw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shrink-0"
          >
            <Youtube size={14} /> View All Shorts
          </a>
        </motion.div>

        {/* Shorts Grid — vertical cards like Instagram Reels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {shorts.map((short, i) => (
            <motion.a
              key={short.id}
              href={short.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
              className="group relative flex flex-col rounded-[1.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-black"
            >
              {/* Thumbnail — 9:16 ratio */}
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <img
                  src={short.thumb}
                  alt={short.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault not available
                    const target = e.target as HTMLImageElement
                    if (target.src.includes('maxresdefault')) {
                      target.src = `https://img.youtube.com/vi/${short.id}/hqdefault.jpg`
                    }
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Shorts badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span>▶</span> Short
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                    <Play size={20} className="text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[10px] font-black leading-tight line-clamp-2 uppercase tracking-wide">
                    {short.title}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
