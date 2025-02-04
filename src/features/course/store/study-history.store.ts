
import { create } from 'zustand'
import type { LastStudyHistory } from '../types/course-types'
import { createJSONStorage, persist } from 'zustand/middleware'


interface StudyHistoryState {
  studyHistory: LastStudyHistory | null
  setStudyHistory: (studyHistory: LastStudyHistory) => void
  getStudyHistory: () => LastStudyHistory | null
}

export const useStudyHistoryStore = create<StudyHistoryState>()(
  persist(
    (set, get) => ({
      studyHistory: null,
      setStudyHistory: (studyHistory: LastStudyHistory) => set({ studyHistory }),
      getStudyHistory: () => get().studyHistory,
    }),
  {
      name: 'study-history-storage',  
      storage: createJSONStorage(() => localStorage)
    }
  )
)
