import { Clock, Calendar, Star, Award, Film, ChevronRight } from 'lucide-react'
import type { MovieData } from '../../../types/movie'

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  colorClass: string
}

function StatCard({ icon: Icon, label, value, colorClass }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 bg-zinc-900/60 ${colorClass}`}>
      <Icon className="w-5 h-5 flex-shrink-0 opacity-80" />
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-white font-bold text-sm">{value}</p>
      </div>
    </div>
  )
}

interface MovieOverviewProps {
  movie: MovieData
}

export default function MovieOverview({ movie }: MovieOverviewProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="section-label">Synopsis</h2>
        <p className="text-zinc-300 leading-relaxed text-base md:text-lg">{movie.description}</p>
      </section>

      <section>
        <h2 className="section-label">At a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Star}    label="IMDB Rating" value={`${movie.averageRating} / 10`} colorClass="border-amber-800/40 text-amber-400" />
          <StatCard icon={Award}   label="Metascore"   value={`${movie.metascore} / 100`}    colorClass="border-emerald-800/40 text-emerald-400" />
          <StatCard icon={Clock}   label="Runtime"     value={`${movie.runtimeMinutes} min`}  colorClass="border-blue-800/40 text-blue-400" />
          <StatCard icon={Calendar}label="Released"    value={movie.releaseDate}               colorClass="border-purple-800/40 text-purple-400" />
        </div>
      </section>

      <section>
        <h2 className="section-label">Themes & Tags</h2>
        <div className="flex flex-wrap gap-2">
          {movie.interests.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm hover:border-blue-500/50 hover:text-blue-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {movie.trailer && (
        <section>
          <h2 className="section-label">Trailer</h2>
          <a
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-700/40 hover:border-red-500/50 hover:bg-red-950/20 transition-all group w-full md:max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">Watch Official Trailer</p>
              <p className="text-zinc-500 text-xs">Opens on YouTube</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
          </a>
        </section>
      )}
    </div>
  )
}