import { Users } from 'lucide-react'
import type { MovieData, CastMember } from '../../../types/movie'

function CastCard({ member }: { member: CastMember }) {
  const thumb = member.thumbnails.find((t) => t.width >= 140) ?? member.thumbnails[0]

  return (
    <div className="flex-shrink-0 w-28 group cursor-pointer">
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-zinc-800 mb-2 ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-300">
        {thumb ? (
          <img
            src={thumb.url}
            alt={member.fullName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-8 h-8 text-zinc-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <p className="text-white text-xs font-semibold truncate" title={member.fullName}>
        {member.fullName}
      </p>
      <p className="text-zinc-500 text-xs truncate" title={member.characters[0] ?? member.job}>
        {member.characters[0] ?? member.job}
      </p>
    </div>
  )
}

function CrewRow({ label, names }: { label: string; names: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <span className="text-zinc-500 text-sm w-24 flex-shrink-0 mt-0.5">{label}</span>
      <div className="flex flex-wrap gap-2">
        {names.map((name) => (
          <span
            key={name}
            className="px-3 py-1 rounded-xl bg-zinc-800 border border-zinc-700/50 text-white text-sm font-medium"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

interface MovieCastProps {
  movie: MovieData
}

export default function MovieCast({ movie }: MovieCastProps) {
  const actors = movie.cast.filter((m) => m.job === 'actor' || m.job === 'actress')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="section-label">Crew</h2>
        <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
          <CrewRow label="Director" names={movie.directors.map((d) => d.fullName)} />
          <CrewRow label="Writers"  names={movie.writers.map((w) => w.fullName)} />
        </div>
      </section>
      <section>
        <h2 className="section-label">Cast ({actors.length})</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {actors.map((member) => (
            <CastCard key={`${member.id}-${member.characters[0]}`} member={member} />
          ))}
        </div>
      </section>
    </div>
  )
}