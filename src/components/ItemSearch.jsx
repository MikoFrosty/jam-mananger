import { Autocomplete, TextField } from "@mui/material";

export default function ItemSearch({ itemList, onItemSelect, onSearchChange, label, focused }) {
  return (
    <div>
      <Autocomplete
        size="small"
        id="search"
        options={itemList}
        getOptionLabel={(option) => option.title || ""}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} focused={focused} style={{minWidth: "300px"}} label={label} variant="outlined" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            onItemSelect(newValue._id);
          }
        }}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.title.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
        renderOption={(props, option) => <li {...props}>{option.title} </li>}
        onInputChange={(event, newInputValue) => {
          onSearchChange(newInputValue);
        }}
      />
    </div>
  );
}
