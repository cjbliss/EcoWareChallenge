import {Typography} from "@mui/material";


export default function Header({contents}) {

    return (
        <Typography
            variant="h3"
            component="h1"
            sx={{my:4, textAlign: "center", color: "primary.main"}}
            gutterBottom>
            {contents}
        </Typography>
    );
}