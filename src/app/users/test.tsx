export default async function UsersPage() {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json(); 

    return (
        <ul>
            {data.map((user: { name: string }, index: number) => (
                <li key={index}>{user.name}</li>
            ))}
        </ul>
    );
}