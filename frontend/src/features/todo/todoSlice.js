import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath:'todoApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/v1/'}),
    endpoints:(builder)=>({
      getAllTodos: builder.query({
        query: () => `todos`
      }),
      getTodoById: builder.query({
        query: (id) => `todo/${id}`,
      }),
      deleteTodo: builder.mutation({
        query: (id) => ({
            url: `todo/delete/${id}`,
            method: 'DELETE'
          }),
      }),
      updateTodo: builder.mutation({
        query: ({ id, ...rest }) => ({
            url: `todo/update/${id}`,
            method: 'PUT',
            body: rest,
          }),
      }),
      AddTodo: builder.mutation({
          query: (body) => ({
              url: `todo/new`,
              method: 'POST',
              body: body,
            }),
      })
    })
})

export const {
  useGetAllTodosQuery, 
  useGetTodoByIdQuery, 
  useDeleteTodoMutation, 
  useUpdateTodoMutation,
  useAddTodoMutation 
} = todoApi;