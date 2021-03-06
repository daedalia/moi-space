import { Post } from "../types/Post"
import Link from "next/link"

interface IndexProps {
    posts: Array<Post>
}

export function Blog(props: IndexProps){
    const { posts } = props

    return (
        <div>
            <h1>Blog posts</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <Link href={`/posts/${post._id}`} passHref>
                        <h3 style={{ cursor: "pointer" }}>
                            {post.title}
                            {post.body}
                            <small>{post.dateCreated}</small>
                        </h3>
                    </Link>
                </div>
            ))}
            <Link href="/posts/createPost" passHref><button>Create a Post</button></Link>
        </div>
    )
}