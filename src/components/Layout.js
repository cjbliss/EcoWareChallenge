import React from 'react';
import LogoImage from "@/components/LogoImage";
import BackgroundImage from "@/components/BackgroundImage";
import NavBar from "@/components/NavBar";
import {Box} from "@mui/material";


export default function Layout({children}) {
    return (
        <Box sx={{position:'relative', minHeight: '100vh', margin:0, padding:0}}>

            <BackgroundImage/>
            <Box sx={{position:'relative', minHeight:'100vh', margin:0, padding:0}}>
                <NavBar/>
                <Box sx={{position:'relative', zIndex: 1, marginTop: 8}}>
                    <LogoImage/>
                    {children}
                </Box>
            </Box>
            {/*    <BackgroundImage/>*/}
        </Box>
    );
}