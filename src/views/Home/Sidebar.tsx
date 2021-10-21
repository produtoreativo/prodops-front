import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SidebarProps {
  stageChange: any
}

export default function Sidebar(props: SidebarProps) {
  const [stage, setStage] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStage(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stage}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ideation</MenuItem>
          <MenuItem value={20}>Operation</MenuItem>
          <MenuItem value={30}>Traction</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
