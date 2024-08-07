import { atom } from 'recoil';

export const articleState = atom({
  key: 'articleState',
  default: [
    {
      id: "",
      name: "",
      email: "",
      isDeleted: false,
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
  ],
});
