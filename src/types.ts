export interface IStrapiResponse<T> {
  data: T
  meta?: Meta
}

export interface IMedia {
  id: number,
  url: string,
  alternativeText?: string
}

export interface IGame {
  id: number
  documentId: string
  title: string
  description?: Description[]
  rating?: number
  price?: number
  genre?: GameGenre
  releaseDate?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  platforms: string[]
  cover?: IMedia
}

export type TGameInput = Omit<IGame, "id" | "documentId" | "cover" | "createdAt" | "updatedAt" | "publishedAt" >

export interface Description {
  type: string
  children: Children[]
}

export interface Children {
  text: string
  type: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export const GENRES = ['rpg', 'shooter', 'strategy', 'indie', 'horror'] as const
export type GameGenre = (typeof GENRES)[number]

export const GENRE_LABELS: Record<GameGenre, string> = {
    rpg: "РПГ",
    shooter: "Шутер",
    strategy: "Стратегия",
    indie: "Инди",
    horror: "Хоррор",
}