import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Collapse, IconButton, Menu, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TaskTableCell from './TaskTableCell/TaskTableCell';
import TextOrInput from './TextOrInput/TextOrInput';
import LabelOrSelect from './LabelOrSelect/LabelOrSelect';
import TextOrDatePicker from './TextOrDatePicker/TextOrDatePicker';
import 'react-datepicker/dist/react-datepicker.css'
import CollapsibleRow from './CollapsibleRow/CollapsibleRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableRowCollapsibleContextProvider } from '../hooks/useTableRowCollapsibleContext';
import CollapsibleRowContent from './CollapsibleRowContent/CollapsibleRowContent';


const rows2 = [
    { id: 1, Task: "Task 1", Priority: "High", Difficulty: "Hard", Status: "In Progress", Deadline: new Date().toISOString().split('T')[0] },
    { id: 2, Task: "Task 2", Priority: "Low", Difficulty: "Easy", Status: "Done", Deadline: "2021-10-11" },
    { id: 3, Task: "Task 3", Priority: "Medium", Difficulty: "Medium", Status: "In Progress", Deadline: "2021-10-12" },
    { id: 4, Task: "Task 4", Priority: "High", Difficulty: "Hard", Status: "In Progress", Deadline: "2021-10-13" },
    { id: 5, Task: "Task 5", Priority: "Low", Difficulty: "Easy", Status: "Done", Deadline: "2021-10-14" },
]

export default function TaskTable() {
    const [rows, setRows] = useState(rows2);

    const addRow = () => {
        const nextId = rows.reduce((acc, row) => {
            return row.id > acc ? row.id : acc;
        }, 0) + 1;

        setRows([{ id: nextId, Task: "...", Priority: "Low", Difficulty: "Easy", Status: "TODO", Deadline: "2021-10-15" }, ...rows]);
    };

    useEffect(() => {
        localStorage.setItem("rows", JSON.stringify(rows));
        console.log("state saved");
    }, [rows]);

    console.log(rows);

    const TaskHeaderCell = ({ children }) => {
        return (
            <TableCell>
                {children}
            </TableCell>
        );
    }

    const handleSortTasks = (value) => {
        const sortedRows = [...rows.sort((a, b) => {
            if (value === "Low") {
                return a.Priority === "Low" ? -1 : 1;
            } else if (value === "Medium") {
                return a.Priority === "Medium" ? -1 : 1;
            } else if (value === "High") {
                return a.Priority === "High" ? -1 : 1;
            }
        })];
        setRows(sortedRows);
    }



    return (
        <>
            <Button onClick={addRow}>Add Row</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Task</TableCell>
                            <TaskHeaderCell>
                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                    <Typography>Priority</Typography>
                                    <Select sx={{minWidth: "129px"}} value="High" onChange={(e)=>handleSortTasks(e.target.value)} >
                                        <MenuItem value="Low">Low</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="High">High</MenuItem>
                                    </Select>
                                </Box>
                            </TaskHeaderCell>
                            <TableCell >Difficulty</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Deadline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (

                                <TableRowCollapsibleContextProvider key={row.id}>
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                hover
                            >
                                <CollapsibleRow />
                                <TaskTableCell>
                                    <TextOrInput
                                        initialState={row.Task}
                                        component="th"
                                        scope="row"
                                        state="Task"
                                        stateSetter={setRows}
                                        index={row.id}
                                    />
                                </TaskTableCell>
                                <TaskTableCell sx={{ width: "200px" }}>
                                    <LabelOrSelect
                                        initialState={row.Priority}
                                        options={["Low", "Medium", "High"]}
                                        id={row.Task + "prio"}
                                        state="Priority"
                                        stateSetter={setRows}
                                        index={row.id}
                                    />
                                </TaskTableCell>
                                <TaskTableCell sx={{ width: "200px" }}>
                                    <LabelOrSelect
                                        initialState={row.Difficulty}
                                        options={["Easy", "Med", "Hard"]}
                                        id={row.Task + "diff"}
                                        state="Difficulty"
                                        stateSetter={setRows}
                                        index={row.id}
                                    />
                                </TaskTableCell>
                                <TaskTableCell sx={{ width: "200px" }}>
                                    <LabelOrSelect
                                        initialState={row.Status}
                                        options={["TODO", "In Progress", "Done"]}
                                        id={row.Task + "stat"}
                                        state="Status"
                                        stateSetter={setRows}
                                        index={row.id}
                                    />
                                </TaskTableCell>
                                <TaskTableCell sx={{ width: "200px" }}>
                                    <TextOrDatePicker initialState={row.Deadline} state="Deadline" stateSetter={setRows} index={row.id} />
                                </TaskTableCell>
                            </TableRow>
                                <CollapsibleRowContent />
                            </TableRowCollapsibleContextProvider>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


