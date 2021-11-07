import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { RootStateAssessment } from './redux';

type Item = {
  name: string,
  value: number,
}

export default function Sidebar(props: RootStateAssessment) {

  const handleChange = (event: SelectChangeEvent) => {
    props.stageChange({
      [event.target.name]: Number(event.target.value)
    })
  };

  const items = props.stages.map( (item: Item) => (
    <MenuItem 
      key={`item-${item.name}`}
      value={ item.value.toString() }
    >
        {item.name}
    </MenuItem>
  ))

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="stages-select-label">Estágio do Produto</InputLabel>
        <Select
          labelId="stages-select-label"
          name="stageValue"
          value={props.stageValue.toString()}
          label="Estágio do Produto"
          onChange={handleChange}
        >
          {items}
        </Select>
      </FormControl>
      <Button onClick={props.goNext}>Proximo</Button>
    </Box>
  )
}
