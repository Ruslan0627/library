import { AbstractPage } from "../../common/classes/page";
import onChange from 'on-change';

export class MainPage extends AbstractPage {
	constructor(appState) {
		super();
		this.setTitle("Главная Страница");
		this.appState = appState
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
	}
 
	state = {
		bookList: [],
		isLoading: false,
		searchValue: "",
		offSet: null,
	};

	appStateHook (path) {
		if (path === "favorites") {
			this.render()
		}
	}

	render() {
		const main = document.createElement("div");
		main.innerHTML = `
		Главная старница
		Количество избранных книг ${this.appState.favorites.length}`;
		this.app.innerHTML = "";
		this.app.append(main);
		// this.appState.favorites.push("book")
	}
}
