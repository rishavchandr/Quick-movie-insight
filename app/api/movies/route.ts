import { NextResponse } from "next/server";

export async function GET() {
    try {

        const api_key = process.env.RAPID_API_KEY || ""

        const res = await fetch(
            "https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies",
            {
             headers: {
                "x-rapidapi-key": api_key,
                "x-rapidapi-host": "imdb236.p.rapidapi.com",
             },
            }
        )
        

        if (!res.ok) {
           return NextResponse.json({ error: "Failed to fetch from IMDB" }, { status: res.status });
       }
    
        const data = await res.json();
    
        const movies = data
         .filter((movie: any) => movie.primaryImage)
         .map((movie: any) => ({
            primaryImage: movie.primaryImage,
            primaryTitle: movie.primaryTitle,
          }))
    
        return NextResponse.json(movies)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}