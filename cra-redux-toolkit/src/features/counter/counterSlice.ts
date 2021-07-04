import axios from 'axios'
import { AppThunk } from 'store'
import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface CounterState {
  value: number
  status: 'loading' | 'finished'
}

const initialState: CounterState = {
  value: 0,
  status: 'finished',
}

// redux-toolkit createAsyncThunk를 이용한 비동기 방법
export const fetchWithAsyncThunk: AsyncThunk<any, void, {}> = createAsyncThunk(
  'post/fetchWithAsyncThunk',
  async () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts?_limit=30`)
      .then((res: any) => {
        return res.data
      })
      .catch(() => {
        return []
      })
  }
)

// redux-thunk를 이용한 비동기 방법
export const fetchWithThunk = (): AppThunk => async (dispatch) => {
  dispatch(fetchStatus('loading'))
  try {
    const result = await axios
      .get(`https://jsonplaceholder.typicode.com/posts?_limit=30`)
      .then((res: any) => {
        return res.data
      })
    if (result) {
      console.log('[REDUX_THUNK]', result)
      dispatch(increment())
    }
  } catch (error) {
    console.log('[REDUX_THUNK]', error)
    dispatch(decrement())
  }
  dispatch(fetchStatus('finished'))
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    fetchStatus: (state, action: PayloadAction<'loading' | 'finished'>) => {
      state.status = action.payload
    },
  },
  // redux-toolkit createAsyncThunk를 이용한 비동기 방법
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWithAsyncThunk.pending,
        (state: any, action: PayloadAction<any>) => {
          console.log('[TOOLKIT_PENDING]', action.payload)
          state.status = 'loading'
        }
      )
      .addCase(
        fetchWithAsyncThunk.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          console.log('[TOOLKIT_FULLFILLED]', action.payload)
          state.value += 1
          state.status = 'finished'
        }
      )
      .addCase(
        fetchWithAsyncThunk.rejected,
        (state: any, action: PayloadAction<any>) => {
          console.log('[TOOLKIT_REJECTED]', action.payload)
          state.value -= 1
          state.status = 'finished'
        }
      )
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  fetchStatus,
} = counterSlice.actions

export default counterSlice.reducer
