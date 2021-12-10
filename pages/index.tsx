import { Post } from "../types/Post"
import Link from "next/link"
import {router} from "next/client";
import {Image} from "react-bootstrap";

interface IndexProps {
  posts: Array<Post>
}

function Index(props: IndexProps) {
    const { posts } = props

    return (
      <div>
          <Image src="https://images2.minutemediacdn.com/image/upload/c_fit,f_auto,fl_lossy,q_auto,w_728/v1555999902/shape/mentalfloss/construction_8.gif?itok=i0AHeyO3"/>
          <hr/>
        <h2>Message board</h2>
          {posts.map(post => (
            <div key={post._id}>
                <Link href={`/posts/${post._id}`}>
              <h3 style={{ cursor: "pointer" }} >
                {post.title}
              </h3></Link>
                {post.body}
              <br/>
                <small>{post.dateCreated}</small>
            </div>
          ))}
        <hr/>
          <Link href="/posts/createPost"><button>Create a Post</button></Link>
          <hr/>
          <Image src="https://images2.minutemediacdn.com/image/upload/c_fit,f_auto,fl_lossy,q_auto,w_728/v1555999902/shape/mentalfloss/construction_8.gif?itok=i0AHeyO3"/>
      </div>
    )
}

export async function getServerSideProps() {
  const res = await fetch(process.env.BLOG_API_URL as string)
  const posts = await res.json()

  // return props
  return {
    props: { posts },
  }
}

export default Index
