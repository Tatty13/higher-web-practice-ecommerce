const USER_ID_STORAGE_KEY = 'userId';

export const saveUserIdLocalStorage = (value: string) =>
  window.localStorage.setItem(USER_ID_STORAGE_KEY, value);

export const getUserIdFromLocalStorage = () => {
  return window.localStorage.getItem(USER_ID_STORAGE_KEY);
};

export const removeUserIdFromLocalStorage = () => {
  window.localStorage.removeItem(USER_ID_STORAGE_KEY);
};
