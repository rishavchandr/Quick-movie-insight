"use client"
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import type { MovieData } from '../../../types/movie'
import { getAIResponse } from '@/app/api/AIInsights/service'


function renderInsights(text: string) {
  return text.split("\n").map((line, i) => {
    const match = line.match(/^\*\*(.*?)\*\*(.*)/)

    if (match) {
      return (
        <p key={i} className="mb-2">
          <span className="text-amber-400 font-bold">{match[1]}</span>
          <span className="text-zinc-300">{match[2]}</span>
        </p>
      )
    }

    return line.trim() ? (
      <p key={i} className="mb-2 text-zinc-300 text-sm leading-relaxed">
        {line}
      </p>
    ) : (
      <div key={i} className="h-1" />
    )
  })
}

type Status = "idle" | "loading" | "streaming" | "done" | "error"

interface AIInsightsProps {
  movie: MovieData
}

export default function AIInsights({ movie }: AIInsightsProps) {

  const [summary, setSummary] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [cooldown, setCooldown] = useState(false)

  const generate = async () => {

  if (cooldown) return

  setSummary("")
  setStatus("loading")
  setCooldown(true)

  setTimeout(() => {
    setCooldown(false)
  }, 30000) 

  try {

    await getAIResponse(movie, (chunk) => {
      setStatus("streaming")
      setSummary(prev => prev + chunk)
    })

    setStatus("done")

  } catch (err: any) {

    if (err.message === "RATE_LIMIT") {
      setSummary("AI is temporarily busy. Please try again in 30 seconds.")
    } else {
      setSummary("Unable to generate insights.")
    }

    setStatus("error")
  }
}

  return (
    <section>
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-zinc-900/80 p-6 backdrop-blur-sm">

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-amber-500/20">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          <div>
            <h3 className="font-bold text-white text-base">
              AI Review Insights
            </h3>
            <p className="text-zinc-500 text-xs">
              Powered by Gemini — synthesized audience analysis
            </p>
          </div>
        </div>


        {status === "idle" && (
          <button
            onClick={generate}
            disabled={cooldown}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30"
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Insights
          </button>
        )}


        {status === "loading" && (
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </div>
        )}


        {(status === "streaming" || status === "done" || status === "error") && (
          <div>

            <div className="text-sm leading-relaxed">
              {renderInsights(summary)}
            </div>

            {status === "streaming" && (
              <div className="flex items-center gap-1.5 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-500 text-xs">
                  Generating...
                </span>
              </div>
            )}

            {(status === "done" || status === "error") && (
              <button
                onClick={generate}
                className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
              >
                Regenerate
              </button>
            )}

          </div>
        )}

      </div>
    </section>
  )
}