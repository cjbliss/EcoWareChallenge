import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function VendorDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [vendor, setVendor] = useState({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        tag: '',
        additionalInfo: '' // Ensure there's an additionalInfo field.
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/vendors/${id}`)
                .then((res) => {
                    if (res.ok) return res.json();
                    throw new Error('Vendor not found');
                })
                .then((data) => setVendor(data))
                .catch((error) => {
                    console.error(error);
                    router.push('/');
                });
        }
    }, [id]);

    if (!vendor) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',  // Make sure the container takes full height
                backgroundColor: 'rgba(0, 0, 0, 0.05)', // Optional: semi-transparent background
            }}
        >
            <Box
                sx={{
                    width: '70%', // Set width to 70% of the screen
                    backgroundColor: 'rgba(210,210,210,.95)', // 95% opacity white background
                    borderRadius: '8px', // Optional: rounded corners
                    display: 'grid', // Use grid layout to organize content
                    gridTemplateColumns: '1fr 1fr', // Two columns: one for text details, one for additional info
                    gap: '16px', // Spacing between columns
                    padding: '24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Optional: slight shadow
                    position: 'relative', // Enable absolute positioning for the back button
                }}
            >
                {/* Back Button */}
                <Button
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        color: 'black',
                        borderColor: 'black',
                        '&:hover': { backgroundColor: '#676767' }
                    }}
                    onClick={() => router.back()} // Go back to previous page
                >
                    Back
                </Button>

                {/* Vendor Details Section */}
                <Box>
                    <Typography variant="h4" sx={{ marginBottom: '16px', color: 'black', fontWeight: 'bold' }}>
                        {vendor.name}
                    </Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Name:</strong> {vendor.name}</Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Contact:</strong> {vendor.contact}</Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Email:</strong> {vendor.email}</Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Phone:</strong> {vendor.phone}</Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Address:</strong> {vendor.address}</Typography>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial' }}><strong>Vendor Type:</strong> {vendor.tag}</Typography>
                </Box>

                {/* Additional Information Section */}
                <Box>
                    <Typography sx={{ color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }}><strong>Additional Information:</strong></Typography>
                    <Typography
                        sx={{
                            padding: '8px',
                            borderRadius: '4px',
                            marginTop: '8px',
                            whiteSpace: 'pre-wrap',
                            color: 'black',
                            fontFamily: 'Arial',
                        }}
                    >
                        {vendor.additionalInfo}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
