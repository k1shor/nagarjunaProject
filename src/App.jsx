import React from 'react'
import { combineReducers } from 'redux'
import itemReducer from './components/reducers/itemReducer'
import cartReducer from './components/reducers/cartReducer'

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { PersistGate } from 'redux-persist/integration/react'
import MyRoutes from './MyRoutes'
import { Provider } from 'react-redux'

import './App.css'


const App = () => {

  const rootReducer = combineReducers({
    itemStore: itemReducer,
    cartStore: cartReducer,
    userStore: userReducer
  })

  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  let store = createStore(persistedReducer)
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyRoutes />
      </PersistGate>
    </Provider>
  )
}

export default App