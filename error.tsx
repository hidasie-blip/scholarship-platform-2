'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05090C] text-white">
      <h2 className="text-xl mb-4">Something went wrong.</h2>
      <p className="text-red-400 mb-8">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-emerald-500 rounded-lg text-black">Try again</button>
    </div>
  )
}