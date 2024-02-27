import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
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
import { ItemsProps } from './interfaces'
import { useItems } from '../../../states/items'

export const Items = ({
  items,
  handleRemoveItem,
  handleCompletedItem
}: ItemsProps) => {
  const { editItem } = useItems()
  const [isItemFocused, setIsItemFocused] = useState(new Array(items.length))

  const handleItemFocusChange = (index: number) => {
    const newIsItemFocused = [...isItemFocused]
    newIsItemFocused[index] = !newIsItemFocused[index]
    setIsItemFocused(newIsItemFocused)
  }

  return (
    <Box marginTop={3}>
      {
        <List sx={{ width: '100%' }}>
          {items.map((value, index) => {
            const completedItem = items[index].completed

            return (
              <ListItem
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
                        textDecoration: completedItem ? 'line-through' : 'none'
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
            )
          })}
        </List>
      }
    </Box>
  )
}
