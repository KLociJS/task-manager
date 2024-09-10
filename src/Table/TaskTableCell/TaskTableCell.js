import { TableCell } from '@mui/material';
import React from 'react'

const TaskTableCell = ({ children, ...props }) => {

    return (
        <TableCell {...props} size='small'>
            {children}
        </TableCell>
    );
}

export default TaskTableCell