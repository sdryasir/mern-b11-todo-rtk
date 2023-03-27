import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, fetchTodos } from '../features/todo/todoSlice';
import { useEffect } from 'react';
import {useGetAllTodosQuery} from '../features/todo/todoSlice'

function TodoList() {

    const {data, error, isLoading} = useGetAllTodosQuery()
    // const dispatch = useDispatch()



    const handleDelete = async (id) => {
        
            // dispatch(deleteTodo(id))
        // // send DELETE request to API
        // await fetch(`http://localhost:1000/v1/todo/delete/${id}`, {
        //     method: 'DELETE',
        // });

        
    }

   

    // useEffect(() => {
    //     dispatch(fetchTodos());
    // }, [dispatch])

    if(isLoading) return <h1>Loading...</h1>
    if(error) return <h3>Something went wrong..</h3>

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
                                <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(todo?.id)}></i></li>
                        )
                    })
                    

            }
             
             
        </ul>
        </div>
        
    )
}

export default TodoList