import { useLocation } from "react-router";

export const getDifficulty = ():string =>{
  //難易度の取得
  const location = useLocation();
  const params = location.search;

  return params.split("=")[1];
}
