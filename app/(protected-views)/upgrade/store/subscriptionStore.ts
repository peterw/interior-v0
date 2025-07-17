import { create } from 'zustand';

interface SubscriptionStore {
  credits: number;
  plan: 'free' | 'pro' | 'enterprise';
  plansData: any;
  setCredits: (credits: number) => void;
  setPlan: (plan: 'free' | 'pro' | 'enterprise') => void;
  setPlansData: (data: any) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  credits: 0,
  plan: 'free',
  plansData: null,
  setCredits: (credits) => set({ credits }),
  setPlan: (plan) => set({ plan }),
  setPlansData: (plansData) => set({ plansData }),
}));