"use client"
import { useRouter } from 'next/navigation'
import type { MovieData } from '../../../types/movie'
import MovieHero from '../../src/components/MovieHero'
import MovieTabs from '../../src/components/MovieTabs'

interface MoviePageClientProps {
  movie: MovieData
}

export default function MoviePageClient({ movie }: MoviePageClientProps) {
  const router = useRouter()

  return (
    <>
      <MovieHero movie={movie} onBack={() => router.back()} />
      <div className="px-6 md:px-10">
        <MovieTabs movie={movie} />
      </div>
    </>
  )
}