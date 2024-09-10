import { Box, ClickAwayListener, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const TextOrInput = ({ initialState, stateSetter, state, index }) => {
    const [label, setLabel] = useState(initialState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            stateSetter(prev => {
                const indexOfRow = prev.findIndex(row => row.id === index);
                const before = prev.slice(0, indexOfRow);
                const after = prev.slice(indexOfRow + 1);
                return [...before, { ...prev[indexOfRow], [state]: label }, ...after];
            });
        }
    }, [isEditing, label, state, index]);

    const handleEnterKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    }

    if (isEditing) {
        return (
            <ClickAwayListener onClickAway={() => setIsEditing(false)}>
                <Box>
                    <TextField autoFocus open={true} value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={(e) => handleEnterKeyDown(e)} />
                </Box>
            </ClickAwayListener>
        );
    }

    return (
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
            <Typography sx={{minWidth: "129px"}} onClick={() => setIsEditing(true)}>{label}</Typography>
        </Box>
    );
}

export default TextOrInput