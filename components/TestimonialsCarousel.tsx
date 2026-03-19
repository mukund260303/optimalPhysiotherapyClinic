'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Send, X, ThumbsUp } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { supabase } from '@/lib/supabase'

// Real Google Reviews — Optimal Physiotherapy Bhopal
const googleReviews = [
  // Recent — last 6 months
  { id: 'g1', name: 'Shashi Khubchandani', condition: 'Knee Replacement', initials: 'SK', stars: 5, color: 'bg-lime-600', time: 'a week ago', text: 'I recovered 100% after knee replacement with physiotherapy by Dr Pavan Patidar. Excellent treatment and very professional approach. Highly recommended to everyone!', source: 'Google' },
  { id: 'g2', name: 'Jyoti Thakur', condition: 'Physiotherapy Treatment', initials: 'JT', stars: 5, color: 'bg-orange-500', time: '4 months ago', text: 'I would like to share my experience with this physiotherapy centre. Both Pawan Sir and Raveena Mam are very good at their work, and the environment is very positive. She talks very nicely and explains everything clearly. Highly recommended!', source: 'Google' },
  { id: 'g3', name: 'Sanjay Patidar', condition: 'Osteoarthritis Knee', initials: 'SP', stars: 5, color: 'bg-blue-600', time: '2 months ago', text: 'Here all are very professional, careful examination and treatment of physiotherapy. My mother got excellent results for osteoarthritis knee within 10 days. Dr Ravina and Dr Pavan Patidar are very knowledgeable physiotherapists in Bhopal MP.', source: 'Google' },
  { id: 'g4', name: 'Soniya Panse', condition: 'Low Back Pain', initials: 'SN', stars: 5, color: 'bg-purple-600', time: '3 months ago', text: 'I had low back pain since 2 years. Since the day I started my treatment in your clinic I noticed that my pain got reduced completely. Thank you sir ❤️ The best physiotherapy clinic!', source: 'Google' },
  { id: 'g5', name: 'Sujata Panse', condition: 'Frozen Shoulder', initials: 'SJ', stars: 5, color: 'bg-green-600', time: '3 months ago', text: "Amazing work! My mother's frozen shoulder treatment was superb, awesome and effective. Highly recommended to everyone.", source: 'Google' },
  { id: 'g6', name: 'Sunita Verma', condition: 'Joint Problems', initials: 'SV', stars: 5, color: 'bg-pink-600', time: '2 months ago', text: 'When I have joint problems I always prefer optimal physiotherapy clinic. Here Dr Pavan and Dr Ravina mam are very knowledgeable physiotherapists. Best clinic in Bhopal!', source: 'Google' },
  { id: 'g7', name: 'Drx Arjun Patidar', condition: 'General Treatment', initials: 'DA', stars: 5, color: 'bg-teal-600', time: '2 months ago', text: 'A very talented and amazing doctor. Not only the doctor but the staff is also well trained. Positive vibes around the clinic. Also recommend this doctor to everyone!', source: 'Google' },
  { id: 'g8', name: 'Srishti Soni', condition: 'General Physiotherapy', initials: 'SR', stars: 5, color: 'bg-rose-500', time: '4 months ago', text: 'Facilities are good, best treatment and staffs are polite in nature. Very comfortable environment and professional approach by the entire team.', source: 'Google' },
  { id: 'g9', name: 'Akansha Tejra', condition: 'Knee Injury', initials: 'AK', stars: 5, color: 'bg-amber-500', time: '5 months ago', text: 'My mother was injured on knee — got best results within 10 days. Dr Pavan and Dr Ravina are the best physiotherapists in Bhopal. Highly satisfied!', source: 'Google' },
  { id: 'g10', name: 'kamlesh thawani', condition: 'General Physiotherapy', initials: 'KT', stars: 5, color: 'bg-orange-600', time: '6 months ago', text: 'Treatment given by Dr Pawan Patidar is extremely nice. He is very experienced doctor in our city. His team Dr Ashlesha and Dr Mulesh are also hardworking and cooperative. I wish them success!', source: 'Google' },
  // 6-12 months ago
  { id: 'g11', name: 'Anusha Tiwari', condition: 'Neck & Back Pain', initials: 'AU', stars: 5, color: 'bg-indigo-600', time: '9 months ago', text: 'Excellent experience at Optimal Physiotherapy! Dr. Pawan is an outstanding physiotherapist who provided exceptional care for my neck and back pain. His expertise, patience, and personalized approach made a significant difference. Highly recommend!', source: 'Google' },
  { id: 'g12', name: 'Ravish', condition: 'Pain Relief', initials: 'RV', stars: 5, color: 'bg-cyan-600', time: '9 months ago', text: 'I recently visited Optimal Physiotherapy and had an excellent experience. I felt significant relief from my pain after the sessions. The staff was very good, polite, and genuinely caring. Dr. Pavan is extremely knowledgeable.', source: 'Google' },
  { id: 'g13', name: 'Ishan Sharma', condition: 'PCL Avulsion Fixation', initials: 'IS', stars: 5, color: 'bg-violet-600', time: '8 months ago', text: 'Taking physiotherapy for my younger brother for operated PCL avulsion fixation. I perceive that my brother is feeling much nicer with excellent flexibility and strength improvement. Much better than before!', source: 'Google' },
  { id: 'g14', name: 'bushra parveen', condition: 'Back Muscle Pain', initials: 'BP', stars: 5, color: 'bg-sky-600', time: '8 months ago', text: 'My back muscle pain cured within 3 days. Staff is excellent. Dr Pawan and Dr Ashlesha doing very well and are friendly with the patients. Excellent work and behaviour.', source: 'Google' },
  { id: 'g15', name: 'Daksha Patel', condition: 'Knee Replacement Rehab', initials: 'DP', stars: 5, color: 'bg-pink-500', time: '10 months ago', text: 'Maine apne ghutne ke operation ke baad yaha physiotherapy karayi thi. Dr Pawan and baaki staff sabhi bahut acche hai. Koi bhi prakar ki physiotherapy ke liye aap yaha jaa sakte hai.', source: 'Google' },
  // 1 year ago
  { id: 'g16', name: 'D.L. Patidar', condition: 'Physical Therapy', initials: 'DL', stars: 5, color: 'bg-amber-600', time: '1 year ago', text: 'Dr. Pavan is a high-level physical therapist, very thoughtful and organized, and he achieves great results for his patients. He is a true miracle worker. He took the time to listen and suggest different remedies for my needs.', source: 'Google' },
  { id: 'g17', name: 'Sanjana Ptdr', condition: 'Manual Therapy', initials: 'SG', stars: 5, color: 'bg-red-500', time: '1 year ago', text: 'Best physiotherapy clinic in Bhopal. Dr. Pavan Sir treating patients with very nice cooperation, like family members, with excellent quality of manual hands. His mobilisation is very skilled. Thanks sir and Dr Ravina mam!', source: 'Google' },
  { id: 'g18', name: 'Rijul Rastogi', condition: 'ACL Tear Recovery', initials: 'RR', stars: 5, color: 'bg-emerald-600', time: '1 year ago', text: 'I suffered a partial ACL tear in my right knee while playing indoor soccer in Australia. Mr. Pavan examined my MRI and assured me about recovery. His treatment plan was excellent and I recovered completely!', source: 'Google' },
  { id: 'g19', name: 'Mohit Patidar', condition: 'Knee Injury', initials: 'MH', stars: 5, color: 'bg-fuchsia-600', time: '1 year ago', text: 'When my grandmother injured her knee during a morning jog, Dr. Pavan and Dr. Ravina designed a tailored treatment plan and explained each step, making her feel at ease throughout recovery. Excellent results!', source: 'Google' },
  { id: 'g20', name: 'Saleha Sheikh', condition: 'Wrist Fracture', initials: 'SH', stars: 5, color: 'bg-teal-500', time: '1 year ago', text: "I am incredibly grateful for the guidance from Dr. Pawan Patidar. Their compassionate approach made me feel truly heard. I had a wrist fracture and my hand was fully recovered with their treatment!", source: 'Google' },
  // 2 years ago
  { id: 'g21', name: 'vasu parashar', condition: 'Chronic Back Pain', initials: 'VP', stars: 5, color: 'bg-blue-500', time: '2 years ago', text: 'I was suffering from back pain since last four and half years. After trying almost all possible treatments I did not get satisfactory results. But after only 12 physiotherapy sessions there was excellent relief. Thank you Dr Pavan!', source: 'Google' },
  { id: 'g22', name: 'Nisha Patidar', condition: 'Knee Ligament Injury', initials: 'NP', stars: 5, color: 'bg-purple-500', time: '2 years ago', text: 'Well equipped rehabilitation centre with all professional qualified staff. I took treatment for knee ligament injury and got awesome results within 1 month. Physiotherapist is very caring in nature!', source: 'Google' },
  { id: 'g23', name: 'Arun Mehar', condition: 'Tendon & Nerve Injury', initials: 'AM', stars: 5, color: 'bg-green-500', time: '2 years ago', text: 'I am a 20 year old young man who took physiotherapy for operated tendon and nerve injury of hand for 30 days and got 80% relief from beginning stage. All are very professional at optimal physiotherapy clinic!', source: 'Google' },
  { id: 'g24', name: 'Ritika Sant', condition: 'Sciatica Pain', initials: 'RS', stars: 5, color: 'bg-orange-500', time: '2 years ago', text: 'Dr. Pavan Patidar is very experienced physiotherapist. I took a 15 day treatment for sciatica pain and was very satisfied with the results. Will continue to go for complete recovery.', source: 'Google' },
  { id: 'g25', name: 'mithun patidar', condition: 'Chronic Slip Disc', initials: 'MT', stars: 5, color: 'bg-rose-600', time: '2 years ago', text: 'I was suffering from chronic slip disc pain. After trying all medical treatments, even surgeon advised for operation. Someone suggested physiotherapy — I reached optimal physiotherapy clinic and got much relief within 10 sessions. Thank you Dr Pavan sir!', source: 'Google' },
  // 3 years ago
  { id: 'g26', name: 'Dr. Sameena Farrukh', condition: 'Spine Surgery Rehab', initials: 'DF', stars: 5, color: 'bg-indigo-500', time: '3 years ago', text: 'Dr Pawan is very experienced and devoted to his work. Dr Pawan and Dr Ravina with their team pay sincere and individual attention to their patients. I am very satisfied and suggest others also to visit Optimal Physiotherapy.', source: 'Google' },
  { id: 'g27', name: 'Jitendra Kumar Pushpad', condition: 'Tennis Elbow', initials: 'JK', stars: 5, color: 'bg-cyan-500', time: '3 years ago', text: 'Dr Pavan Patidar is expert in orthopedic injuries. I had taken the treatment for tennis elbow for 10 days, now I feel so good. He has all the latest equipment and a very professional approach!', source: 'Google' },
  { id: 'g28', name: 'aishlisha sharma', condition: 'General Treatment', initials: 'AI', stars: 5, color: 'bg-lime-500', time: '3 years ago', text: 'Dr. Pavan Patidar sir is a very kind and helpful doctor. He understands patients problems very nicely and studies the root cause in depth and treats them properly. I will give 5/5 rating for him!', source: 'Google' },
  // 4-5 years ago
  { id: 'g29', name: 'SIRAJ ALI', condition: 'Monthly Sessions', initials: 'SA', stars: 5, color: 'bg-violet-500', time: '5 years ago', text: 'A very knowledgeable and experienced professional, devoted to his work, keeps personal touch with patients. I am attending his sessions for a month now and very much satisfied. God bless him.', source: 'Google' },
  { id: 'g30', name: 'Anzar Qureshi', condition: 'Physiotherapy', initials: 'AQ', stars: 5, color: 'bg-sky-500', time: '5 years ago', text: 'One of the best places for physiotherapy in Bhopal. Very professional staff and excellent treatment quality. Highly recommended to anyone looking for quality physiotherapy care in the city.', source: 'Google' },
]


