## F1 RAG Chatbot

F1 RAG Chatbot is a minimal Formula 1 assistant built with Next.js. It lets fans ask questions and get concise answers, styled with a Ferrari‑inspired UI.

### Tech Stack
- Next.js App Router (TypeScript)
- OpenAI API (gpt‑4o for answers, text‑embedding‑3‑small for retrieval)
- DataStax Astra DB for vector search over scraped F1 content

### Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

Add env vars in `.env.local`:
```
OPENAI_API_KEY=your_key_here
ASTRA_DB_API_ENDPOINT=...
ASTRA_DB_APPLICATION_TOKEN=...
ASTRA_DB_NAMESPACE=...
ASTRA_DB_COLLECTION=f1gpt
```

To ingest data into Astra DB:
```bash
npm run seed
```

### Project Structure
- `app/page.tsx` – chat UI (messages, input, suggestions)
- `app/api/chat/route.ts` – server endpoint calling OpenAI
- `app/components/*` – UI building blocks (bubbles, loader, suggestions)
- `app/global.css` – theme and layout
- `scripts/loadDb.ts` – scraping/embedding loader for Astra DB

### Notes
- Uses non‑streaming responses for simplicity
- RAG context is stored in Astra DB; the assistant runs on `gpt‑4o`

### License
MIT
