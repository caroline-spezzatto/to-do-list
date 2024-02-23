import DeleteIcon from '@mui/icons-material/Delete'
import {
  List,
  Card,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material'
import { ItemsProps } from './interfaces'

export const Items = ({
  items,
  removeItem,
  completedItem
}: ItemsProps) => {
  return (
    <Card sx={{ maxWidth: 600, padding: 2, marginTop: 2 }}>
      {
        <List sx={{ width: '100%' }}>
          {items.map((value, index) => {
            return (
              <ListItem
                key={index}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    type="button"
                    onClick={() => removeItem(value)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  dense
                  onClick={() => {
                    completedItem(value)
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      disableRipple
                      checked={items[index].completed}
                    />
                  </ListItemIcon>
                  <ListItemText>{value.item}</ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      }
    </Card>
  )
}
