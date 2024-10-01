import { create } from 'zustand';

const useAppStore = create((set) => ({
    formData: { nimi: '', rühm: '' },
    step: 1,
    setFormData: (data) => set({ formData: data }),
    setStep: (step) => set({ step }),
}));

export default useAppStore;
