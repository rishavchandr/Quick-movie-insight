export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface CastMember {
  id: string
  url: string
  fullName: string
  primaryImage: string | null
  thumbnails: Thumbnail[]
  job: string
  characters: string[]
}

export interface ProductionCompany {
  id: string
  name: string
}

export interface CrewMember {
  id: string
  url: string
  fullName: string
}

export interface MovieData {
  id: string
  url: string
  primaryTitle: string
  originalTitle: string
  type: string
  description: string
  primaryImage: string
  thumbnails: Thumbnail[]
  trailer: string
  contentRating: string
  startYear: number
  endYear: number | null
  releaseDate: string
  interests: string[]
  countriesOfOrigin: string[]
  externalLinks: string[]
  spokenLanguages: string[]
  filmingLocations: string[]
  productionCompanies: ProductionCompany[]
  budget: number
  grossWorldwide: number
  genres: string[]
  isAdult: boolean
  runtimeMinutes: number
  averageRating: number
  numVotes: number
  metascore: number
  directors: CrewMember[]
  writers: CrewMember[]
  cast: CastMember[]
}
