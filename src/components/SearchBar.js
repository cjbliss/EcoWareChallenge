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
                    width:'auto',
                    backgroundColor: focused ? 'rgba(210,210,210,.9)' : 'rgba(210,210,210,.5)',
                    transition: 'background-colo3 0.3s ease',
                    '& .MuiInputLabel-root': {
                        transform: 'translate(15px, 17px) scale(1)',
                        transition: 'all 0.2s ease-in-out',
                    },
                    '& .MuiInputLabel-shrink': {
                        transform: 'translate(14px, -3px) scale(0.6)', // Adjust the position when it floats
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#19a7d2', // Optional: change color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#19a7d2', // Optional: change color on focus
                        },
                    },

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
