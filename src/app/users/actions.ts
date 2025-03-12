"use server";

export async function updateUserAction(id: number, name: string) {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}
