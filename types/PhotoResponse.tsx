import {Photo} from "./Photo";

export interface PhotoResponse {
    "page": number,
    "per_page": number,
    "media": Array<Photo>
    "total_results": number,
    "next_page": string,
    "prev_page": string
}