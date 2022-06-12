import { useReactQueryApi } from "../../utils/api";

const Section4: React.FC = () => {
  const { data } = useReactQueryApi("section4");
  return <div>{data.name}</div>;
};

export default Section4;
