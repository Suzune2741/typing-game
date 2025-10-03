import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/Home.tsx"),
  route("/play", "./routes/Play.tsx"),
  route("/setting", "./routes/Setting.tsx"),
] satisfies RouteConfig;
