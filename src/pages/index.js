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
import LogoImage from "@/components/LogoImage"
import {router} from "next/client";
import BackgroundImage from "@/components/BackgroundImage";
import {Mogra, Ledger} from "next/font/google";

const mogra = Mogra({
  subsets: ['latin'], // Choose the character subset you need
  weight: '400',      // Specify the weight (Knewave only supports 400)
});
const ledger = Ledger({
    subsets: ['latin'], // Choose the character subset you need
    weight: '400',      // Specify the weight (Knewave only supports 400)
});

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // default to name
  const [sortOrder, setSortOrder] = useState('asc'); // default to ascending

  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetch('/api/vendors')
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((vendor) => ({
          ...vendor,
          tags: Array.isArray(vendor.tags) ? vendor.tags : [],
        }));
        setVendors(updatedData)
      });
  }, []);

  const handleSort = (column) => {
    if(column === sortBy){
      setSortOrder(sortOrder ==='asc' ? 'desc':'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  }

  const handleInfo = (id) => {
      router.push(`/vendors/${id}`);
  }

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

  const handleOpenDialog = (vendor) => {
      setSelectedVendorId(vendor);
      setOpenDialog(true);
  }

  const handleCloseDialog = ()=> {
      setOpenDialog(false);
      setSelectedVendorId(null);
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

    // setSelectedVendorId(id);
    // setOpen(true);
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

    const handleUpdateTags = (id, newTag) => {
        const updatedVendors = [...vendors];
        const vendorIndex = updatedVendors.findIndex((vendor) => vendor.id === id);

        if (vendorIndex === -1) return; // If vendor not found, exit

        // Update the tag for the selected vendor
        updatedVendors[vendorIndex].tag = newTag;
        setVendors(updatedVendors);

        // Optionally update the backend
        try {
            fetch(`/api/vendors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: newTag }),
            }).then((response) => {
                if (!response.ok) {
                    console.error('Failed to update vendor tag on the server');
                }
            });
        } catch (error) {
            console.error('Error updating vendor tag:', error);
        }
    };

  return (
    <Box sx={{minHeight:'100vh', position: 'relative', padding:0, margin:'0 auto', width:'75%',  }}>
     <Box
         sx={{textAlign:'center', width:'100%', marginTop: '20px'}}
         >
      <h1
          style={{
              position:'relative',
              zIndex: 10,
              textAlign:'center',
              marginTop:'35px auto',
              color:'#1976d2',
              fontWeight:'bold',
              fontSize:'50px',
              textStroke: '.25px black',
              // textShadow:'4px 4px 8px rgba(0, 0, 0, 1)',
              backdropFilter:'blur(50px)',
              borderRadius: '12px',
              display:'inline-block',
              padding:'1px 15px',
              // width:'auto',
              // height:'auto',

          }}
          className={ledger.className}
      >
        Current EcoWare Vendors
      </h1>
     </Box>
      <Box
        sx = {{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: 2,
            minHeight: '60px',
            zIndex:'100',
            overflow:'visible'
        }}
      >
        <Link href="/add" passHref>
          <Button
              variant="contained"
              color="primary"
              startIcon ={<AddIcon sx={{fontSize:'.875rem', verticalAlign:'middle'}}/>}
              size="large"
              sx={{
                  alignItems:'center',
                  display: 'flex',
                  fontSize: '1rem',
                  height: 'auto',
                  justifyContent: 'left',
                  minWidth: '190px',
                  padding: '8px 16px',
                  whiteSpace: 'nowrap',
                  width: 'fit-content',
                  borderRadius: '7px',
              }}
          >
            Add Vendor
          </Button>
        </Link>

      <SearchBar value={searchQuery} handleChange={handleSearchChange} />

      {/*<SortMenu*/}
      {/*    anchorEl={anchorEl}*/}
      {/*    onMenuClick={handleMenuClick}*/}
      {/*    onClose={handleMenuClose}*/}
      {/*    onSort={handleSort}*/}
      {/*    sortOrder={sortOrder}*/}
      {/*    />*/}
      </Box>

      <VendorTable vendors={filteredVendors} handleEdit={handleEdit} handleDelete={handleClickOpen} handleUpdateTags={handleUpdateTags} handleInfo={handleInfo} />

      <DeleteDialog open={open} onClose={() => setOpen(false)} onConfirm={handleDelete} />


    </Box>
  );
}
