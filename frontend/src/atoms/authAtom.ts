import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    token: sessionStorage.getItem('token') || '',
  },
});
