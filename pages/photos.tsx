import React, { useState } from "react";
import {Photo} from "../types/Photo";
import {PhotoResponse} from "../types/PhotoResponse";
import Image from "next/image";
import {Card, Col, Container, Row} from "react-bootstrap";

interface IndexProps {
    photos: Array<Photo>
}

export function Photos(props: IndexProps) {
    // const [photos, setPhotos] = useState(props);
    // useState();
    const {photos} = props
    return (
        <Container fluid>
            <Row>
            {photos.map(photo => (
                // <div>{photo.src.portrait}</div>
                // <div key={photo.id}>
                //     <Image src={photo.src.large}
                //            width={photo.width}
                //            height={photo.height}
                //            alt={photo.url}
                //     />
                // </div>
                <Col xs={4}>
                <Image src={photo.src.large}
                           width={photo.width}
                           height={photo.height}
                           alt={photo.url}/>
                </Col>
            ))}
            </Row>
        </Container>
    );
}

export async function getServerSideProps() {
    const API_KEY = process.env.PEXELS_API_KEY as string;
    const headers: HeadersInit = {
        'Authorization': API_KEY
    }
    const opts: RequestInit = {
        method: 'GET',
        headers,
    };
    
    const res = await fetch(
        "https://api.pexels.com/v1/collections/tde7ybg",
        opts);
    const photoResponse: PhotoResponse = await res.json()
    const photos = photoResponse.media
    
    return {
        props: {photos},
    };
}

export default Photos