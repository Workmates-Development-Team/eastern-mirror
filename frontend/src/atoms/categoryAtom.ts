import { atom } from "recoil";

export const categoryState = atom({
  key: "categoryState",
  default: [
    {
      id: "",
      name: "",
      parentCategory: {
        id: "",
        name: "",
      },
    },
  ],
});

export const categorySearchState = atom({
  key: "categorySearchState",
  default: [
    {
      value: "",
      label: "",
    },
  ],
});
