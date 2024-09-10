import { SubdirectoryArrowLeftSharp } from '@mui/icons-material';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react'
import useTableRowCollapsibleContext from '../../hooks/useTableRowCollapsibleContext';

function CollapsibleRowContent() {
    const { open } = useTableRowCollapsibleContext();
  return (
      <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", height: "300px", backgroundColor:"red" }}>
                      
                  </Box>
              </Collapse>

          </TableCell>
      </TableRow>
  )
}

export default CollapsibleRowContent