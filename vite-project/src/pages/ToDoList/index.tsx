import { useState } from 'react'
import { Card, Typography } from '@mui/material'
import { useToDoItems } from '../../states/items'
import { AddItem } from './AddItem'
import { Items } from './Items'

export const ToDoList = () => {
  const [item, setItem] = useState('')
  const { addItem, removeItem, completedItem, items } = useToDoItems()

  const addToDoItem = () => {
    addItem({ id: items.length + 1, item: item, completed: false })
  }

  const haveItem = items?.length > 0

  return (
    <Card sx={{ maxWidth: 600, padding: 2, margin: '0 auto' }}>
      <Typography
        variant="h6"
        marginBottom={2}
        textAlign="start"
        color="#696969"
      >
        Nova tarefa:
      </Typography>

      <AddItem item={item} addToDoItem={addToDoItem} setItem={setItem} />
      {haveItem && (
        <Items
          items={items}
          removeItem={removeItem}
          completedItem={completedItem}
        />
      )}
    </Card>
  )
}
