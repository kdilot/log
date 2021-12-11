import { useHistory, useParams } from "react-router-dom";
import { Button, Wrapper } from "../../styles/main.style";

const ProductIdComment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return (
    <Wrapper>
      <span>{`Product Comment page with id: ${id}`}</span>
      <div>
        <Button onClick={() => history.goBack()}>back</Button>
      </div>
    </Wrapper>
  );
};

export default ProductIdComment;
