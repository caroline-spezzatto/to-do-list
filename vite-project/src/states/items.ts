import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Item = {
  id: string
  item: string
  completed: boolean
}

export interface State {
  items: Item[]
  addItem(item: Item): void
  editItem(item: Item): void
  removeItem(item: Item): void
  completedItem(item: Item): void
  reorderItems(items: Item[]): void
}

export const useItems = create(
  persist<State>(
    set => ({
      items: [],
      addItem: item => set(state => ({ items: [...state.items, item] })),
      editItem: item => {
        set(state => ({
          items: state.items.map(i => (i.id === item.id ? item : i))
        }))
      },
      reorderItems: items => set({ items }),
      removeItem: item =>
        set(state => ({
          items: state.items.filter(({ id }) => id !== item.id)
        })),
      completedItem(items) {
        set(state => ({
          items: state.items.map(item => {
            if (item.id === items.id) {
              return { ...item, completed: !item.completed }
            }
            return item
          })
        }))
      }
    }),
    {
      name: 'items-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
