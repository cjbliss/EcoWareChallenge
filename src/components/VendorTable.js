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
import InfoIcon from '@mui/icons-material/Info';
import theme from "../theme/theme"
import {white} from "next/dist/lib/picocolors";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";


export default function VendorTable({vendors, handleEdit, handleDelete, handleUpdateTags, handleInfo}) {

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
        { field:'id', headerName: 'ID', flex:"auto", sortable: true, filterable: false},
        // {
        //     field:'tag',
        //     headerName: 'Vendor Type',
        //     flex:.82,
        //     editable:true,
        //     sortable: true,
        //     filterable: true,
        //     renderCell: (params) => {
        //         const tag = params.row.tag;
        //         if(tag === ''){
        //             return (
        //                 <Chip
        //                     label="Select Vendor Type"
        //                     sx={{
        //                         bgcolor: '#515151',
        //                         color: '#fff',
        //                         alignItems: 'center',
        //                         overflow: 'hidden',
        //                         whiteSpace: 'nowrap',
        //
        //                     }}
        //                     variant='filled'
        //                 />
        //             );
        //         }
        //         else {
        //             return (
        //                 <Chip
        //                     label={tag}
        //                     sx={{
        //                         bgcolor: getTagColor(tag),
        //                         color: '#fff',
        //                         alignItems: 'center',
        //                         overflow: 'hidden',
        //                         whiteSpace: 'nowrap',
        //
        //                     }}
        //                     variant='filled'
        //                 />
        //             );
        //         }
        //     },
        //     renderEditCell: (params) => {
        //         // const [selectedTag, setSelectedTag] = useState(params.value || TAG_OPTIONS[0]);
        //         const handleChange = async (event) => {
        //             const newTag = event.target.value;
        //             params.api.setEditCellValue({id:params.id, field: 'tag', value:newTag}, event);
        //
        //             try {
        //                 const response = await fetch(`/api/vendors/${params.id}`, {
        //                     method: 'PUT',
        //                     headers: {'Content-Type': 'application/json'},
        //                     body: JSON.stringify({tag:newTag}),
        //                 });
        //                 if(!response.ok){
        //                     console.error('Failed to update vendor tag');
        //                 }
        //             } catch(error) {
        //                 console.error('Error updating vendor tag: ', error);
        //             }
        //         };
        //         return (
        //             <Select
        //                 value={params.value || 'Select Tag'}
        //                 onChange={handleChange}
        //                 fullWidth
        //                 variant="filled"
        //                 size='small'
        //                 >
        //                 {TAG_OPTIONS.map((option)=>(
        //                     <MenuItem key={option} value={option}>
        //                         <Chip
        //                             label={option}
        //                             sx={{
        //                                 bgcolor: getTagColor(option),
        //                                 color: '#fff',
        //                                 alignItems: 'center',
        //                                 overflow: 'hidden',
        //                                 whiteSpace: 'nowrap',
        //                             }}
        //                             variant='filled'
        //                             />
        //
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //         );
        //     },
        // },
        {
            field: 'tag',
            headerName: 'Vendor Type',
            flex: 0.82,
            editable: true,
            sortable: true,
            filterable: true,
            renderCell: (params) => {
                const tag = params.row.tag || 'Select Vendor Type'; // Default tag if empty
                return (
                    <Tooltip
                        title={
                            <Box>
                                {TAG_OPTIONS.map((option) => (
                                    <Chip
                                        key={option}
                                        label={option}
                                        onClick={() => handleUpdateTags(params.row.id, option, 'edit')}
                                        sx={{
                                            bgcolor: getTagColor(option),
                                            color: '#fff',
                                            margin: '4px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </Box>
                        }
                        arrow
                        placement="top"
                        interactive // Allows interaction with the tooltip content
                    >
                        <Chip
                            label={tag}
                            sx={{
                                bgcolor: getTagColor(tag),
                                color: '#fff',
                                cursor: 'pointer',
                                alignItems: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                            }}
                            variant="filled"
                        />
                    </Tooltip>
                );
            },
        },

        {
            field:'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        flex:1,
                        justifyContent: 'space-around',
                        gap:1,
                        width:'100%',
                    }}
                >

                    <IconButton
                        onClick={() => handleInfo(params.row.id)}
                        sx={{
                            variant: 'outlined',
                            background: 'primary',
                            color: 'white',
                            borderRadius: 3,
                            flex:1,
                        }}
                    > <InfoIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => handleEdit(params.row.id)}
                        sx={{
                            variant: 'outlined',
                            background: 'primary',
                            color: 'black',
                            borderRadius: 3,
                            flex:1,
                        }}
                    > <EditIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.row.id)}
                        sx={{
                            background: 'secondary',
                            color: 'rgb(235, 0, 0)',
                            border: 'none',
                            borderRadius: 4,
                            flex:1,
                        }}
                    > <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];


    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                borderBottom: '1px solid #ccc',
                position: 'sticky',
                top: 0,
                zIndex: 2,
            }}
        >

        <Box sx={{
            height: 'auto',
            width: '100%',
            backgroundColor: 'rgba(210,210,210,.95)',

        }}>
            <DataGrid
                rows={vendors}
                columns={columns}
                disableRowSelectionOnClick
                pagination
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                components={{
                    Toolbar: GridToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        sx: {
                            position: 'sticky',
                            top: 0,
                            zIndex: 100,
                            backgroundColor: 'white',
                        },
                    },
                }}
                sx={{
                    '&.MuiDataGrid-cell': {
                        fontSize: '0.875rem',
                    },
                }}
                pageSizeOptions={[10,25,50]}
            />
        </Box>
        </Box>
    );
}


