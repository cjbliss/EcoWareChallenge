import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";


export default function SearchBar({value, handleChange}) {

    const [focused, setFocused] = useState(false);



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
                    width:'100%',
                    backgroundColor: focused ? 'rgba(210,210,210,.9)' : 'rgba(210,210,210,.5)',
                    transition: 'background-colo3 0.3s ease',
                    // '& .MuiInputLabel-root': {
                    //     transition: 'all 0.2s ease', // Smooth transition for the label
                    //     zIndex: 15, // Ensure the label is above the input
                    // },


                }}
                onFocus={() => setFocused(true)}
                onBlur={() =>setFocused(false)}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end"> <SearchIcon /> </InputAdornment>,
                    },
                }}
            />
    )
}