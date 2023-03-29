import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, fetchTodos } from '../features/todo/todoSlice';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useGetAllTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation} from '../features/todo/todoSlice'

function TodoList() {

    const {data, error, isLoading} = useGetAllTodosQuery()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    // const dispatch = useDispatch()

console.log(error);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await deleteTodo(id)
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const handleUpdate = async (t) => {
        try {
            await updateTodo(t)
        } catch (error) {
            console.log(error)
        }
        
    }
   

    // useEffect(() => {
    //     dispatch(fetchTodos());
    // }, [dispatch])

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h3>{error.error}</h3>

    return (
        <div className=' mt-5'><ul className="list-group">
            <li className="list-group-item">All Todos</li>
            {
                data.todos.length === 0 ? <li className="list-group-item fs-6">
                    No todos Found...
                </li>
                    :
                    data.todos.map((todo, idx) => {
                        return (
                            <li  key= {idx} className="list-group-item d-flex justify-content-between">
                                <span>{todo?.title}</span>
                                <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(todo?._id)}></i>
                                <Link to={`/edit/${todo._id}`}><i className="bi bi-pencil" style={{ cursor: 'pointer' }}></i></Link>                                </li>
                        )
                    })
                    

            }


            
             
             
        </ul>
        
        </div>
        
    )
}

export default TodoList