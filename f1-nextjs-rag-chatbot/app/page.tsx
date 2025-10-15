
"use client"

import Image from "next/image"
import F1GPTLogo from "./assets/logo-no-bg.png"
import { useState } from "react"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionRow from "./components/PromptSuggestionRow"
 


const Home = () => {
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const noMessages = messages.length === 0

    const send = async (text: string) => {
        const user = { role: "user" as const, content: text }
        const nextMessages = [...messages, user]
        setMessages(nextMessages)
        setInput("")
        setIsLoading(true)
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: nextMessages })
            })
            const completion = await res.text()
            setMessages((m) => [...m, { role: "assistant", content: completion }])
        } finally {
            setIsLoading(false)
        }
    }

    const handlePrompt = (promptText: string) => {
        void send(promptText)
    }
    
    return (
        <main>
            <Image className="logo" src={F1GPTLogo} width={250} alt="F1 RAG Chatbot Logo" />
            <section className={noMessages ? "" : "populated"}>
                {noMessages ?(
                    <>
                    <p className="starter-text">The best place for Formula 1 fans!</p>
                    <br/>
                    <PromptSuggestionRow onPromptClick={handlePrompt}/>
                    </>
                ) : (
                    <>
                         {messages.map((message,index) => <Bubble key={`message-${index}`} message={message} />)}
                        {isLoading && <LoadingBubble/>}  
                       
                    </>
                )}
                
            </section>
            <form onSubmit={(e) => { e.preventDefault(); if (input.trim()) void send(input.trim()) }}>
                    <input className="question-box" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Ask me anything..."/>
                    <input type="submit" value="Send"/>
            </form>
        </main>

    )
}
export default Home