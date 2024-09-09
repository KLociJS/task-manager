import { TableCell } from '@mui/material';
import React from 'react'

const TaskTableCell = ({ children, ...props }) => {

    return (
        <TableCell {...props}>
            {children}
        </TableCell>
    );
}

export default TaskTableCell