// pages/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box, Tooltip, IconButton,
} from '@mui/material';

export default function AddVendor() {
  const [vendor, setVendor] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    tag: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendor),
    });
    if (res.ok) {
      router.push('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Vendor
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          value={vendor.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contact"
          name="contact"
          value={vendor.contact}
          onChange={handleChange}
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone"
          name="phone"
          value={vendor.phone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Address"
          name="address"
          value={vendor.address}
          onChange={handleChange}
        />
        {/*<Box sx={{display:'flex', flexWrap:'wrap', gap:1}}>*/}
        {/*  {tags.map((tag, index) => (*/}
        {/*      <TextField*/}
        {/*          key={index}*/}
        {/*          variant='outlined'*/}
        {/*          size='small'*/}
        {/*          value={tag}*/}
        {/*          onChange{(e) => handleTagEdit(params.row.id, index, e.target.value)}*/}
        {/*          sx={{maxWidth:150}}*/}
        {/*      />*/}
        {/*  ))}*/}
        {/*</Box>*/}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Vendor
        </Button>
      </Box>
    </Container>
  );
}
