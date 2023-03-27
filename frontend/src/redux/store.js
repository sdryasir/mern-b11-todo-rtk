import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import {todoApi} from '../features/todo/todoSlice'


const persistConfig = {
    key: 'root',
    storage,
  }
  
  //const persistedReducer = persistReducer(persistConfig, todoReducer)


export const store = configureStore({
 
  reducer:{
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)

    // reducer : persistedReducer,
    // middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    //   })
})

// export const persistor = persistStore(store)