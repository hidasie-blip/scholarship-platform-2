export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#05090C] p-8 md:p-12 flex flex-col gap-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="h-16 w-64 bg-slate-200 dark:bg-white/5 rounded-xl"></div>
          <div className="h-8 w-48 bg-slate-200 dark:bg-white/5 rounded-full"></div>
        </div>
        <div className="h-32 w-80 bg-slate-200 dark:bg-white/5 rounded-3xl"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] bg-slate-200 dark:bg-white/5 rounded-[2rem]"></div>
        ))}
      </div>
    </main>
  )
}