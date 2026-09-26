'use client'

export default function ApplicationTracker({ 
  evaluationData, 
  logisticsData 
}: { 
  evaluationData: any, 
  logisticsData: any 
}) {
  // Mapping real database columns to the UI. If no data exists yet, it defaults to false (unmet).
  const essayCriteria = [
    { id: 1, label: 'Compelling Hook (First 50 words)', met: evaluationData?.compelling_hook || false },
    { id: 2, label: 'Clear Academic Trajectory', met: evaluationData?.academic_trajectory || false },
    { id: 3, label: 'Demonstrated Leadership Evidence', met: evaluationData?.leadership_evidence || false },
    { id: 4, label: 'Formatting & Word Count (250-650)', met: evaluationData?.formatting_correct || false },
  ]

  const logistics = [
    { id: 1, label: 'Common App Profile Completed', met: logisticsData?.common_app_completed || false },
    { id: 2, label: 'CSS Profile Financials Submitted', met: logisticsData?.css_profile_submitted || false },
    { id: 3, label: 'Family Tax Returns Verified', met: logisticsData?.tax_returns_verified || false },
    { id: 4, label: 'Counselor Recommendation Attached', met: logisticsData?.counselor_recommendation || false },
  ]

  const CheckIcon = () => (
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
      <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    </div>
  )

  const XIcon = () => (
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
      <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
      
      {/* Essay Evaluator Card */}
      <div className="bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-colors duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-medium">Personal Statement Analysis</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Automated requirement verification</p>
          </div>
        </div>
        
        <ul className="space-y-4">
          {essayCriteria.map((item) => (
            <li key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              {item.met ? <CheckIcon /> : <XIcon />}
              <span className={`text-sm ${item.met ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-900 dark:text-white font-medium'}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logistics & Financials Card */}
      <div className="bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-colors duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-medium">Application Logistics</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Common App & CSS Profile sync</p>
          </div>
        </div>

        <ul className="space-y-4">
          {logistics.map((item) => (
            <li key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              {item.met ? <CheckIcon /> : <XIcon />}
              <span className={`text-sm ${item.met ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-900 dark:text-white font-medium'}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}