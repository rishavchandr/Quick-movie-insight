"use client"
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Movie = {
    primaryImage: string
    primaryTitle: string
}

const PosterCarousel = () => {
    const [posters, setPosters] = useState<Movie[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    async function fetchPosters() {
        try {
            const res = await fetch("/api/movies")
            const data = await res.json()
            setPosters(Array.isArray(data) ? data : [])
        } catch (e) {
            console.error("Failed to load posters", e)
        }
    }

    useEffect(() => { fetchPosters() }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.8 
                : scrollLeft + clientWidth * 0.8
            
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    if (posters.length === 0) return null

    return (
        <div className="relative group w-full mt-12 px-4">
            <button 
                onClick={() => scroll('left')}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {posters.map((movie, index) => (
                    <div 
                        key={index} 
                        className="relative w-44 md:w-56 aspect-[2/3] flex-shrink-0 snap-start transition-transform duration-300 hover:scale-105"
                    >
                        <Image
                            src={movie.primaryImage}
                            alt={movie.primaryTitle}
                            fill
                            className="object-cover rounded-md shadow-lg"
                            sizes="(max-width: 768px) 176px, 224px"
                        />
                    </div>
                ))}
            </div>

            <button 
                onClick={() => scroll('right')}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
        </div>
    )
}

export default PosterCarousel