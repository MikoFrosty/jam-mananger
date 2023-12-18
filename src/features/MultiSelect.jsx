import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function MultipleSelect({
  handleChange,
  selectedData,
  label,
  children,
  jam_groups,
}) {
  return (
    <div style={{height: "fit-content"}}>
      <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          size="small"
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#F3EDCD",
              borderWidth: 2,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F3EDCD",
              borderWidth: 2
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F3EDCD",
              borderWidth: 2
            },
          }}
          onFocus={"none"}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedData}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            const selectedTitles = selected.map((s) => {
              const group = jam_groups?.find(
                (group) => s === group.jam_group_id
              );
              return group ? group.title : ""; // Return the title if found, otherwise an empty string
            });

            return selectedTitles.join(", "); // Join the titles with a comma or any other separator
          }}
          MenuProps={MenuProps}
        >
          <MenuItem onChange={handleChange} key={1} value="All">
            {"All"}
          </MenuItem>
          {children}
        </Select>
      </FormControl>
    </div>
  );
}
