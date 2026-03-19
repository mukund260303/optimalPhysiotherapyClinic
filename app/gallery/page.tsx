'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Activity, ArrowLeft, ImageIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Real clinic images — front mein (with subtitles)
const realImages = [
  // Doctors
  { id: 'r1', image_url: '/gallery/Dr-pavan.png', caption: 'Dr. Pavan Patidar (PT)', category: 'Our Team', subtitle: 'MPT Orthopaedic — 12+ Years Experience' },
  { id: 'r2', image_url: '/gallery/dr-Ravina.png', caption: 'Dr. Ravina Patidar (PT)', category: 'Our Team', subtitle: 'MPT Neuro — 8+ Years Experience' },
  { id: 'r3', image_url: '/gallery/dr-pavan.webp', caption: 'Dr. Pavan Patidar', category: 'Our Team', subtitle: 'Senior Physiotherapist Bhopal' },

  // Clinic & Reception
  { id: 'r4', image_url: '/gallery/recaption.webp', caption: 'Clinic Reception', category: 'Clinic', subtitle: 'Welcoming Environment at Lalghati' },
  { id: 'r5', image_url: '/gallery/consultation_area.jpg', caption: 'Consultation Area', category: 'Clinic', subtitle: 'One-on-One Patient Consultation' },
  { id: 'r6', image_url: '/gallery/clinic11.webp', caption: 'Treatment Room', category: 'Clinic', subtitle: 'Advanced Treatment Setup' },
  { id: 'r7', image_url: '/gallery/clinic12.webp', caption: 'Rehabilitation Centre', category: 'Clinic', subtitle: 'State-of-the-Art Facility' },

  // Equipment & Treatment
  { id: 'r8', image_url: '/gallery/advance_equipment.jpg', caption: 'Advanced Equipment', category: 'Equipment', subtitle: 'Latest Physiotherapy Technology' },
  { id: 'r9', image_url: '/gallery/Therapeutic Exercise.jpg', caption: 'Therapeutic Exercise', category: 'Treatment', subtitle: 'Personalized Exercise Programs' },
  { id: 'r10', image_url: '/gallery/posture_correction.jpg', caption: 'Posture Correction', category: 'Treatment', subtitle: 'Scientific Posture Rehabilitation' },
  { id: 'r11', image_url: '/gallery/sports_injuries.jpg', caption: 'Sports Injury Rehab', category: 'Sports', subtitle: 'High Performance Recovery' },
  { id: 'r12', image_url: '/gallery/joint_pain.jpg', caption: 'Joint Pain Treatment', category: 'Treatment', subtitle: 'Expert Joint Rehabilitation' },
  { id: 'r13', image_url: '/gallery/womanscare.webp', caption: "Women's Health Care", category: "Women's Health", subtitle: 'Specialized Women Physiotherapy' },
  { id: 'r14', image_url: '/gallery/new4.webp', caption: 'Physiotherapy Session', category: 'Treatment', subtitle: 'Patient-Centered Care' },

  // Real patient treatment photos
  { id: 'r15', image_url: '/gallery/IMG20260202200901.jpg', caption: 'Treatment Session', category: 'Treatment', subtitle: 'Expert Hands-on Therapy' },
  { id: 'r16', image_url: '/gallery/IMG20260202200914.jpg', caption: 'Physiotherapy Care', category: 'Treatment', subtitle: 'Personalized Treatment Plan' },
  { id: 'r17', image_url: '/gallery/IMG20260202200935.jpg', caption: 'Rehabilitation Session', category: 'Rehab', subtitle: 'Evidence-Based Rehabilitation' },
  { id: 'r18', image_url: '/gallery/IMG20260202201006.jpg', caption: 'Manual Therapy', category: 'Treatment', subtitle: 'Skilled Manual Techniques' },
  { id: 'r19', image_url: '/gallery/IMG20260202201019.jpg', caption: 'Patient Recovery', category: 'Rehab', subtitle: 'Road to Full Recovery' },
  { id: 'r20', image_url: '/gallery/IMG20260202201226.jpg', caption: 'Exercise Therapy', category: 'Treatment', subtitle: 'Guided Exercise Programs' },
  { id: 'r21', image_url: '/gallery/IMG20260202201701 - Copy.jpg', caption: 'Physiotherapy Session', category: 'Treatment', subtitle: 'Hands-on Patient Care' },
  { id: 'r22', image_url: '/gallery/IMG20260202201715 - Copy.jpg', caption: 'Treatment in Progress', category: 'Treatment', subtitle: 'Dedicated Patient Care' },

  // Awards & News
  { id: 'r23', image_url: '/gallery/awards1.webp', caption: 'Award & Recognition', category: 'Awards', subtitle: 'Excellence in Physiotherapy' },
  { id: 'r24', image_url: '/gallery/awards2.webp', caption: 'Achievement Certificate', category: 'Awards', subtitle: 'Recognized for Outstanding Service' },
  { id: 'r25', image_url: '/gallery/awards3.webp', caption: 'Professional Achievement', category: 'Awards', subtitle: 'Commitment to Excellence' },
  { id: 'r26', image_url: '/gallery/seminar.webp', caption: 'Medical Seminar', category: 'Events', subtitle: 'Continuous Professional Development' },
  { id: 'r27', image_url: '/gallery/news1.webp', caption: 'Media Coverage', category: 'News', subtitle: 'Featured in Local Media' },
  { id: 'r28', image_url: '/gallery/news2.webp', caption: 'News Feature', category: 'News', subtitle: 'Recognized by News Media' },
  { id: 'r29', image_url: '/gallery/news3.webp', caption: 'Press Coverage', category: 'News', subtitle: 'Community Health Awareness' },
  { id: 'r30', image_url: '/gallery/news5.webp', caption: 'Health Awareness', category: 'News', subtitle: 'Physiotherapy Awareness Drive' },
  { id: 'r31', image_url: '/gallery/news6.webp', caption: 'Media Recognition', category: 'News', subtitle: 'Health & Wellness Coverage' },
  { id: 'r32', image_url: '/gallery/news7.webp', caption: 'News Article', category: 'News', subtitle: 'Optimal Physiotherapy in News' },
  { id: 'r33', image_url: '/gallery/news8.webp', caption: 'Press Feature', category: 'News', subtitle: 'Expert Physiotherapy Coverage' },
]

