import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../helper/mongodb"
import { ResponseFunctions } from "../../../types/ResponseFunctions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })
    
    // Potential Responses
    const handleCase: ResponseFunctions = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Post } = await connect() // connect to database
            res.json(await Post.find({}).catch(catcher))
        },
        
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Post } = await connect() // connect to database
            res.status(200).end()
            res.json(await Post.create(req.body).catch(catcher))
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler