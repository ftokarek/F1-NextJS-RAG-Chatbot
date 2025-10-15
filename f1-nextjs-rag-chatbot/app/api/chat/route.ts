import OpenAI from "openai"
import { DataAPIClient } from "@datastax/astra-db-ts"

const {
  OPENAI_API_KEY,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION
} = process.env as Record<string, string>

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })
const astra = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = astra.db(ASTRA_DB_API_ENDPOINT, { keyspace: ASTRA_DB_NAMESPACE })

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Array<{ role: string; content: string }> }
    const latest = messages?.[messages.length - 1]?.content ?? ""

    let context = ""
    try {
      const embed = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: latest,
        encoding_format: "float"
      })
      const vector = embed.data[0].embedding
      const collection = await db.collection(ASTRA_DB_COLLECTION)
      const cursor = collection.find({}, { sort: { $vector: vector }, limit: 8 })
      const docs = await cursor.toArray()
      const texts = (docs || []).map((d: any) => d.text).filter(Boolean)
      context = texts.join("\n---\n")
    } catch (_) {
      context = ""
    }

    const system = {
      role: "system",
      content: `You answer questions about Formula 1 based on the provided context. If context is insufficient, say you don't know and suggest a follow-up. Context:\n${context}`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [system, ...(messages ?? [])]
    })
    const text = completion.choices?.[0]?.message?.content ?? ""
    return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
  } catch (e) {
    return new Response("", { status: 500 })
  }
}