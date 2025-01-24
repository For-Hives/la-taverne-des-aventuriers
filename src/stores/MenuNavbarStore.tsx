import { create } from 'zustand'

interface Store {
	activeCategory: string
	setActiveCategory: (category: string) => void
}

export const useStore = create<Store>(set => ({
	activeCategory: 'All', //Initial Value
	setActiveCategory: (category: string) => {
		set({ activeCategory: category }) // Synchrone uniquement
	},
}))
