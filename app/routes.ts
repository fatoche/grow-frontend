import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/garden", "routes/garden-planning.tsx"),
] satisfies RouteConfig;
