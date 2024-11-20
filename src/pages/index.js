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
  DialogTitle, Menu, MenuItem, Box, TextField, InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import DeleteDialog from "@/components/DeleteDialog";
import VendorTable from "@/components/VendorTable";
import SortMenu from "@/components/SortMenu";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";


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

      <Header contents={"Current Vendors"} />

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
          <Button variant="contained" color="primary" startIcon ={<AddIcon/>} size="medium"  sx={{}}>Add Vendor</Button>
        </Link>

      <SearchBar value={searchQuery} handleChange={handleSearchChange} />

      <SortMenu
          anchorEl={anchorEl}
          onMenuClick={handleMenuClick}
          onClose={handleClose}
          onSort={handleSort}
          sortOrder={sortOrder}
          />
      </Box>

      <VendorTable vendors={filteredVendors} onDeleteClick={(id) =>setSelectedVendorId(id)} />

      <DeleteDialog open={open} onClose={() => setOpen(false)} onConfirm={handleDelete} />


    </Container>
  );
}
