# redux-toolkit with persist

## Package

- react-redux
- react-persist (persist 사용시)
- @reduxjs/toolkit

## Directory

```
src
 ┣ features
 ┃ ┗ counter
 ┃ ┃ ┗ counterSlice.ts
 ┣ hooks
 ┃ ┗ state.ts // dispatch, selector 공통사용
 ┣ store
 ┃ ┗ index.ts
 ┣ App.tsx
 ┣ index.tsx
```

## Setting

### only redux-toolkit

#### index.ts

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from 'store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

#### store/index.ts

```
import {
  Action,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import counterReducer from 'features/counter/counterSlice'

const reducers = combineReducers({
  counter: counterReducer,
})

export const store = configureStore({
  reducer: reducers,
  }),
})
```

### redux-toolkit with redux-persist

#### index.ts

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from 'store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react' // 추가
import { persistStore } from 'redux-persist' // 추가

const persistor = persistStore(store) // 추가

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> // 추가
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

#### store/index.ts

```
import {
  Action,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import counterReducer from 'features/counter/counterSlice'
import storage from 'redux-persist/lib/storage' // 추가
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist' // 추가

const reducers = combineReducers({
  counter: counterReducer,
})

const persistConfig = { // 추가
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers) // 추가

export const store = configureStore({
  reducer: persistedReducer, // persist reducer로 설정변경
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }), // 추가
})
```
