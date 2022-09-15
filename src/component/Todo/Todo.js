import React from 'react';
import { useState } from 'react';
import './Todo.css'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Button, Stack, Box, Modal, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import db from '../config/firebase';
import { doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";


function Todo(props) {
    const deleteData = (event) => {
        event.preventDefault();
        deleteDoc(doc(db, "todos", props.text.id));
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const updateTodo = (event) => {

        // updating Todo
        const todoId = doc(db, "todos", props.text.id);
        setDoc(todoId, { todo: input, timestamp: serverTimestamp(),}, { merge: true });

        setInput('');
        // closing modal
        setOpen(false)
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Todo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField id="outlined-basic" label="Update" variant="outlined" value={input} onChange={event => setInput(event.target.value)} />
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ m: 3 }}>
                        <Button variant="contained" onClick={event => setOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={event => updateTodo(event)}>Confirm</Button>
                    </Stack>
                </Box>
            </Modal>



            <List className='todo_list' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.text.data.todo} secondary={props.secText} />
                </ListItem>


                <Stack direction="row" spacing={2}>

                    <Button variant="outlined" onClick={handleOpen} startIcon={<EditAttributesIcon />}>Edit</Button>

                    <Button variant="outlined" color="error" onClick={deleteData} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                </Stack>
            </List>
        </>
    );
}

export default Todo;