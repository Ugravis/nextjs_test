import { create } from "zustand";
import { UsersState, User } from "../types/user.types";
import { getUsers, updateUser } from "../api/usersApi";

export const useUsersStore = create<UsersState>((set) => ({
  users: [],

  getUsers: async () => {
    const users = await getUsers();
    set({ users });
  },

  updateUser: async (id: number, newUserData: User) => {
    const updatedUser = await updateUser(id, newUserData);
    if (updatedUser) {
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
      }));
    }
  },
}));