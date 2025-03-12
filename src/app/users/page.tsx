"use client"; // Ce composant est interactif

import { useEffect } from "react";
import { useUserStore } from "@/lib/store/useUserStore";
import { updateUserAction } from "./actions";

export default function UsersPage() {
  const { users, setUsers, updateUser } = useUserStore();

  // Charger les utilisateurs depuis l'API uniquement au premier rendu
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:3000/users", { cache: "no-store" });
      const data = await res.json();
      setUsers(data);
    }

    if (users.length === 0) {
      fetchUsers();
    }
  }, [setUsers, users.length]);

  const handleUpdate = async (id: number) => {
    const newName = prompt("Nouveau pseudo ?");
    if (!newName) return;

    await updateUserAction(id, newName); // Modifier dans la DB
    updateUser(id, newName); // Mettre à jour immédiatement le store
  };

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.age} ans{" "}
          <button onClick={() => handleUpdate(user.id)}>Modifier</button>
        </div>
      ))}
    </div>
  );
}
