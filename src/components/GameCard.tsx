import { API_URL } from "../api";
import { GENRE_LABELS, type IGame } from "../types";

interface IGameCard extends IGame {

}
export function GameCard({ title, rating, description, price, cover, releaseDate, platforms, genre }: IGameCard) {
    return (
        <article className="card">
            <div className="card__cover">
                {cover ? (
                    <img
                        src={API_URL + cover.url}
                        alt={cover.alternativeText}
                    />
                ):(
                    <span>{title[0]}</span>
                )}
                {rating && <b className="card__rating">{rating}</b>}
            </div>

            <div className="card__body">
                <h3>{title}</h3>
                {
                    genre &&
                    <p className="card__meta">
                        {GENRE_LABELS[genre]}</p>
                }
                {releaseDate && (
                    <p className="card__meta">
                        {new Date(releaseDate).getFullYear()}
                    </p>
                )}
                {description && (
                    <p className="card__desc">
                    {description[0].children[0].text}
                    </p>
                )}
                {platforms && (
                    <p className="card__platforms">{platforms.join(" / ")}</p>
                )}
            </div>

            <footer className="card__footer">
                {price && (
                    <strong className={`${price === 0 ? "free" : ""}`}>
                        {price === 0 ? "Бесплатно" : price}
                    </strong>
                )}
                <button className="link-btn">Удалить</button>
            </footer>
        </article>
    )
}
