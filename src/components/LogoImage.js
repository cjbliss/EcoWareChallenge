import Image from "next/image";
import logo from "../../public/ecoWareLogo.png"


export default function LogoImage() {

    return (
        <div style={{
            position:'fixed',
            top:'20px',
            left:'20px',
            zIndex:'1000',
        }}>
            <Image
                src={logo} alt="Logo Top Left" width={80} height={80}
                />
        </div>
    );
}