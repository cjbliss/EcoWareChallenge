import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Menu, MenuItem, Box, TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // default to name
  const [sortOrder, setSortOrder] = useState('asc'); // default to ascending

  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetch('/api/vendors')
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  const handleSort = (column) => {
    if(column === sortBy){
      setSortOrder(sortOrder ==='asc' ? 'desc':'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedVendors = [...vendors].sort((a,b) => {
    // here we will handle the sorting logic to make sure that every (relevant) field is sortable
    if(sortBy === 'name'){
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name); // either compare alphabetically or rev-alphabetically
    }
    else if(sortBy === 'contact'){
      return sortOrder === 'asc'
          ? a.contact.localeCompare(b.contact)
          : b.contact.localeCompare(a.contact);
    }
    else if(sortBy === 'email'){
      return sortOrder === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
    }
    else if(sortBy === 'id'){
      return sortOrder === 'asc'
          ? a.id - b.id
          : b.id - a.id;
    }
    return 0;
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleClickOpen = (id) => {
    setSelectedVendorId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVendorId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/vendors/${selectedVendorId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove the deleted vendor from the state
        setVendors(vendors.filter((vendor) => vendor.id !== selectedVendorId));
        handleClose();
      } else {
        console.error('Failed to delete the vendor.');
        // Optionally, handle error states here
      }
    } catch (error) {
      console.error('An error occurred while deleting the vendor:', error);
      // Optionally, handle error states here
    }
  };

  const handleSearchChange = (event) =>{
    setSearchQuery(event.target.value);
  }

  const filteredVendors = sortedVendors.filter((vendor) => {
    return (
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.phone.replace(/-/g, "").includes(searchQuery.toLowerCase()) ||
        vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.id.toString().includes(searchQuery)
    )
  })

  return (
    <Container>
      <Typography
          variant="h3"
          component="h1"
          sx={{my:4, textAlign: "center", color: "primary.main"}}
          gutterBottom>

        Current Vendors
      </Typography>
      <Box
        sx = {{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <Link href="/add" passHref>
          <Button variant="contained" color="primary" startIcon ={<AddIcon/>} style={{ marginBottom: '20px' }}>Add Vendor</Button>
        </Link>

        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            mx:2,
            flexGrow:1,
          }}
          />

        {/* sort Button */}
        <Button

            variant="contained"
            color="primary"
            style={{ marginBottom: '20px' }}
            onClick={handleMenuClick}
        >
          Sort by {sortOrder === 'asc' ? <ArrowDropDown /> : <ArrowDropUp />}
        </Button>
      </Box>
  {/* Sorting Dropdown */}
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSort('name')}>Name</MenuItem>
        <MenuItem onClick={() => handleSort('id')}>ID</MenuItem>
        <MenuItem onClick={() => handleSort('contact')}>Contact</MenuItem>
        <MenuItem onClick={() => handleSort('email')}>Email</MenuItem>
      </Menu>

      <TableContainer
          component={Paper}
          sx = {{
            maxHeight:600,
          }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>

              </TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>{vendor.address}</TableCell>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>
                    <Link href={`/edit/${vendor.id}`} passHref>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginRight: '10px' }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickOpen(vendor.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
            {vendors.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No vendors available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this vendor? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant='contained' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
