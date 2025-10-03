export const getUserName = (needData: string, defaultValue: string) => {
  return localStorage.getItem(needData)
    ? localStorage.getItem(needData)
    : defaultValue;
};
