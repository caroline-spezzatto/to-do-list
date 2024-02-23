import { create } from 'zustand'

type ToDoItem = {
  id: number
  item: string
  completed: boolean
}

export interface State {
  items: ToDoItem[]
  addItem(item: ToDoItem): void
  removeItem(item: ToDoItem): void
  completedItem(item: ToDoItem): void
}

export const useToDoItems = create<State>(set => ({
  items: [],
  addItem: item => set(state => ({ items: [...state.items, item] })),
  removeItem: item =>
    set(state => ({
      items: state.items.filter(({ id }) => id !== item.id)
    })),
  completedItem(item) {
    set(state => ({
      items: state.items.map(item2 => {
        if (item2.id === item.id) {
          return { ...item2, completed: !item2.completed }
        }
        return item2
      })
    }))
  }
}))
