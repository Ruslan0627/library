import { AbstractPage } from "../../common/classes/page";
import onChange from 'on-change';
import { Header } from "../../components/header/header";

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
		console.log(path);
		if (path === "favorites") {
			this.render()
	 }
	}

	render() {
		const main = document.createElement("div");
		main.innerHTML = `Главная старница`;
		this.app.innerHTML = "";
		this.app.append(main);
		this.renderHeader()
	}
	renderHeader() {
		const header = new Header(this.appState).render()
		this.app.prepend(header)
		
	}
}
