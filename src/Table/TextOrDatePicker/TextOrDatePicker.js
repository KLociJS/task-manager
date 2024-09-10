import { Box, ClickAwayListener, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';

function TextOrDatePicker({ initialState, stateSetter, state, index }) {
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

    const handleSelect = (date) => {
        setLabel(date.toISOString().split('T')[0]);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <ClickAwayListener onClickAway={() => setIsEditing(false)}>
                <Box>
                    <DatePicker open={isEditing} selected={new Date(label)} onChange={handleSelect} />
                </Box>
            </ClickAwayListener>
        );
    }

    return (
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
            <Typography sx={{ minWidth: "129px" }} onClick={() => setIsEditing(true)}>{label}</Typography>
        </Box>
    );


}

export default TextOrDatePicker