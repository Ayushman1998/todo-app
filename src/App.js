import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Todo from './component/Todo/Todo';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import db from './component/config/firebase';
import { query, collection, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // console.log('😍', input);

  // fetch when app loads from firebase
  useEffect(() => {

    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))

    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });

    setInput('');
  }

  const getTimestamp = (data) => {
    if (data)
      return data.toDate().toString();
    else
      return 0;
  }

  return (
    <div className='App'>
      <h1>Todo List</h1>

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Write a Todo ✏️</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} type='submit' onClick={addTodo} variant="contained">Add Todo</Button>
      </form>

      <ul>
        {todos.map(doc => (
          <><Todo text={doc} secText={getTimestamp(doc.data.timestamp)} /></>
        ))}
      </ul>
    </div>
  );
}

export default App;
