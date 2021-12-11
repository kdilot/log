import { Link } from "react-router-dom";
import { Wrapper } from "../../styles/main.style";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/product">product</Link>
      <Link to="/product/1">product/:id</Link>
      <Link to="/redirect">redirect</Link>
    </Wrapper>
  );
};

export default Home;
