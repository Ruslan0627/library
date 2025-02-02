import { AbstractPage } from "../../common/classes/page";
import onChange from 'on-change';
import { Header } from "../../components/header/header";
import "../about-book/about-book.css";

export class AboutBookPage extends AbstractPage {
	state = {
		book: null,
		isLoading: false,
	};

	constructor(appState) {
		super();
		this.setTitle("О книге");
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.state = onChange(this.state, this.stateHook.bind(this));
		this.#setBookData();
	}

	appStateHook(path) {
		if (path === "favorites") {
			this.render();  // Перерисовываем при изменении favorites
		}
	}

	stateHook(path) {
		if (path === "isLoading" || path === "book") {
			this.render();
		}
	}

	async #setBookData() {
		this.state.isLoading = true;
		const book = await this.#loadBook();
		this.state.book = book;
		console.log(this.state.book);
		this.state.isLoading = false;
	}

	async #loadBook() {
		const data = await fetch(`https://openlibrary.org/books/${this.appState.searchBookId}.json`);
		const bookData = await data.json();

		const workKey = bookData.works ? bookData.works[0].key : null;
		const workData = workKey ? await this.#loadWorkData(workKey) : {};
		const authorKey = bookData.authors ? bookData.authors[0].key : null;
		const authuorData = authorKey ? await this.#loadWorkData(authorKey) : {};

		return {
			...bookData,
			...workData,
			authors: authuorData,
		};
	}

	async #loadWorkData(workKey) {
		const response = await fetch(`https://openlibrary.org${workKey}.json`);
		const workData = await response.json();
		return workData;
	}

	unmount() {
		onChange.unsubscribe(this.appState);
	}

	#addFavoriteBook() {
		this.appState.favorites.push(this.state.book)
 }
 #removeFavoriteBook() {
	if(this.state.book.covers) {
	 this.appState.favorites = this.appState.favorites.filter( b => b.cover_i || b.covers[0] !== this.state.book.covers[0] )
	}
 }

	render() {
		if (this.state.isLoading) {
			// Если данные все еще загружаются, показываем лоадер
			this.app.innerHTML = "<h1>Загрузка...</h1>";
			return;
		}

		if (!this.state.book) {
			this.app.innerHTML = "<h1>Книга не найдена</h1>";
			return;
		}

		const isFavorite = this.state.book?.covers?.[0] 
    ? this.appState.favorites.find(b => b.cover_i || b.covers[0] === this.state.book.covers[0])
    : false;
		const main = document.createElement("div");
		const title = [this.state.book.title, this.state.book.subtitle].join(' ');

		main.innerHTML = `
			<div class="about-book">
				<div class="about-book__title">
					<h1>${title}</h1>
				</div>
				<div class="about-book__body">
					<div class="about-book__img">
						<img src="https://covers.openlibrary.org/b/id/${this.state.book.covers[0]}-M.jpg"/>
					</div>
					<div class="about-book__info">
						<div class="about-book__parametr">
							<span> Автор: <span class="about-book__value">${this.state.book.authors?.name || "автор не указан"}</span></span>
						</div>
						<div class="about-book__parametr">
							<span> Категория: <span class="about-book__value">${this.state.book.subjects ? `${this.state.book.subjects[0]} & ${this.state.book.subjects[1]}` : "нет категории"}</span></span>
						</div>
						<div class="about-book__parametr">
							<span> Первая публикация: <span class="about-book__value">${this.state.book.publish_date || this.state.book.first_publish_date || "Дата не указана" }</span></span>
						</div>
						<div class="about-book__parametr">
							<span> Число страниц: <span class="about-book__value">${this.state.book.pagination || "Число страниц не указано"}</span></span>
						</div>
						<button class = "about-book__btn">
						${isFavorite?"Удалить из избранного"
							:"В избранное"
						}
						</button>
					</div>
				</div>
				<div class="about-book__pages">
					<span> Описание: </span>
					<p>${this.state.book.description?.value || "Нет описания"}</p>
				</div>
			</div>`;

			if (isFavorite) {
			main.querySelector(".about-book__btn")
				.addEventListener( 'click', this.#removeFavoriteBook.bind(this) )
			}
			else {
			main.querySelector(".about-book__btn")
			.addEventListener( 'click', this.#addFavoriteBook.bind(this) )
			}

		this.app.innerHTML = "";
		this.app.append(main);
		this.renderHeader();
	}

	renderHeader() {
		const header = new Header(this.appState).render();
		this.app.prepend(header);
	}
}