export const getUserName = (needData: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    const userName = localStorage.getItem(needData);
    if (!userName) return defaultValue;
    return userName !== null ? userName : defaultValue;
  }
};
