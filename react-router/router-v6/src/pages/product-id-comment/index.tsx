import { useNavigate, useParams } from "react-router-dom";
import { Button, Wrapper } from "../../styles/main.style";

const ProductIdComment: React.FC = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <span>{`Product Comment page with id: ${id}`}</span>
      <div>
        <Button onClick={() => navigate(-1)}>back</Button>
      </div>
    </Wrapper>
  );
};

export default ProductIdComment;
