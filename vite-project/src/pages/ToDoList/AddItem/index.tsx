import { Box, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AddItemProps } from './interfaces'

export const AddItem = ({ item, setItem, handleAddItem }: AddItemProps) => {
  return (
    <Box display="flex">
      <TextField
        fullWidth
        value={item}
        label="Tarefa"
        variant="outlined"
        sx={{ marginRight: 2 }}
        onChange={({ target }) => {
          setItem(target.value)
        }}
      />
      <IconButton
        disabled={!item}
        type="submit"
        onClick={() => {
          handleAddItem(item), setItem('')
        }}
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}
