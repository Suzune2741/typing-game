import { SettingPage } from "~/pages/SettingPage";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
  return [{ title: "設定" }];
}
export default function Play() {
  return <SettingPage />;
}
