import OpenAI from "openai"

const { OPENAI_API_KEY } = process.env

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages?.[messages.length - 1]?.content ?? ""

    const system = {
      role: "system",
      content: "You are a helpful assistant for Formula 1 fans. Keep answers concise."
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [system, ...(messages ?? [])]
    })

    const text = completion.choices?.[0]?.message?.content ?? ""
    return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
  } catch (e) {
    return new Response("", { status: 500 })
  }
}