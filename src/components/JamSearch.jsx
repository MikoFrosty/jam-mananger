import { Autocomplete, TextField } from "@mui/material";

export default function JamSearch({ jamList, onJamSelect, onSearchChange }) {
  return (
    <div>
      <Autocomplete
        size="small"
        id="search-jams"
        options={jamList || []}
        getOptionLabel={(option) => option.title || ""}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Search Jams" variant="outlined" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            onJamSelect(newValue._id);
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
        // sx={{
        //   ".MuiOutlinedInput-notchedOutline": {
        //     borderColor: "white",
        //   },
        //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        //     borderColor: "pink",
        //   },
        //   "&:hover .MuiOutlinedInput-notchedOutline": {
        //     borderColor: "pink",
        //   },
        // }}
      />
    </div>
  );
}
