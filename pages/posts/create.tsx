import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useRef } from "react"
import { Post } from "../../types/Post"

// Define props
interface CreateProps {
    url: string
}

// Define Component
function Create(props: CreateProps) {
    // get the next route
    const router = useRouter()

    // since there is just one input we will use a uncontrolled form
    const item = useRef<HTMLInputElement>(null)

    // Function to create new post
    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()

        // construct new todo, create variable, check it item.current is not null to pass type checks
        let post: Post = { item: "", body: "", dateCreated: Date() }
        if (null !== item.current) {
            post = { item: item.current.value, body: "", dateCreated: Date() }
        }

        // Make the API request
        await fetch(props.url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })

        // after api request, push back to main page
        router.push("/")
    }

    return (
        <div>
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={item}></input>
                <input type="submit" value="create post"></input>
            </form>
        </div>
    )
}

// export getStaticProps to provie API_URL to component
export async function getStaticProps(context: any) {
    return {
        props: {
            url: process.env.API_URL,
        },
    }
}

// export component
export default Create
