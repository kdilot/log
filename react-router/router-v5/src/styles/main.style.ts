import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;

  a {
    font-size: 1rem;
  }
`;

export const Button = styled.div`
  font-size: 1rem;
  color: blue;
  opacity: 0.8;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  margin-bottom: 5px;

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  a {
    color: blue !important;
  }

  & ~ & {
    margin-left: 5px;
  }
`;
