"use client"
import { useState } from 'react'
import { Search } from 'lucide-react'
import PosterCarousel from '../components/PosterCarousel'
import { useRouter } from 'next/navigation'

const HomeScreen = () => {
    const [query, setQuery] = useState("")
    const router = useRouter()
    const getMovieInfo = async function (id: string) {
        if(!id) return;
        router.push(`/movie/${id}`);
    }
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 overflow-x-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10" />

            <h1 className="text-5xl md:text-7xl font-black mb-4 text-center tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                Quick Movie Insight
            </h1>

            <p className="text-blue-400 mb-10 text-lg text-center max-w-xl">
                Instant access to ratings, cast, and hidden gems from the world's largest movie database.
            </p>

            <div className="w-full max-w-2xl flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl px-6 py-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-300 shadow-2xl">
                <Search className="w-6 h-6 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search by IMDB ID..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-lg text-white placeholder-zinc-600"
                />
                <button 
                onClick={() => getMovieInfo(query)}
                className="bg-blue-900 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                    Search
                </button>
            </div>
            
            <div className="w-full max-w-[1400px] mt-auto pb-10">
              <PosterCarousel />
            </div>
        </main>
    )
}

export default HomeScreen

