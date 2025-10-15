import "./global.css"

export const metadata = {
    title: "F1 RAG Chatbot",
    description: "The place to go for all your F1 questions!"
}

const RootLayout = ({children}) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout