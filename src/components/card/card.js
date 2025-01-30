import "../card/card.css";
import { DivComponent } from "../../common/classes/div-component";

export class Card extends DivComponent {
	constructor (appState, cardState) {
		super()
		this.appState = appState
		this.cardState = cardState

	}

	#addFavoriteBook() {
		 this.appState.favorites.push(this.cardState)
	}
	#removeFavoriteBook() {
		this.appState.favorites = this.appState.favorites.filter( b => b.cover_i !== this.cardState.cover_i )
	}
	render() {
		const isFavorite = this.appState.favorites.find(b => b.cover_i === this.cardState.cover_i)

		this.element.innerHTML = ""
		this.element.classList.add("card")
		this.element.innerHTML = `
  <div class="card__img">
    <img src="https://covers.openlibrary.org/b/id/${this.cardState.cover_i}-M.jpg" />
  </div>
  <div class="card__info">
    <div class="card__genre">
      ${this.cardState.subject ? this.cardState.subject.slice(0, 2).join("&") : "Жанр не указан"}
    </div>
    <div class="card__title">
      ${this.cardState.title}
    </div>
    <div class="card__author">
      ${this.cardState.author_name ? this.cardState.author_name[0] : "Не задано"}
    </div>
    <!-- Переместили сюда footer -->
    <div class="card__footer">
      <button class="btn__add ${isFavorite ? "btn__active" : ""}">
        ${
					isFavorite 
					? '<img src="../../../static/favorites.svg"/>' 
					: '<img src="../../../static/favorites-white.svg"/>'
				}
      </button>
    </div>
  </div>
		`
		if (isFavorite) {
			this.element.querySelector("button")
			.addEventListener( 'click', this.#removeFavoriteBook.bind(this) )
		}
		else {
		this.element.querySelector("button")
		.addEventListener( 'click', this.#addFavoriteBook.bind(this) )
		}
		return this.element;
	}
}