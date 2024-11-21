import Image from "next/image";
import logo from "../../public/ecoWareLogo.png"
import React from "react";
import {Box} from "@mui/material";


export default function LogoImage() {

    return (
        <Box sx={{
            position:'fixed',
            top:'25px',
            left:'25px',
            zIndex:'1000',
            padding: 0,
            marginTop: 0,

        }}>
            <Image
                src={logo} alt="Logo Top Left" width={150} height={150}
                />
        </Box>
    );
}