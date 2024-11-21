import {
    Box,
    Button, Chip,
    IconButton, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip
} from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";
 import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../theme/theme"
import {white} from "next/dist/lib/picocolors";
import {DataGrid} from "@mui/x-data-grid";
import {useState} from "react";


export default function VendorTable({vendors, handleEdit, handleDelete, handleUpdateTags}) {

    const TAG_OPTIONS = ['Manufacturer', 'Wholesaler', 'Retailer','Service', 'Independent', 'Other'];

    const getTagColor = (tag) => {
        switch(tag) {
            case 'Manufacturer': return '#ff7e7e';
            case 'Wholesaler': return '#7ea1ff';
            case 'Retailer': return '#4bae6c';
            case 'Service': return '#ffb256';
            case 'Independent': return '#30aeb4';
            case 'Other': return '#a0a0a0';
            case 'Select Tag': return '#848484';
        }
    }

    const columns = [
        { field:'name', headerName: 'Name', flex:1 , sortable:true, filterable:true},
        { field:'contact', headerName: 'Contact', flex:1 , sortable:true, filterable:true},
        { field:'email', headerName: 'Email', flex:1.75, sortable: true, filterable: false},
        { field:'phone', headerName: 'Phone', flex:1.25, sortable: true, filterable: true },
        { field:'address', headerName: 'Address', flex:2, sortable: false, filterable: true},
        { field:'id', headerName: 'ID', flex:1, sortable: true, filterable: false},
        {
            field:'tag',
            headerName: 'Tag',
            flex:1,
            editable:true,
            sortable: true,
            filterable: true,
            renderCell: (params) => {
                const tag = params.row.tag;
                if(tag === ''){
                    return (
                        <Chip
                            label="Select Tag"
                            sx={{
                                bgcolor: '#515151',
                                color: '#fff',
                                alignItems: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',

                            }}
                            variant='filled'
                        />
                    );
                }
                else {
                    return (
                        <Chip
                            label={tag}
                            sx={{
                                bgcolor: getTagColor(tag),
                                color: '#fff',
                                alignItems: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',

                            }}
                            variant='filled'
                        />
                    );
                }
            },
            renderEditCell: (params) => {
                // const [selectedTag, setSelectedTag] = useState(params.value || TAG_OPTIONS[0]);
                const handleChange = async (event) => {
                    const newTag = event.target.value;
                    params.api.setEditCellValue({id:params.id, field: 'tag', value:newTag}, event);

                    try {
                        const response = await fetch(`/api/vendors/${params.id}`, {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({tag:newTag}),
                        });
                        if(!response.ok){
                            console.error('Failed to update vendor tag');
                        }
                    } catch(error) {
                        console.error('Error updating vendor tag: ', error);
                    }
                };
                return (
                    <Select
                        value={params.value || 'Select Tag'}
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        size='small'
                        >
                        {TAG_OPTIONS.map((option)=>(
                            <MenuItem key={option} value={option}>
                                <Chip
                                    label={option}
                                    sx={{
                                        bgcolor: getTagColor(option),
                                        color: '#fff',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                    variant='filled'
                                    />

                            </MenuItem>
                        ))}
                    </Select>
                );
            },
        },
        {
            field:'actions',
            headerName: 'Actions',
            flex: 3,
            renderCell: (params) => (
                <>
                    {/*<Button*/}
                    {/*    variant="outlined"*/}
                    {/*    color="primary"*/}
                    {/*    size="small"*/}
                    {/*    onClick={()=>handleEdit(params.row.id)}*/}
                    {/*    sx={{marginRight: '10px'}}*/}
                    {/*>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    <Button
                        onClick={() => handleEdit(params.row.id)}
                        sx={{
                            marginRight: 8,
                            variant: 'outlined',
                            background: 'primary',
                            color: 'black',
                            borderRadius: 3,
                        }}
                    >Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(params.row.id)}
                        sx={{
                            marginRight: 8,
                            padding: '5px 10px',
                            background: 'secondary',
                            color: 'rgb(235, 0, 0)',
                            border: 'none',
                            borderRadius: 4,
                        }}
                    > <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];


    return (
        <Box sx={{
            height: 625,
            width: '100%',
            backgroundColor: 'rgba(210,210,210,.9)',

        }}>
            <DataGrid
                rows={vendors}
                columns={columns}
                disableRowSelectionOnClick
                pagination
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                sx={{
                    '&.MuiDataGrid-cell': {
                        fontSize: '0.875rem',
                    },
                }}
                pageSizeOptions={[10,25,50]}

            />
        </Box>
    );
}

    //     <TableContainer
    //     component={Paper}
    //     sx={{
    //         maxHeight: 600,
    //     }}
    // >
    //     <Table stickyHeader>
    //         <TableHead>
    //             <TableRow>
    //                 <TableCell>
    //                     <strong>Name</strong>
    //
    //                 </TableCell>
    //                 <TableCell><strong>Contact</strong></TableCell>
    //                 <TableCell><strong>Email</strong></TableCell>
    //                 <TableCell><strong>Phone</strong></TableCell>
    //                 <TableCell><strong>Address</strong></TableCell>
    //                 <TableCell><strong>ID</strong></TableCell>
    //                 <TableCell><strong>Actions</strong></TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {vendors.map((vendor) => (
    //                 <TableRow key={vendor.id}>
    //                     <TableCell>{vendor.name}</TableCell>
    //                     <TableCell>{vendor.contact}</TableCell>
    //                     <TableCell>{vendor.email}</TableCell>
    //                     <TableCell>{vendor.phone}</TableCell>
    //                     <TableCell>{vendor.address}</TableCell>
    //                     <TableCell>{vendor.id}</TableCell>
    //                     <TableCell>
    //                         <Link href={`/edit/${vendor.id}`} passHref>
    //                             <Button
    //                                 variant="outlined"
    //                                 color="primary"
    //                                 size="small"
    //                                 style={{marginRight: '10px'}}
    //                             >
    //                                 Edit
    //                             </Button>
    //                         </Link>
    //                         <IconButton color="secondary" onClick={() => onDeleteClick(vendor.id)}>
    //                             <DeleteIcon/>
    //                         </IconButton>
    //                     </TableCell>
    //                 </TableRow>
    //             ))}
    //             {vendors.length === 0 && (
    //                 <TableRow>
    //                     <TableCell colSpan={7} align="center">
    //                         No vendors available.
    //                     </TableCell>
    //                 </TableRow>
    //             )}
    //         </TableBody>
    //     </Table>
    // </TableContainer>

    // const [open, setOpen] = useState(false);
    // const [selectedVendorId, setSelectedVendorId] = useState(null);
    //
    // const handleClickOpen = (id) => {
    //     setSelectedVendorId(id);
    //     setOpen(true);
    // };
    //
    // const handleClose = () =>
    // {
    //     setOpen(false);
    //     setSelectedVendorId(null);
    // }
    //
    // const handleDelete = async () => {
    //     try {
    //         const res = await fetch(`/api/vendors/${selectedVendorId}`, {
    //             method: 'DELETE',
    //         });
    //
    //         if (res.ok) {
    //             // Remove the deleted vendor from the state
    //             setVendors(vendors.filter((vendor) => vendor.id !== selectedVendorId));
    //             handleClose();
    //         } else {
    //             console.error('Failed to delete the vendor.');
    //             // Optionally, handle error states here
    //         }
    //     } catch (error) {
    //         console.error('An error occurred while deleting the vendor:', error);
    //         // Optionally, handle error states here
    //     }
    // }
