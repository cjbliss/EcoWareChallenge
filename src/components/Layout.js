import React from 'react';
import LogoImage from "@/components/LogoImage";
import BackgroundImage from "@/components/BackgroundImage";
import {Box} from "@mui/material";

export default function Layout({children}) {
    return (
        <Box sx={{position:'relative', minHeight: '100vh', margin:0, padding:0}}>
            <BackgroundImage/>

            <Box sx={{position:'relative', zIndex: 1}}>
                <LogoImage/>
                {children}
            </Box>
        {/*    <BackgroundImage/>*/}
        </Box>
    );
}