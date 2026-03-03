import { NextResponse } from "next/server";

export async function GET(
     req: Request,
     context : {params: Promise<{id: string}>}
   ) {
    try {
        const {id} = await context.params
        const api_key = process.env.RAPID_API_KEY || ""

        const res = await fetch(
            `https://imdb236.p.rapidapi.com/api/imdb/${id}`,
            {
             headers: {
                "x-rapidapi-key": api_key,
                "x-rapidapi-host": "imdb236.p.rapidapi.com",
             },
            }
        )
        

        if (!res.ok) {
           return NextResponse.json({ error: "Invaild IMDB ID" }, { status: res.status });
       }
    
        const data = await res.json();

    
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}