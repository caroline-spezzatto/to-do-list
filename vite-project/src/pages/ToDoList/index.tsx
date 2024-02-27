import { useState } from 'react'
import { Card, Typography } from '@mui/material'
import { useItems } from '../../states/items'
import { AddItem } from './AddItem'
import { Items } from './Items'

export const ToDoList = () => {
  const [item, setItem] = useState('')
  const { addItem, removeItem, completedItem, items } = useItems()

  const id = Math.random().toString(16).slice(2)

  const handleAddItem = () => {
    addItem({
      id,
      item: item,
      completed: false
    })
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

      <AddItem item={item} handleAddItem={handleAddItem} setItem={setItem} />
      {haveItem && (
        <Items
          items={items}
          handleRemoveItem={removeItem}
          handleCompletedItem={completedItem}
        />
      )}
    </Card>
  )
}
