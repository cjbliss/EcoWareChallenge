// pages/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box, FormControl, Select, MenuItem, InputLabel,
} from '@mui/material';
import InputMask from 'react-input-mask';
import 'react-phone-number-input/style.css';
// import PhoneInput from "react-phone-number-input";
import {Ledger} from "next/font/google";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import PhoneField from "@/components/PhoneField";

const TAG_OPTIONS = ['Manufacturer', 'Wholesaler', 'Retailer','Service', 'Independent', 'Other'];


const ledger = Ledger({
    subsets: ['latin'], // Choose the character subset you need
    weight: '400',      // Specify the weight (Knewave only supports 400)
});

export default function AddVendor() {
    const router = useRouter();
    const { id } = router.query;
    const [vendor, setVendor] = useState({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        tag:'',
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');

    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelperText, setPhoneHelperText] = useState('');

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setVendor({ ...vendor, [name]: value });

        if( name === 'email') {
            if (!emailRegex.test(value)) {
                setEmailError(true);
                setEmailHelperText('Please enter a valid email address ');
            } else {
                setEmailError(false);
                setEmailHelperText('');
            }
        }
        setVendor({
            ...vendor,
            [name]: value,
        });


    };

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
        const formattedValue = formatPhoneNumber(rawValue);

        setVendor((prev) => ({ ...prev, phone: formattedValue }));
    };

    const formatPhoneNumber = (value) => {
        // Only process if the string has at least 10 digits
        if (value.length <= 10) {
            return value.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
            );
        }
        return value;
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    if(!emailRegex.test(vendor.email)){
        setEmailError(true);
        setEmailHelperText("Please enter a valid email address");
        return;
    }
    const res = await fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendor),
    });
    if (res.ok) {
      router.push('/');
    }
  };

    const handleCancel = () => {
        router.push('/');
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     // Check email and phone number one more time
    //     if(!emailRegex.test(vendor.email)){
    //         setEmailError(true);
    //         setEmailHelperText("Please enter a valid email address");
    //         return;
    //     }
    //     const res = await fetch(`/api/vendors/${id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(vendor),
    //     });
    //     if (res.ok) {
    //         router.push('/');
    //     }
    // };


    return (
        <Box
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                minHeight:'100vh',
            }}
        >


            <Box
                sx={{
                    height: 'auto',
                    width: '70vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ position:'relative', isplay: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1
                        style={{
                            position: 'relative',
                            zIndex: 10,
                            textAlign: 'center',
                            marginTop: '35px auto',
                            color: '#19a7d2',
                            fontWeight: 'bold',
                            fontSize: '50px',
                            textStroke: '.25px black',
                            textShadow: '4px 4px 8px rgba(0, 0, 0, 1)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '12px',
                            display: 'inline-block',
                            padding: '1px 15px',
                            // width:'auto',
                            // height:'auto',

                        }}
                        className={ledger.className}
                    >
                        Add Vendor
                    </h1>
                    <Button
                        onClick={handleCancel}
                        sx={{
                            position:'absolute',
                            right:'20px',
                            top:'50%',
                            transform: 'translateY(-50%)', // Fine-tune the vertical alignment
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        mt: 2,
                    }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={vendor.name}
                        onChange={handleChange}
                        sx={{
                            backgroundColor: 'rgba(210,210,210,.95)',
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 17px) scale(1)',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -4px) scale(0.6)', // Adjust the position when it floats
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on focus
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contact"
                        name="contact"
                        value={vendor.contact}
                        onChange={handleChange}
                        sx={{
                            backgroundColor: 'rgba(210,210,210,.95)',
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 17px) scale(1)',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -4px) scale(0.6)', // Adjust the position when it floats
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on focus
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={vendor.email}
                        onChange={handleChange}
                        error={emailError}
                        helperText={emailHelperText}
                        sx={{
                            backgroundColor: 'rgba(210,210,210,.95)',
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 17px) scale(1)',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -4px) scale(0.6)', // Adjust the position when it floats
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on focus
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="phone"
                        value={vendor.phone}
                        onChange={handlePhoneChange}
                        error={phoneError}
                        helperText={phoneHelperText}
                        sx={{
                            backgroundColor: 'rgba(210,210,210,.95)',
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 17px) scale(1)',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -4px) scale(0.6)', // Adjust the position when it floats
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on focus
                                },
                            },
                        }}
                    />
                    {/*<Box sx={{ mt: 2 }}>*/}
                    {/*    <TextField*/}
                    {/*        label="Phone"*/}
                    {/*        fullWidth*/}
                    {/*        InputProps={{*/}
                    {/*            inputComponent: (props) => (*/}
                    {/*                <PhoneInput*/}
                    {/*                    country="us"*/}
                    {/*                    value={vendor.phone}*/}
                    {/*                    onChange={handlePhoneChange}*/}
                    {/*                    inputStyle={{*/}
                    {/*                        width: "100%",*/}
                    {/*                        height: "56px",*/}
                    {/*                        border: "none",*/}
                    {/*                        background: "none",*/}
                    {/*                        fontSize: "1rem",*/}
                    {/*                    }}*/}
                    {/*                    buttonStyle={{*/}
                    {/*                        backgroundColor: "transparent",*/}
                    {/*                        border: "none",*/}
                    {/*                        borderRight: "1px solid rgba(0, 0, 0, 0.23)",*/}
                    {/*                        padding: "0 12px",*/}
                    {/*                    }}*/}
                    {/*                    {...props}*/}
                    {/*                />*/}
                    {/*            ),*/}
                    {/*        }}*/}
                    {/*        sx={{*/}
                    {/*            backgroundColor: "rgba(210, 210, 210, 0.95)",*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Box>*/}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Address"
                        name="address"
                        value={vendor.address}
                        onChange={handleChange}
                        sx={{
                            backgroundColor: 'rgba(210,210,210,.95)',
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 17px) scale(1)',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -4px) scale(0.6)', // Adjust the position when it floats
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#19a7d2', // Optional: change color on focus
                                },
                            },
                        }}
                    />
                    <FormControl fullWidth margin="normal" sx={{
                        backgroundColor: 'rgba(210,210,210,.95)',
                        '& .MuiInputLabel-root': {
                            transform: 'translate(15px, 17px) scale(1)',
                            transition: 'all 0.2s ease-in-out',
                        },
                        '& .MuiInputLabel-shrink': {
                            transform: 'translate(14px, -2px) scale(0.6)', // Adjust the position when it floats
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: '#19a7d2', // Optional: change color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#19a7d2', // Optional: change color on focus
                            },
                        },
                    }}>
                        <InputLabel id="tag-label">Tag</InputLabel>
                        <Select
                            label="Tag"
                            labelId="tag-label"
                            name="tag"
                            value={vendor.tag}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(210,210,210,.95)',
                            }}
                        >
                            {TAG_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 0}}
                    >
                        Add Vendor
                    </Button>
                </Box>


            </Box>
        </Box>
    );
}


