import { Box, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AddItemProps } from './interfaces'

export const AddItem = ({ item, setItem, addToDoItem }: AddItemProps) => {
  return (
    <Box display="flex">
      <TextField
        fullWidth
        value={item}
        label="Tarefa"
        variant="outlined"
        sx={{ marginRight: 2 }}
        onChange={e => {
          setItem(e.target.value)
        }}
      />
      <IconButton
        type="submit"
        onClick={() =>addToDoItem(item)}
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
