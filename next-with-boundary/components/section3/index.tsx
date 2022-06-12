import { useReactQueryApi } from "../../utils/api";

const Section3: React.FC = () => {
  const { data } = useReactQueryApi("section3");
  return <div>{data.name}</div>;
};

export default Section3;
