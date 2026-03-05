"use client"
import { useState } from 'react'
import type { MovieData } from '../../../types/movie'
import MovieOverview from './MovieOverview'
import MovieCast from './MovieCast'
import MovieAIInsights from './MovieAIInsight'

const TABS = ['Overview', 'Cast', 'Details', 'AI Insights'] as const
type Tab = typeof TABS[number]

interface MovieTabsProps {
  movie: MovieData
}

export default function MovieTabs({ movie }: MovieTabsProps) {
  const [active, setActive] = useState<Tab>('Overview')

  return (
    <div>
      <div className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 -mx-6 px-6 md:-mx-10 md:px-10">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide max-w-5xl mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-shrink-0 py-4 px-3 text-sm font-semibold border-b-2 transition-colors ${
                active === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8">
        {active === 'Overview'    && <MovieOverview movie={movie} />}
        {active === 'Cast'        && <MovieCast     movie={movie} />}
        {active === 'AI Insights' && <MovieAIInsights    movie={movie} />}
      </div>
    </div>
  )
}