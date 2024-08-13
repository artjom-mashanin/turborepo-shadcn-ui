export const readTokenFromLocalStorage = () => {
  const token = localStorage.getItem('jwt-token');
  return token;
};

export const writeTokenToLocalStorage = (token: string) => {
  localStorage.setItem('jwt-token', token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('jwt-token');
};
