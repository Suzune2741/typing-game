import { useLocation } from "react-router";

export const getQueryParameter = (
  key: string,
  defaultValue: string
): string => {
  //クエリパラメータ(1つのみ)を取得.
  //Todo: 複数のパラメータがあるときに対応できるようにする
  const location = useLocation();
  const params = location.search;

  return params.split(key + "=")[1] === undefined
    ? defaultValue
    : params.split(key + "=")[1];
};
