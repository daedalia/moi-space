//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    const PostSchema = new mongoose.Schema({
        title: String,
        body: String,
        dateCreated: String
    })
    const Post = mongoose.models.posts || mongoose.model("posts", PostSchema)

    return { conn, Post }
}