import { Post } from "../../types/Post"
import { useRouter } from "next/router"
import { useState } from "react"

// Define Prop Interface
interface ShowProps {
    post: Post
    url: string
}

// Define Component
function Show(props: ShowProps) {
    // get the next router, so we can use router.push later
    const router = useRouter()

    // set the post as state for modification
    const [post, setPost] = useState<Post>(props.post)

    // // function to complete a post
    // const handleComplete = async () => {
    //     if (!post.completed) {
    //         // make copy of post with completed set to true
    //         const newPost: Post = { ...post, completed: true }
    //         // make api call to change completed in database
    //         await fetch(props.url + "/" + post._id, {
    //             method: "put",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             // send copy of post with property
    //             body: JSON.stringify(newPost),
    //         })
    //         // once data is updated update state so ui matches without needed to refresh
    //         setPost(newPost)
    //     }
    //     // if completed is already true this function won't do anything
    // }

    // function for handling clicking the delete button
    const handleDelete = async () => {
        await fetch(props.url + "/" + post._id, {
            method: "delete",
        })
        //push user back to main page after deleting
        router.push("/")
    }

    //return JSX
    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
            <button onClick={handleDelete}>Delete</button>
            <button
                onClick={() => {
                    router.push("/")
                }}
            >
                Go Back
            </button>
        </div>
    )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
    // fetch the post, the param was received via context.query.id
    const res = await fetch(process.env.BLOG_API_URL + "/" + context.query.id)
    const post = await res.json()

    //return the serverSideProps the post and the url from out env variables for frontend api calls
    return { props: { post, url: process.env.BLOG_API_URL } }
}

// export component
export default Show