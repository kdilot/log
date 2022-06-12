import { useReactQueryApi } from "../../utils/api";

const Section1: React.FC = () => {
  const { data } = useReactQueryApi("section1");
  return <div>{data.name}</div>;
};

export default Section1;
