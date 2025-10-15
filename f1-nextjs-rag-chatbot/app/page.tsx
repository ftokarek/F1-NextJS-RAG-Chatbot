
"use client"

import Image from "next/image"
import F1GPTLogo from "./assets/logo-no-bg.png"
import {useChat} from "@ai-sdk/react"
import type {UIMessage} from "@ai-sdk/react"

const Home = () => {
    return (
        <main>
        <Image src={F1GPTLogo} width={250} alt="F1 RAG Chatbot Logo" />
        </main>
    )
}
export default Home