import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
    console.log(allTodos);
    const [todos, setTodos] = useState([allTodos]); // empty array

    //delete todo function

    async function deleteTodo(id) {
        try {
            await fetch (`/dashboard/todos/${id}`, {
                method: 'DELETE',
                headers: {token: localStorage.token}
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (err) {
            console.error(err.message);
        }
    }

    // get todo function
    
    // async function getTodos() {
    //       const res = await fetch('http://localhost:5000/todos');

     //   const todoArray = await res.json();

     //   setTodos(todoArray);
    // }

    useEffect(() => {
        setTodos(allTodos)
    }, [allTodos]);


    console.log(todos);

    return (
    <Fragment>
        <table className="table mt-5">
        <thead className="thead-light">
            <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
         {
         todos.length !== 0 && todos[0].todo_id !== null && 
            todos.map(todo => (
             <tr key={todo.todo_id}>
                 <td>{todo.description}</td>
                 <td><EditTodo todo={todo} setTodosChange={setTodosChange} /></td>
                 <td><button 
                 className="btn btn-danger"
                 onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
             </tr>
         ))
         }
        </tbody>
        </table>
    </Fragment>
)};


export default ListTodos;