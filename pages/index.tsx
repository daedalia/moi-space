import { Post } from "../types/Post"
import Link from "next/link"

// Define the components props
interface IndexProps {
  posts: Array<Post>
}

// define the page component
function Index(props: IndexProps) {
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

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL as string)
  const posts = await res.json()

  // return props
  return {
    props: { posts },
  }
}

export default Index
