"use client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/store/useUserStore";

export default function GlobalStoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("http://localhost:3000/users", { cache: "no-store" });
      useUserStore.getState().setUsers(await res.json());
    }
    loadUsers();
  }, []);

  return <>{children}</>;
}
