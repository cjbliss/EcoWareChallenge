import {AppBar, Toolbar, Typography, Box, Button} from "@mui/material";
import Link from "next/link";


export default function NavBar() {

    return (
        <AppBar position='fixed' elevation={0} sx={{
            backdropFilter:'blur(10px)',
            backgroundColor:'rgba(214,203,179,0.8)',
            color:'#000',
        }}>
            <Toolbar>
                <Typography variant='h6' sx={{flexGrow:1}}>
                    <Link href="/" style={{textDecoration: 'none', color: 'black'}}>
                        Vendor Management
                    </Link>
                </Typography>
                <Box>
                    <Button color='inherit'>
                        <Link href="/" style={{textDecoration: 'none', color: 'black'}}>
                            Home
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link href="/about" style={{textDecoration: 'none', color: 'black'}}>
                            About
                        </Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )

}