'use server'

import { supabase } from '../../../lib/supabase'
import { revalidatePath } from 'next/cache'

export async function evaluateEssay(candidateId: string) {
  // 1. Simulate the time it takes for an AI or backend to parse a PDF/Word doc
  await new Promise(resolve => setTimeout(resolve, 2500))

  // 2. Check if an evaluation record already exists for this candidate
  const { data: existingRecord } = await supabase
    .from('essay_evaluations')
    .select('id')
    .eq('candidate_id', candidateId)
    .single()

  // 3. Update or Insert the new passing grades into the database
  if (existingRecord) {
    await supabase
      .from('essay_evaluations')
      .update({
        compelling_hook: true,
        academic_trajectory: true,
        leadership_evidence: true,
        formatting_correct: true,
      })
      .eq('candidate_id', candidateId)
  } else {
    await supabase
      .from('essay_evaluations')
      .insert({
        candidate_id: candidateId,
        compelling_hook: true,
        academic_trajectory: true,
        leadership_evidence: true,
        formatting_correct: true,
      })
  }

  // 4. Force Next.js to instantly update the UI with the new database values
  revalidatePath(`/dashboard/${candidateId}`)
}