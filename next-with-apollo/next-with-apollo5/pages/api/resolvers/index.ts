import { merge } from "lodash";
import { todoResolvers } from "./Todo";

const resolvers = merge(todoResolvers);

export default resolvers;
