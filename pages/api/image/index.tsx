import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFunctions } from "../../../types/ResponseFunctions"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions

    const API_KEY = process.env.PEXELS_API_KEY as string;
    const headers: HeadersInit = {
        'Authorization': API_KEY
    }
    const opts: RequestInit = {
        method: 'GET',
        headers,
    };
    
    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFunctions = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            res.json(await fetch(
                "https://api.pexels.com/v1/curated?page=11&per_page=18",
                opts
            ).catch(catcher))
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler