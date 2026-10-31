import axios from "axios"
import type { IGame, IStrapiResponse, TGameInput } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getGames = async(): Promise<IStrapiResponse<IGame[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IGame[]>>('/games', {
        params: {
            populate: "*",
            sort: "createdAt:desc"
        },
    })
    return res.data
}

const createGame = async (input: TGameInput): Promise<IGame> => {
    const res = await apiInstance.post("/games", {data: input})
    return res.data.data
}

const deleteGame = async (id: string) : Promise<void> => {
    await apiInstance.delete(`/games/${id}`)
}

export const api = { getGames, createGame, deleteGame }