import { useReactQueryApi } from "../../utils/api";

const Section2: React.FC = () => {
  const { data } = useReactQueryApi("section2");
  return <div>{data.name}</div>;
};

export default Section2;
