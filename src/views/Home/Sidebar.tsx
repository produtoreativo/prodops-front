import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';

type SidebarProps = {
  stageChange: (payload: {}) => void,
  stageValue: number,
  stages: {name: string, value: number}[],
  goNext: any,
}

type Item = {
  name: string,
  value: number,
}

export default function Sidebar(props: SidebarProps) {

  const handleChange = (event: SelectChangeEvent) => {
    props.stageChange(
      {[event.target.name]: event.target.value}
    )
  };

  const items = props.stages.map((item: Item) => (
    <MenuItem value={item.value.toString()}>{item.name}</MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estágio</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="stageValue"
          value={props.stageValue.toString()}
          label="Age"
          onChange={handleChange}
        >
          {items}
        </Select>
      </FormControl>
      <Button onClick={props.goNext}>Proximo</Button>
    </Box>
  )
}
