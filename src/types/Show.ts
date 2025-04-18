import type { Genre } from './Genre'
import type { Network } from './Network'
import type { Rating } from './Rating'
import type { Schedule } from './Schedule'
import type { Image } from './Image'
import type { CastMember } from './CastMember'

export interface Show {
  id: number
  name: string
  type: string
  language: string
  genres: Genre[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: Network | null
  dvdCountry: string | null
  externals: {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
  }
  image: Image | null
  summary: string | null
  updated: number
  _embedded?: {
    cast?: CastMember[]
  }
}
