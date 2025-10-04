import { PlayPage } from "~/pages/PlayPage";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "タイピングゲーム" },
  ];
}

export default function Play() {
  return <PlayPage />;
}