// // pages/add.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box, Tooltip, IconButton,
// } from '@mui/material';
//
// export default function AddVendor() {
//   const [vendor, setVendor] = useState({
//     name: '',
//     contact: '',
//     email: '',
//     phone: '',
//     address: '',
//     tag: '',
//   });
//
//   const router = useRouter();
//
//   const handleChange = (e) => {
//     setVendor({ ...vendor, [e.target.name]: e.target.value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/vendors', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(vendor),
//     });
//     if (res.ok) {
//       router.push('/');
//     }
//   };
//
//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Add New Vendor
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Name"
//           name="name"
//           value={vendor.name}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Contact"
//           name="contact"
//           value={vendor.contact}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={vendor.email}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Phone"
//           name="phone"
//           value={vendor.phone}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Address"
//           name="address"
//           value={vendor.address}
//           onChange={handleChange}
//         />
//         {/*<Box sx={{display:'flex', flexWrap:'wrap', gap:1}}>*/}
//         {/*  {tags.map((tag, index) => (*/}
//         {/*      <TextField*/}
//         {/*          key={index}*/}
//         {/*          variant='outlined'*/}
//         {/*          size='small'*/}
//         {/*          value={tag}*/}
//         {/*          onChange{(e) => handleTagEdit(params.row.id, index, e.target.value)}*/}
//         {/*          sx={{maxWidth:150}}*/}
//         {/*      />*/}
//         {/*  ))}*/}
//         {/*</Box>*/}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Add Vendor
//         </Button>
//       </Box>
//     </Container>
//   );
// }
