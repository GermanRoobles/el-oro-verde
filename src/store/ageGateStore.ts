import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AgeGateStore {
  verified: boolean;
  setVerified: (v: boolean) => void;
}

export const useAgeGateStore = create<AgeGateStore>()(
  persist(
    (set) => ({
      verified: false,
      setVerified: (v) => set({ verified: v }),
    }),
    { name: 'eloroverde-age' }
  )
);
