import { type } from "os";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

type LayoutProperties = {
    children: React.ReactNode
}

export function Layout(props: LayoutProperties){
    return <>
        <Header/>
        <Navigation/>
        {props.children}
        <Footer/>
    </>
}