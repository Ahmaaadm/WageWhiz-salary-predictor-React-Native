import { create } from 'zustand';

const useStore = create((set) => ({
  selectedModel: 'gbr', // Default value
  setSelectedModel: (model) => set({ selectedModel: model }),
}));

export default useStore;
