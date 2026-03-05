import type { MovieData } from '../../../types/movie'



function buildPrompt(movie: MovieData): string {
  return `Based on this movie's metadata, generate a rich audience insight summary as if you've analyzed hundreds of reviews.

Movie: ${movie.primaryTitle} (${movie.startYear})
Director: ${movie.directors?.map(d => d.fullName).join(", ") || "Unknown"}
Genres: ${movie.genres?.join(", ") || "N/A"}
IMDB: ${movie.averageRating ?? "N/A"}/10 (${movie.numVotes?.toLocaleString() ?? 0} votes)
Metascore: ${movie.metascore ?? "N/A"}/100
Runtime: ${movie.runtimeMinutes ?? "N/A"} min
Description: ${movie.description ?? "No description available"}
Themes: ${movie.interests?.join(", ") || "N/A"}
Production: ${movie.productionCompanies?.map(p => p.name).join(", ") || "Unknown"}

Respond with exactly these five sections using bold headers:

**Audience Sentiment**
2-3 sentences on overall reception.

**What People Love**
2-3 specific praised elements.

**Common Criticisms**
1-2 honest criticisms.

**Hidden Gem Factor**
One sentence on its cultural footprint.

**Who Should Watch**
One clear recommendation.`
}

export async function getAIResponse(
  movie: MovieData,
  onChunk: (text: string) => void
) {

  const response = await fetch("/api/AIInsights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: buildPrompt(movie),
      movieId: movie.id
    })
  })

  if (response.status === 429) {
    throw new Error("RATE_LIMIT")
  }

  if (!response.ok) {
    throw new Error("API_ERROR")
  }

  const reader = response.body?.getReader()

  if (!reader) throw new Error("STREAM_ERROR")

  const decoder = new TextDecoder()

  while (true) {

    const { done, value } = await reader.read()

    if (done) break

    const text = decoder.decode(value, { stream: true })

    if (text) onChunk(text)
  }
}