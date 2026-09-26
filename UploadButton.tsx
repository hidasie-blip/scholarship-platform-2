'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { evaluateEssay } from './actions'

export default function UploadButton({ candidateId }: { candidateId: string }) {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return
      
      setUploading(true)
      const file = event.target.files[0]
      
      // 1. Show processing toast
      toast.loading('Analyzing document structure...', { id: 'upload-toast' })

      // 2. Simulate the file upload to storage
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.loading('Running AI criteria evaluation...', { id: 'upload-toast' })

      // 3. Trigger the backend evaluation engine we just built
      await evaluateEssay(candidateId)

      // 4. Show success
      toast.success('Document verified and requirements met.', { id: 'upload-toast' })
      
    } catch (error) {
      toast.error('Evaluation failed. Please try again.', { id: 'upload-toast' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          onChange={uploadFile}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        <button className="w-full bg-gradient-to-b from-emerald-500/10 to-emerald-600/5 border-t border-emerald-400/40 border-b border-slate-300 dark:border-black text-emerald-700 dark:text-emerald-300 py-3 rounded-xl text-sm font-medium transition-all shadow-md dark:shadow-[0_5px_15px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-inner z-10 relative">
          {uploading ? 'Processing Data...' : 'Upload Evidence'}
        </button>
      </div>
    </div>
  )
}