import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function AboutPage() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push("/"); // This will navigate to the home page (or you can adjust to another page)
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '0 16px', // Add padding for spacing
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    backgroundColor: 'rgba(210,210,210,.95)',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Header with Back Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>
                        About Ecoware
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleBackClick}
                        sx={{ borderColor: 'black', color:'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#676767' } }}
                    >
                        Back
                    </Button>
                </Box>

                {/* Content Sections */}
                <Typography sx={{ color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }}><strong>Who We Are:</strong></Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Arial', marginBottom: '16px' }}>
                    Ecoware is a leader in providing sustainable, eco-friendly foodware and drinkware solutions.
                    We are committed to helping reduce the environmental impact of single-use plastic products, offering alternatives
                    that are safe for the planet, practical for everyday use, and stylish.
                </Typography>

                <Typography sx={{ color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }}><strong>Our Mission:</strong></Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Arial', marginBottom: '16px' }}>
                    Our mission is to lead the shift towards sustainability in the food and beverage industry.
                    We strive to provide innovative, eco-friendly alternatives to disposable plastics, creating products that are
                    durable, compostable, and made from responsibly sourced materials.
                </Typography>

                <Typography sx={{ color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }}><strong>Our Goals:</strong></Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Arial', marginBottom: '16px' }}>
                    - Minimize environmental waste by promoting reusable and biodegradable options.<br />
                    - Educate businesses and consumers about the importance of sustainable choices.<br />
                    - Foster partnerships with like-minded organizations to drive the global movement towards sustainability.<br />
                    - Continuously innovate and improve our products to stay at the forefront of eco-friendly solutions.
                </Typography>

                <Typography sx={{ color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }}><strong>Our History:</strong></Typography>
                <Typography sx={{ color: 'black', fontFamily: 'Arial', marginBottom: '16px' }}>
                    Ecoware was founded in 2015 with the goal of reducing the environmental footprint of everyday food and beverage products.
                    Since then, we've grown into a trusted provider for sustainable solutions, collaborating with leading brands and
                    businesses to create a more sustainable future. Our products are now used across industries including hospitality,
                    food service, and retail.
                </Typography>
            </Box>
        </Box>
    );
}
