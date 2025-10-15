
"use client"

import Image from "next/image"
import F1GPTLogo from "./assets/logo-no-bg.png"
import {useChat} from "@ai-sdk/react"
import type {UIMessage} from "@ai-sdk/react"

const Home = () => {

    const {append,isLoading,messages,input,handleInputChange,handleSubmit} = useChat()

    const noMessages = false


    
    return (
        <main>
            <Image className="logo" src={F1GPTLogo} width={250} alt="F1 RAG Chatbot Logo" />
            <section className={noMessages ? "" : "populated"}>
                {noMessages ?(
                    <>
                    <p className="starter-text">The best place for Formula 1 fans!</p>
                    <br/>
                    {/*Prompt suggestions*/}
                    </>
                ) : (
                    <>
                       {/*Map messages onto text bubbles*/}
                       {/*<LoadingBubble/>*/}
                    </>
                )}
                
            </section>
            <form onSubmit={handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me anything..."/>
                    <input type="submit"/>
            </form>
        </main>

    )
}
export default Home