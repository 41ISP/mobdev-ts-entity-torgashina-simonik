import { GameCard } from "./components/GameCard"
import { GameForm } from "./components/GameForm"
import "./App.css"
import { useGamesStore } from "./store/useGamesStore"
import { useEffect, useState } from "react"

export default function App() {
    const { games, getGames } = useGamesStore()
    const [error, setIsError] = useState<string | null>(null)
    const [loading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            setIsError(null)
            try {
                await getGames()
            } catch (error) {
                console.error(error)
                setIsError('Что-то пошло не так')
            } finally {
                setIsLoading(false)
            }
        }
        load()

        const intervalId = setInterval(() => {
            try {
                getGames()
            } catch (error) {
                console.error(error)
            }
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        console.log(games)
    }, [games])
    return (
        <div className="layout">
            <header className="top">
                <h1>Игровая полка</h1>
                {games?.meta && (
                    <span>{games?.meta?.pagination.total} в коллекции</span>
                )}
            </header>

            <aside>
                <GameForm />
            </aside>

            <main>
                {error && <p className="error">Ошибка: </p>}
                {loading && <p className="hint">Загружаем игры…</p>}
                {!loading && !error && games?.data && games.data.length > 0 ? (
                    <div className="grid">
                        {games.data.map((el) => (
                        <GameCard {...el}/>
                        ))}
                    </div>
                ):(
                <p className="hint">
                    Полка пуста. Добавьте первую игру через форму.
                </p>
                )}
            </main>
        </div>
    )
}
