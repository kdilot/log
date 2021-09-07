import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import IconArrowRight from './icons/IconArrowRight'

interface Props extends HTMLAttributes<HTMLInputElement> {}

const Button: React.FC<Props> = ({ children = '버튼', ...props }) => {
  return (
    <Wrapper {...props}>
      {children}
      <IconArrowRight color="black" />
    </Wrapper>
  )
}

const Wrapper = styled.button<any>`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: yellow;

  svg {
    margin-left: 10px;
  }
`

export default Button
