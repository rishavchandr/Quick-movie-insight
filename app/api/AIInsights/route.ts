

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)


const insightCache = new Map<string, string>()

export async function POST(request: Request) {

  const { prompt, movieId } = await request.json()

  if (!prompt) {
    return Response.json({ error: "Prompt required" }, { status: 400 })
  }

  if (movieId && insightCache.has(movieId)) {
    const cached = insightCache.get(movieId)!

    return new Response(cached, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    })
  }

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    })

    const result = await model.generateContentStream(prompt)

    let fullText = ""

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {

        for await (const chunk of result.stream) {

          const text = chunk.text()

          if (text) {
            fullText += text
            controller.enqueue(encoder.encode(text))
          }
        }

        if (movieId) insightCache.set(movieId, fullText)

        controller.close()
      }
    })

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    })

  } catch (err: any) {

    if (err.status === 429) {
      return Response.json(
        { error: "RATE_LIMIT" },
        { status: 429 }
      )
    }

    return Response.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    )
  }
}