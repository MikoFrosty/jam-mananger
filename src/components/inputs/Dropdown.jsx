// DropdownSelect.jsx
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownSelect({ label, valueList, selectedValue, fullWidth, onChange, itemValueKey }) {
  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth={fullWidth} focused>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedValue}
          label={label}
          onChange={onChange}
          size='sm'
        >
          {valueList ? valueList.map((value, index) => (
            <MenuItem key={index} value={value[itemValueKey]}>{value.name}</MenuItem>
          )) : <MenuItem key={"getting-users"} value="getting-users">Getting Users..</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}
