import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd'
import {
  Box,
  List,
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material'
import { ItemsProps, ToDoItem } from './interfaces'
import { useItems } from '../../../states/items'

export const Items = ({
  items,
  handleRemoveItem,
  handleCompletedItem
}: ItemsProps) => {
  const { editItem, reorderItems } = useItems()
  const [isItemFocused, setIsItemFocused] = useState(new Array(items.length))

  const reorder = (list: ToDoItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    reorderItems(newItems)
  }

  const handleItemFocusChange = (index: number) => {
    const newIsItemFocused = [...isItemFocused]
    newIsItemFocused[index] = !newIsItemFocused[index]
    setIsItemFocused(newIsItemFocused)
  }

  return (
    <Box marginTop={3}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {provided => (
            <List
              sx={{ width: '100%' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((value, index) => {
                const completedItem = items[index].completed

                return (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={index.toString()}
                  >
                    {provided => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        disablePadding
                        secondaryAction={
                          <IconButton
                            edge="end"
                            type="button"
                            onClick={() => handleRemoveItem(value)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton dense>
                          <ListItemIcon sx={{ minWidth: 0 }}>
                            <Checkbox
                              edge="start"
                              disableRipple
                              checked={completedItem}
                              onClick={() => {
                                handleCompletedItem(value)
                              }}
                            />
                          </ListItemIcon>
                          {!isItemFocused[index] ? (
                            <ListItemText
                              onClick={() => {
                                handleItemFocusChange(index)
                              }}
                              sx={{
                                textDecoration: completedItem
                                  ? 'line-through'
                                  : 'none'
                              }}
                            >
                              {value.item}
                            </ListItemText>
                          ) : (
                            <TextField
                              autoFocus
                              variant="standard"
                              value={value.item}
                              sx={{ width: '100%' }}
                              InputProps={{
                                disableUnderline: true
                              }}
                              onChange={({ target }) => {
                                editItem({ ...value, item: target.value })
                              }}
                              onBlur={() => {
                                handleItemFocusChange(index)
                              }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}
