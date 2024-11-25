import Image from "next/image";
import logo from "../../public/ecoWareLogo.png"
import React from "react";
import {Box} from "@mui/material";


export default function LogoImage() {

    return (
        <Box sx={{
            position:'fixed',
            top:0,
            left:0,
            marginTop: 8,
            zIndex:'100',
            padding: 2,

        }}>
            <Image
                src={logo} alt="Logo Top Left" width={150} height={150}
                alt="Logo"
                width={0}
                height={0}
                style={{
                    objectFit:'contain',
                    width:'7vw',
                    height: 'auto',
                }}
                />
        </Box>
    );
}