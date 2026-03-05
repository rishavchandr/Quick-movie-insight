
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import MovieInfo from './MovieInfo'


async function getMovie(id: string){

  const baseUrl =  process.env.BASE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/moviesInfo/${id}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) notFound()

  return res.json()
}

function MovieSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 animate-pulse">
      <div className="h-[60vh] bg-zinc-900" />
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 space-y-4">
        <div className="h-4 bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-zinc-800 rounded w-2/3" />
        <div className="h-4 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  )
}


interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const {id} = await params
    const movie = await getMovie(id)
    return {
      title: `${movie.primaryTitle} (${movie.startYear}) — Quick Movie Insight`,
      description: movie.description,
      openGraph: { images: [movie.primaryImage] },
    }
  } catch {
    return { title: 'Movie Not Found' }
  }
}

export default async function MoviePage({ params }: PageProps) {
  const {id} = await params
  const movie = await getMovie(id)

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <div className="min-h-screen bg-zinc-950 text-white">
        <MovieInfo movie={movie} />
      </div>
    </Suspense>
  )
}