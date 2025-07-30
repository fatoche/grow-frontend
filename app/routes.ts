import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/garden", "routes/garden-planning.tsx"),
  route("/plant-families", "routes/plant-families.tsx"),
  route("/bed-assignment", "routes/bed-assignment.tsx"),
] satisfies RouteConfig;
