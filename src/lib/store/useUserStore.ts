import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  age: number;
};

type UserStore = {
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: number, name: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  setUsers: (users) => set({ users }),

  updateUser: (id, name) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, name } : user
      ),
    })),
}));
