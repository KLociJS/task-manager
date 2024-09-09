import { Box, Chip, ClickAwayListener, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

const labels = [
    {priority: "LOW", color: "info"},
    {priority: "MEDIUM", color: "warning"},
    {priority: "HIGH", color: "error"},
    {priority: "TODO", color: "info"},
    {priority: "IN PROGRESS", color: "warning"},
    {priority: "DONE", color: "success"},
    {priority: "EASY", color: "success"},
    {priority: "MED", color: "warning"},
    {priority: "HARD", color: "error"},


];

const LabelOrSelect = ({ initialState, options, stateSetter, state, index }) => {
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

    const handleSelect = (e) => {
        setLabel(e.target.value);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <ClickAwayListener onClickAway={() => setIsEditing(false)}>
                <Box>
                    <Select native defaultOpen variant="outlined" size="small" value={label} onChange={(e) => handleSelect(e)} >
                        {options.map((option) => (<option value={option}>{option} </option>))}
                    </Select>
                </Box>
            </ClickAwayListener>
        );
    }

    const labelColor = labels.find(l => l.priority === label.toUpperCase()).color;
    return (
        <Box sx={{height: "56px", display: "flex", alignItems: "center"}}>
            <Chip color={labelColor} label={label} onClick={() => setIsEditing(true)} />
        </Box>
    )
}

export default LabelOrSelect