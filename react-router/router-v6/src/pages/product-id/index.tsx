import { useNavigate, useParams } from "react-router-dom";
import { Button, Wrapper } from "../../styles/main.style";

const ProductId: React.FC = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const onClick = (isNext: boolean) => {
    if (isNext) {
      navigate(`/product/${Number(id) + 1}`);
      return;
    }

    if (!isNext && Number(id) === 1) return;
    navigate(`/product/${Number(id) - 1}`);
  };

  return (
    <Wrapper>
      <span>{`Product page with id: ${id}`}</span>
      <div>
        <Button onClick={() => onClick(false)}>prev</Button>
        <Button onClick={() => onClick(true)}>next</Button>
        <Button onClick={() => navigate("comment")}>comment</Button>
      </div>
    </Wrapper>
  );
};

export default ProductId;
