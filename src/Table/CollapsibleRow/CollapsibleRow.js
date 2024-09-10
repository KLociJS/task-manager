import { IconButton, TableCell } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useTableRowCollapsibleContext from '../../hooks/useTableRowCollapsibleContext';

function CollapsibleRow() {
    const { open, setOpen } = useTableRowCollapsibleContext();
    return (
        <TableCell sx={{width: "48px"}}>
            <IconButton
                aria-label="expand row"
                size="large"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
    )
}

export default CollapsibleRow