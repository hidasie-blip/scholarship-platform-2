import { supabase } from '../../../lib/supabase'
import UploadButton from './UploadButton'
import ApplicationTracker from './ApplicationTracker'

export default async function StudentDashboard({ params }: { params: { id: string } }) {
  // 1. Fetch Candidate Profile
  const { data: candidate, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#05090C] text-slate-500 flex items-center justify-center">
        <p>System Error: Candidate profile not located.</p>
      </div>
    )
  }

  // 2. Fetch Live Logistics Data
  const { data: logisticsData } = await supabase
    .from('scholarship_logistics')
    .select('*')
    .eq('candidate_id', params.id)
    .single()

  // 3. Fetch Live Evaluation Data
  const { data: evaluationData } = await supabase
    .from('essay_evaluations')
    .select('*')
    .eq('candidate_id', params.id)
    .single()

  const score = candidate.readiness_score || 0
  const name = candidate.full_name || 'Candidate'
  const impactPeople = candidate.impact_people || 0
  const impactCorners = candidate.impact_corners || 0
  const leadershipStage = candidate.leadership_stage || 1
  
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#05090C] text-slate-800 dark:text-neutral-200 p-8 md:p-12 font-sans overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-[-10%] right-[10%] w-[800px] h-[800px] bg-emerald-200/40 dark:bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none transition-colors duration-300"></div>
      <div className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[150px] pointer-events-none transition-colors duration-300"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-12 text-sm text-slate-500 dark:text-neutral-500 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span>/</span>
          <span className="text-slate-700 dark:text-neutral-300">Dashboard</span>
        </div>

        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-slate-900 dark:text-white transition-colors duration-300">
              {name}<br />Overview.
            </h1>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-md transition-colors duration-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] dark:shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              <p className="text-emerald-700 dark:text-emerald-400 font-mono text-xs tracking-wider uppercase">System Online: Secure Connection</p>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/60 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="4" fill="none" />
                <circle cx="80" cy="80" r={radius + 8} stroke="currentColor" className="text-slate-200 dark:text-white/5" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                <circle cx="80" cy="80" r={radius} stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-light text-slate-900 dark:text-white">{score}<span className="text-xl">%</span></span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {/* Card 1: Verified Impact */}
          <div className="bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-xl transition-all duration-500 flex flex-col justify-between min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-slate-900 dark:text-white text-lg font-medium">Verified Impact</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-slate-900 dark:text-white mb-6">{impactPeople} <span className="text-lg text-slate-500">people</span></div>
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-100 dark:bg-black/60 rounded-xl p-3 border border-slate-200 dark:border-white/5">
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium text-lg">{impactPeople}</div>
                  <div className="text-xs text-slate-500">people</div>
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-black/60 rounded-xl p-3 border border-slate-200 dark:border-white/5">
                  <div className="text-amber-600 dark:text-amber-400 font-medium text-lg">{impactCorners}</div>
                  <div className="text-xs text-slate-500">corners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Leadership Profile */}
          <div className="bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-xl transition-all duration-500 flex flex-col justify-between min-h-[400px]">
             <div className="flex justify-between items-center mb-8">
              <h3 className="text-slate-900 dark:text-white text-lg font-medium">Leadership Profile</h3>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Virtualized Progress Track</p>
              <div className="flex justify-between items-center relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-black/60 rounded-full -z-10"></div>
                {[1, 2, 3, 4, 5].map((stage) => {
                  if (stage < leadershipStage) return <div key={stage} className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10"></div>;
                  if (stage === leadershipStage) return <div key={stage} className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] z-10 border-2 border-white"></div>;
                  return <div key={stage} className="w-3 h-3 rounded-full bg-slate-300 dark:bg-neutral-800 z-10 border border-slate-400"></div>;
                })}
              </div>
            </div>
          </div>

          {/* Card 3: Next Directive */}
          <div className="relative p-8 rounded-[2rem] border border-emerald-200 dark:border-emerald-400/20 bg-emerald-50/50 dark:bg-emerald-900/20 backdrop-blur-xl shadow-xl flex flex-col justify-between min-h-[400px] overflow-hidden">
            <div className="relative z-10 flex justify-between items-center mb-8">
              <h3 className="text-emerald-900 dark:text-emerald-50 text-lg font-medium">Next Directive</h3>
            </div>
            <div className="relative z-10 text-center">
              <p className="text-sm text-emerald-800/70 dark:text-emerald-100/70 mb-6 leading-relaxed">
                Upload a beautiful document indicating verified community involvement.
              </p>
              <UploadButton candidateId={params.id} />
            </div>
          </div>
        </section>

        {/* Command Center Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Command Center</h2>
          <p className="text-sm text-slate-500">Real-time evaluation and requirement tracking.</p>
        </div>
        
        <ApplicationTracker evaluationData={evaluationData} logisticsData={logisticsData} />

      </div>
    </main>
  )
}