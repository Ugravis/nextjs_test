import PostCard from "@/components/items/PostCard"
import { Post } from "@/lib/types/post.types"

async function getPosts(): Promise<Post[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15`)
    if(!res.ok) throw Error(`Unable to get posts`)
    return res.json()
}

export default async function PostsPage() {
    const posts = await getPosts()

    return (
        <>
            <h1 className="text-2xl my-4">Derniers posts</h1>
            <div className="flex flex-col gap-5">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </>
    )
}