// Dummy/stock images — end mein
const dummyImages = [
  { id: 'd1', image_url: '/gallery/backpain1.jpg', caption: 'Back Pain Treatment', category: 'Treatment', subtitle: 'Spine & Back Rehabilitation' },
  { id: 'd2', image_url: '/gallery/clinic5.png', caption: 'Clinic Facility', category: 'Clinic', subtitle: 'Modern Rehabilitation Setup' },
  { id: 'd3', image_url: '/gallery/clinic8.png', caption: 'Treatment Bay', category: 'Clinic', subtitle: 'Advanced Treatment Equipment' },
  { id: 'd4', image_url: '/gallery/clinic9.png', caption: 'Patient Care', category: 'Clinic', subtitle: 'Dedicated Patient Care' },
  { id: 'd5', image_url: '/gallery/postser.jpg', caption: 'Poster Services', category: 'Services', subtitle: 'Comprehensive Physiotherapy Services' },
]

// Category color map
const categoryColors: Record<string, string> = {
  'Our Team': 'bg-blue-600',
  'Clinic': 'bg-slate-700',
  'Equipment': 'bg-purple-600',
  'Treatment': 'bg-green-600',
  'Sports': 'bg-orange-600',
  'Rehab': 'bg-teal-600',
  "Women's Health": 'bg-pink-600',
  'Awards': 'bg-yellow-600',
  'Events': 'bg-indigo-600',
  'News': 'bg-red-600',
  'Services': 'bg-cyan-600',
}

export default function GalleryPage() {
  const [dbImages, setDbImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function fetchImages() {
      const { data } = await supabase.from('clinic_gallery').select('*').order('id', { ascending: false })
      setDbImages(data || [])
      setLoading(false)
    }
    fetchImages()
  }, [])

  // Real images first, then dummy at end
  const allImages = [...dbImages.map(img => ({...img, subtitle: img.caption})), ...realImages, ...dummyImages]

  // Unique categories
  const categories = ['All', ...Array.from(new Set(allImages.map(img => img.category)))]

  // Filtered images
  const filtered = activeCategory === 'All' ? allImages : allImages.filter(img => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
      {/* Header Navigation */}
      <nav className="p-6 md:px-16 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <Link href="/" className="flex items-center gap-2 group p-2 hover:bg-slate-50 rounded-xl transition">
          <ArrowLeft className="group-hover:-translate-x-1 transition text-blue-600" size={20} />
          <span className="font-black uppercase text-[10px] tracking-widest">Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <Activity className="text-blue-600 shadow-sm" size={24} />
          <span className="font-black tracking-tighter uppercase text-xl">Optimal<span className="text-blue-600 italic">Moments</span></span>
        </div>
        <Link href="/book" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition">
          Book Session
        </Link>
      </nav>

      {/* Main Content */}
      <section className="p-6 md:p-20 max-w-[1400px] mx-auto">

        {/* Hero heading */}
        <div className="mb-12 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <ImageIcon size={200} />
          </div>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Visual Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            RECOVERY <br /> <span className="text-blue-600 font-outline-1 italic">IN FOCUS.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] italic">
            Optimal Rehab Center | Lalghati Bhopal — {allImages.length}+ Photos
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image count */}
        <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
          Showing {filtered.length} photos
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-slate-100 rounded-[3rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-5 space-y-5">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="relative group overflow-hidden rounded-[2rem] bg-white border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid"
              >
                <div className="relative w-full">
                  <img
                    src={img.image_url}
                    alt={img.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

                {/* Category badge — always visible */}
                <div className={`absolute top-3 left-3 ${categoryColors[img.category] || 'bg-blue-600'} text-white px-3 py-1 rounded-full shadow-lg`}>
                  <span className="text-[9px] font-black uppercase tracking-widest">{img.category}</span>
                </div>

                {/* Caption + subtitle — on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-white font-black text-sm uppercase tracking-tight leading-tight">{img.caption}</p>
                  {img.subtitle && img.subtitle !== img.caption && (
                    <p className="text-white/70 text-[10px] font-medium mt-0.5 italic">{img.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-slate-400 text-sm italic font-medium mb-6">Visit us at Lalghati Crossroads, Bhopal</p>
          <Link href="/book"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">
            Book Your Appointment →
          </Link>
        </div>

      </section>
    </div>
  )
}
