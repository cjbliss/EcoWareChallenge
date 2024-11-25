import Image from "next/image";
import background1 from "../../public/background1.jpeg"
import background2 from "../../public/background2.jpeg"
import background3 from "../../public/background3.jpeg"
import background4 from "../../public/background4.jpeg"
import {Box} from "@mui/material";



export default function BackgroundImage() {

    return (
        <Box
            sx={{
                position:'fixed',
                top: 0,
                left: 0,
                bottom:0,
                right:0,
                width:'100vw',
                height:'100vh',
                margin: 0,
                padding: 0,
                zIndex: -1,
                backgroundImage: `url(${background1.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
             }}/>

    );
}