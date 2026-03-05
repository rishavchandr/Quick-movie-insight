import { Star, Clock, Calendar, Shield } from 'lucide-react'
import type { MovieData } from '../../../types/movie'

interface MovieHeroProps {
  movie: MovieData
  onBack: () => void
}

export default function MovieHero({ movie, onBack }: MovieHeroProps) {
  const ratingColor =
    movie.averageRating >= 8
      ? 'text-emerald-400'
      : movie.averageRating >= 6
      ? 'text-amber-400'
      : 'text-red-400'

  return (
    <div className="relative h-[60vh] min-h-[440px] overflow-hidden">
      <img
        src={movie.primaryImage}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-25 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/30 to-transparent" />

      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-10 px-4 py-2 rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-700/50 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
      >
        ← Back
      </button>

      
      {movie.contentRating && (
        <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-600/60 bg-zinc-900/70 backdrop-blur text-xs font-bold text-zinc-300">
          <Shield className="w-3 h-3" />
          {movie.contentRating}
        </div>
      )}

     
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-8 flex gap-6 items-end">
        <div className="hidden sm:block flex-shrink-0 w-32 h-48 rounded-2xl overflow-hidden ring-2 ring-white/10 shadow-2xl">
          <img src={movie.primaryImage} alt={movie.primaryTitle} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="px-2.5 py-0.5 rounded-full bg-blue-900/50 border border-blue-700/40 text-blue-300 text-xs font-semibold"
              >
                {g}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-1 text-white drop-shadow-lg">
            {movie.primaryTitle}
          </h1>

          {movie.originalTitle !== movie.primaryTitle && (
            <p className="text-zinc-400 text-sm italic mb-3">{movie.originalTitle}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className={`flex items-center gap-1.5 font-bold text-xl ${ratingColor}`}>
              <Star className="w-5 h-5 fill-current" />
              {movie.averageRating}
              <span className="text-zinc-500 text-sm font-normal">/ 10</span>
            </span>
            <span className="text-zinc-500 text-xs">{movie.numVotes.toLocaleString()} votes</span>
            {movie.metascore && (
              <span className="px-2 py-0.5 rounded bg-green-700 text-white text-xs font-bold">
                MC {movie.metascore}
              </span>
            )}
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {movie.runtimeMinutes}m
            </span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {movie.startYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}