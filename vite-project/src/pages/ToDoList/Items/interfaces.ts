export type ToDoItem = {
  id: string
  item: string
  completed: boolean
}

export interface ItemsProps {
  items: ToDoItem[]
  handleRemoveItem: (item: ToDoItem) => void
  handleCompletedItem: (item: ToDoItem) => void
}
