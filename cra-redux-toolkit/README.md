# CRA Redux Toolkit with Persist

### redux-toolkit 사용 테스트 체크리스트

- persist 사용버전, 미사용버전 분리
- 기존 redux와 사용성 비교

## Directory

```
src
 ├─ features
 |   └─ counter
 |        └─ counterSlice.ts
 ├─ hooks
 |   └─ state.ts              // dispatch, selector 공통사용
 ├─ store
 |   └─ index.ts
 ├─ App.tsx
 ├─ index.tsx
```

## Installation and Usage

### Package

- react-redux
- react-persist (persist 사용시)
- @reduxjs/toolkit

### Setting (only redux-toolkit)

index.ts

```typescript
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

store/index.ts

```typescript
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

### Setting (redux-toolkit with redux-persist)

index.ts

```typescript
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
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        // 추가
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

store/index.ts

```typescript
import { Action, combineReducers, configureStore } from '@reduxjs/toolkit'
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

const persistConfig = {
  // 추가
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

## Comment

- 기본 세팅이 보다 편리함 (`immer, thunk` 포함)
- thunk가 포함되어 있어서 `redux-saga`를 써야 할지는 고민이 필요
- hooks 와 slice 를 조합해서 사용하면 좋아보임
- 간단한 상태관리는 `recoil` 을 사용해보는 것을 고려할지도...
