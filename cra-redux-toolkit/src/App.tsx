import {
  decrement,
  fetchWithAsyncThunk,
  fetchWithThunk,
  increment,
  incrementByAmount,
} from 'features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from 'hooks/state'
import styled from 'styled-components'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const status = useAppSelector((state) => state.counter.status)
  const dispatch = useAppDispatch()

  return (
    <Wrapper>
      <h1>REDUX TOOLKIT</h1>
      <h2>count : {count}</h2>
      <h3>status : {status}</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button onClick={() => dispatch(increment())}>Increase</Button>
        <Button onClick={() => dispatch(decrement())}>Decrease</Button>
        <Button onClick={() => dispatch(incrementByAmount(100))}>
          +100 Increase
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
        <Button onClick={() => dispatch(fetchWithThunk())}>Thunk</Button>
        <Button onClick={() => dispatch(fetchWithAsyncThunk())}>
          createAsyncThunk
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
  }
`

const Button = styled.div`
  padding: 10px;
  min-width: 120px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  cursor: pointer;
  & ~ & {
    margin-left: 5px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

export default App
