import Link from "next/link";
import { Post } from "../../lib/types/post.types"

interface PostCardProp {
    post: Post
}

export default function PostCard({ post }: PostCardProp ) {
    return (
        <div>
            <Link href={`/posts/${post.id}`}>
                <h2 className="font-bold">{post.title}</h2>
            </Link>
            <p>{post.body}</p>
        </div>
    )
}