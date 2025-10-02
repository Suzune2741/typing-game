import type { Route } from "./+types/home";
import { TopPage } from "~/topPage/topPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "タイピングゲーム" },
    { name: "description", content: "タイピングゲームへようこそ" },
  ];
}

export default function Home() {
  return <TopPage />;
}
