import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

import { apiSlice } from '../features/auth/apiSlice';
import authReducer from '../features/auth/authSlice';

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import {todoApi} from '../features/todo/todoSlice'


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
 
  reducer:{
    [todoApi.reducerPath]: todoApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([todoApi.middleware, apiSlice.middleware]),
  devTools:true
})

 export const persistor = persistStore(store)