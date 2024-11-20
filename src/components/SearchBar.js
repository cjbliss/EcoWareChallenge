import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export default function SearchBar({value, handleChange}) {
    return (
        <TextField
            label="Search"
            variant="outlined"
            value={value}
            onChange={handleChange}
            size="medium"
            sx={{
                mx:2,
                flexGrow:1,
            }}
            slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end"> <SearchIcon /> </InputAdornment>,
                },
            }}
        />
    )
}