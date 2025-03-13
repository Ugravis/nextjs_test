import axiosConfig from "@/config/axios.config";

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  const res = await axiosConfig.get("/users");
  const users: User[] = res.data;

  return (
    <div>
      <h1 className="text-2xl">Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Nom: {user.name}, email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}