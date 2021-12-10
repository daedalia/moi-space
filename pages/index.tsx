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
          <Image 
              src="https://images2.minutemediacdn.com/image/upload/c_fit,f_auto,fl_lossy,q_auto,w_728/v1555999902/shape/mentalfloss/construction_8.gif?itok=i0AHeyO3"
          className="centre"          />
          <hr/>
          <h2>Crazy dancers</h2>
          <div>
          <Image src="https://societyofrock.com/wp-content/uploads/2016/08/elvis-gif1.gif"/>
          <Image src="https://media4.giphy.com/media/TNYCPt5rHvfnq/giphy.gif"/>
          <Image src="https://media2.giphy.com/media/cklPOHnHepdwBLRnQp/200.gif"/>
          <Image src="https://booksparks.com/wp-content/uploads/2018/04/dance-party-dancing-GIF-downsized-1.gif"/>
          <Image src="https://thumbs.gfycat.com/AggressiveCavernousIrishwaterspaniel-max-1mb.gif"/>
          <Image src="https://thumbs.gfycat.com/JoyousHarmlessKite-size_restricted.gif"/>
          </div>
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
          <Image src="https://d1vq4hxutb7n2b.cloudfront.net/system/files/5464cf/db342b824c04000c8e/w_412,dpr_2.625/bababyangel23_2000imagesUnderConstruction.gif"/>
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
