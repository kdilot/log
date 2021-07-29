import styled from 'styled-components'

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <BackgroundWrapper />
      <TextWrapper>LOADING...</TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  z-index: 9999;
`

const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.1;
  position: absolute;
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
`

export default Loading
