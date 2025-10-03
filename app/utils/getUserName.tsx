export const getUserName = (needData: string, defaultValue: string) => {
  const userName = localStorage.getItem(needData);
  return userName !== null ? userName : defaultValue;
};