type Review = {
  id: string
  name: string
  initials: string
  stars: number
  time: string
  text: string
  color: string
  source: string
}

// Google Logo SVG
const GoogleLogo = () => (
  <svg width="16" height="16" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.5 33.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.5-8 19.5-20 0-1.3-.1-2.7-.4-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.1 0-9.4-2.7-11.3-6.8l-6.6 5.1C9.6 39.5 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
)

const GOOGLE_REVIEW_LINK = 'https://www.google.com/search?kgmid=/g/11mv4wthgn#lrd=0x397c67dde9003c83:0x1c4d2be84f2da5bf,1,,,,'
const WRITE_REVIEW_LINK = 'https://www.google.com/search?kgmid=/g/11mv4wthgn#lrd=0x397c67dde9003c83:0x1c4d2be84f2da5bf,3,,,,'

export default function TestimonialsCarousel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(googleReviews)
  const [totalCount, setTotalCount] = useState(336)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newReview, setNewReview] = useState({ name: '', condition: '', text: '', stars: 5 })

  useEffect(() => {
    loadNewReviews()
  }, [])

  const loadNewReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('id', { ascending: false })

    if (data && data.length > 0) {
      const colors = ['bg-blue-500','bg-purple-500','bg-emerald-500','bg-rose-500','bg-amber-500','bg-teal-500']
      const mapped = data.map((r: any, i: number) => ({
        id: String(r.id),
        name: r.name,
        initials: r.name.split(' ').map((n: string) => n[0]).join('').slice(0,2).toUpperCase(),
        stars: r.stars || 5,
        time: 'Just now',
        color: colors[i % colors.length],
        text: r.text,
        source: 'Verified'
      }))
      setReviews([...mapped, ...googleReviews])
      setTotalCount(336 + data.length)
    }
  }

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (isPaused || showForm) return
    const t = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 3000)
    return () => clearInterval(t)
  }, [isPaused, showForm, reviews.length])

  const handleSubmitReview = async () => {
    if (!newReview.name || !newReview.text) return
    setSubmitting(true)
    const { error } = await supabase.from('reviews').insert([{
      name: newReview.name,
      condition: newReview.condition || 'Patient Review',
      text: newReview.text,
      stars: newReview.stars,
      approved: true
    }])
    setSubmitting(false)
    if (!error) {
      // Add to local state immediately
      const newR: Review = {
        id: `new-${Date.now()}`,
        name: newReview.name,
        initials: newReview.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
        stars: newReview.stars,
        time: 'Just now',
        text: newReview.text,
        color: 'bg-blue-500',
        source: 'Verified'
      }
      setReviews(prev => [newR, ...prev])
      setTotalCount(prev => prev + 1)
      setSubmitted(true)
      setNewReview({ name: '', condition: '', text: '', stars: 5 })
      setTimeout(() => { setSubmitted(false); setShowForm(false) }, 3000)
    }
  }

  const t = reviews[current] || reviews[0]

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          badge="Patient Stories"
          staticText="What Our Patients"
          typingWords={['Say About Us', 'Feel About Us', 'Think About Us', 'Share With Us']}
          subtitle="Real Google reviews from our patients — join thousands who've reclaimed their quality of life."
        />

        {/* Google Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 rounded-[2rem] p-6 mb-12 border border-slate-100"
        >
          {/* Left — Overall rating */}
          <div className="flex flex-col items-center text-center px-6 border-r border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <GoogleLogo />
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Google</span>
            </div>
            <div className="text-5xl font-black text-slate-900 mb-1">4.8</div>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className={i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-200'} />
              ))}
            </div>
            <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 text-xs font-bold hover:underline">
              {totalCount} reviews
            </a>
          </div>

          {/* Star breakdown */}
          <div className="flex-1 space-y-1.5 w-full">
            {[
              { stars: 5, count: 290, pct: 86 },
              { stars: 4, count: 32, pct: 10 },
              { stars: 3, count: 8, pct: 2 },
              { stars: 2, count: 4, pct: 1 },
              { stars: 1, count: 2, pct: 1 },
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold w-4">{row.stars}</span>
                <Star size={10} className="text-yellow-400 fill-yellow-400 shrink-0" />
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${row.pct}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-xs text-slate-400 w-6">{row.pct}%</span>
              </div>
            ))}
          </div>

          {/* Write review button */}
          <div className="flex flex-col gap-2 shrink-0">
            <a href={WRITE_REVIEW_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all">
              <GoogleLogo />
              Write a Review
            </a>
            <button onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-blue-700 transition-all">
              <Send size={12} /> Add Review Here
            </button>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left — Auto scroll stack */}
          <div className="relative h-[320px] sm:h-[360px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <AnimatePresence initial={false}>
              {reviews.map((item, i) => {
                const pos = (i - current + reviews.length) % reviews.length
                if (pos > 3) return null
                return (
                  <motion.div key={item.id}
                    initial={{ y: 400, opacity: 0 }}
                    animate={{ y: pos * 95, opacity: pos === 0 ? 1 : pos === 1 ? 0.7 : pos === 2 ? 0.4 : 0.15, scale: 1 - pos * 0.02 }}
                    exit={{ y: -120, opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className={`absolute left-0 right-0 bg-white border-2 rounded-2xl p-4 shadow-md cursor-pointer ${pos === 0 ? 'border-blue-500 shadow-blue-100' : 'border-slate-100'}`}
                    onClick={() => setCurrent(i)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center font-black text-white text-xs shrink-0`}>
                        {item.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-black text-slate-900 text-sm truncate">{item.name}</p>
                          <div className="flex items-center gap-1 shrink-0">
                            {item.source === 'Google' ? <GoogleLogo /> :
                              <span className="text-[9px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded-full">✓</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: item.stars }).map((_, j) => <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />)}
                          </div>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 italic line-clamp-1">"{item.text}"</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Right — Featured review */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white border-2 border-slate-100 rounded-[2rem] p-7 md:p-8 shadow-lg relative overflow-hidden"
              >
                {/* Google watermark */}
                <div className="absolute top-5 right-6 opacity-20">
                  <svg width="40" height="40" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.5 33.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.5-8 19.5-20 0-1.3-.1-2.7-.4-4z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.1 0-9.4-2.7-11.3-6.8l-6.6 5.1C9.6 39.5 16.3 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
                  </svg>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center font-black text-white text-base`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-base">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                      </div>
                      <span className="text-xs text-slate-400">{t.time}</span>
                      <div className="flex items-center gap-1">
                        {t.source === 'Google' ? (
                          <><GoogleLogo /><span className="text-[10px] text-slate-400">Google</span></>
                        ) : (
                          <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-slate-600 text-sm leading-relaxed italic mb-4">"{t.text}"</p>

                {/* Helpful */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold">
                    <ThumbsUp size={13} /> Helpful
                  </button>
                  <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-500 font-bold hover:underline">
                    View all {totalCount} reviews →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-1.5 justify-center mt-4 flex-wrap">
              {reviews.slice(0, 12).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[500] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={28} className="text-green-500 fill-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Review Added! 🎉</h3>
                  <p className="text-slate-500 text-sm">Shukriya! Aapka review website pe show ho gaya.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <GoogleLogo />
                      <h3 className="text-lg font-black text-slate-900">Share Your Experience</h3>
                    </div>
                    <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Star rating */}
                  <div className="mb-5">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Rating</p>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(s => (
                        <button key={s} onClick={() => setNewReview(p => ({...p, stars: s}))}>
                          <Star size={32} className={`transition-colors ${s <= newReview.stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input type="text" placeholder="Aapka Naam *"
                      value={newReview.name}
                      onChange={(e) => setNewReview(p => ({...p, name: e.target.value}))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors"
                    />
                    <input type="text" placeholder="Treatment ya Condition (optional)"
                      value={newReview.condition}
                      onChange={(e) => setNewReview(p => ({...p, condition: e.target.value}))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors"
                    />
                    <textarea placeholder="Apna experience share karein... *"
                      value={newReview.text} rows={4}
                      onChange={(e) => setNewReview(p => ({...p, text: e.target.value}))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors resize-none"
                    />
                  </div>

                  <button onClick={handleSubmitReview}
                    disabled={submitting || !newReview.name || !newReview.text}
                    className="w-full mt-5 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    <Send size={16} />
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>

                  {/* Also review on Google */}
                  <a href={WRITE_REVIEW_LINK} target="_blank" rel="noopener noreferrer"
                    className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 py-3 rounded-2xl font-black text-xs uppercase tracking-wider hover:border-blue-400 hover:text-blue-600 transition-all">
                    <GoogleLogo /> Ya Google pe bhi review do
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
