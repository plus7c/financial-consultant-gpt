// store.ts
import { create } from 'zustand'

// 定义 store 的类型
interface SelectedTextStore {
  selectedTexts: string[]
  addSelectedText: (text: string) => void
  removeSelectedText: (index: number) => void
}

// 创建 zustand store
export const useSelectedTextStore = create<SelectedTextStore>((set) => ({
  selectedTexts: [],
  addSelectedText: (text: string) =>
    set((state) => ({
      selectedTexts: [...state.selectedTexts, text],
    })),
  removeSelectedText: (index: number) =>
    set((state) => ({
      selectedTexts: state.selectedTexts.filter((_, i) => i !== index),
    })),
}))
