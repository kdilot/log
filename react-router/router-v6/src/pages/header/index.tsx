import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Wrapper } from "../../styles/main.style";
import styled from "styled-components";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <ButtonWrapper>
        (v6)HOME
        <Button>
          <Link to="/">(with Link)</Link>
        </Button>
        <Button onClick={() => onClick()}>(with history)</Button>
      </ButtonWrapper>
      <span
        style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "5px" }}
      >{`pathname: ${location.pathname}`}</span>
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 2rem;
  user-select: none;

  div,
  span {
    font-size: 1rem;
  }

  a {
    text-decoration: none;
  }
  a:visited {
    color: transparent;
  }
`;

export default Header;
