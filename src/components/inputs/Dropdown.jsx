import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownSelect({ label, valueList, fullWidth, onChange, focused }) {
  const [age, setAge] = useState('');

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl focused={focused} fullWidth={fullWidth}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={age}
          label={label}
          onChange={onChange}
        >
          {/* {
            valueList.map((value) => {
              return (
                <MenuItem value={value.value}>{value.label}</MenuItem>
              )
            })
          } */}
        </Select>
      </FormControl>
    </Box>
  );
}