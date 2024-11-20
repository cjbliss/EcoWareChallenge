import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

export default function VendorTable({vendors, onDeleteClick}) {
    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 600,
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
                    {vendors.map((vendor) => (
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
                                        style={{marginRight: '10px'}}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <IconButton color="secondary" onClick={() => onDeleteClick(vendor.id)}>
                                    <DeleteIcon/>
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
    );
}