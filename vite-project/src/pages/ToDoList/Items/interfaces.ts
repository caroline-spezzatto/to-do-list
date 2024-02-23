type ToDoItem = {
  id: number
  item: string
  completed: boolean
}

export interface ItemsProps {
  items: ToDoItem[]
  removeItem: (item: ToDoItem) => void
  completedItem: (item: ToDoItem) => void
}
