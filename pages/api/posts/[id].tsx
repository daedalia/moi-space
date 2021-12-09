import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../helper/mongodb"
import { ResponseFunctions } from "../../../types/ResponseFunctions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // GRAB ID FROM req.query (where next stores params)
    const id: string = req.query.id as string

    // Potential Responses for /todos/:id
    const handleCase: ResponseFunctions = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Post } = await connect() // connect to database
            res.json(await Post.findById(id).catch(catcher))
        },
        // RESPONSE PUT REQUESTS
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Post } = await connect() // connect to database
            res.status(200).end()
            res.json(
                await Post.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
            )
        },
        // RESPONSE FOR DELETE REQUESTS
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Post } = await connect() // connect to database
            res.status(200).end()
            res.json(await Post.findByIdAndRemove(id).catch(catcher))
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler