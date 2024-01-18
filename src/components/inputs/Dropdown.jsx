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
      <FormControl fullWidth={fullWidth}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedValue}
          label={label}
          onChange={onChange}
        >
          {valueList.map((value, index) => (
            <MenuItem key={index} value={value[itemValueKey]}>{value.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
