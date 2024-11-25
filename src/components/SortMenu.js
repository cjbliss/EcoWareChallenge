import {Button, Menu, MenuItem} from "@mui/material";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";


export default function SortMenu({anchorEl, onMenuClick, onClose, onSort, sortOrder}) {
    return (
        <>
            <Button

                variant="contained"
                color="primary"
                style={{}}
                onClick={onMenuClick}
                size="medium"
                sx ={{}}
            >
                Sort by {sortOrder === 'asc' ? <ArrowDropDown /> : <ArrowDropUp />}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClose}
            >
                <MenuItem onClick={() => onSort('name')}>Name</MenuItem>
                <MenuItem onClick={() => onSort('id')}>ID</MenuItem>
                <MenuItem onClick={() => onSort('contact')}>Contact</MenuItem>
                <MenuItem onClick={() => onSort('email')}>Email</MenuItem>
            </Menu>
    </>
    )
}