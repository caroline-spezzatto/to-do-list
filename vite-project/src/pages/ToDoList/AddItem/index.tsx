import { IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AddItemProps } from './interfaces'
import { FormStyled } from './styles'

export const AddItem = ({ item, setItem, handleAddItem }: AddItemProps) => {
  return (
    <FormStyled>
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
        type="submit"
        disabled={!item}
        onClick={() => {
          handleAddItem(item), setItem('')
        }}
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </FormStyled>
  )
}
