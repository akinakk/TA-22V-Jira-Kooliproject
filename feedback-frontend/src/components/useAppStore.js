import { create } from 'zustand';

const useAppStore = create((set) => ({
    formData: { nimi: '', rühm: '' },
    step: 1,
    studentId: null,
    setFormData: (data) => set({ formData: data }),
    setStep: (step) => set({ step }),
    setStudentId: (id) => set({ studentId: id }),
}));

export default useAppStore;
