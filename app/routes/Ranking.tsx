import { RankingPage } from "~/pages/RankingPage";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
  return [{ title: "ランキング" }];
}
export default function Ranking() {
  return <RankingPage />;
}
