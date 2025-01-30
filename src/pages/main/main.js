import { AbstractPage } from "../../common/classes/page";
import onChange from 'on-change';
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";

export class MainPage extends AbstractPage {
	constructor(appState) {
		super();
		this.setTitle("Главная Страница");
		this.appState = appState
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.state = onChange(this.state, this.stateHook.bind(this))
	}
 
	state = {
		bookList: [
			{
					"author_name": [
							"Dennis O'Neill"
					],
					"cover_i": 798036,
					"title": "Tales of the Demon",
					"subject": [
							"Comics & graphic novels, general",
							"Batman (fictitious character), fiction",
							"Comic books, strips, etc.",
							"Comic books, strips",
							"DC Comics",
							"Juvenile Fiction / Comics & Graphic Novels / Superheroes"
					]
			}
	],
		numFound:0,
		isLoading: false,
		searchValue: "",
		offSet: 10,
	};

	appStateHook (path) {
		if (path === "favorites") {
			this.render()
	 }
	 
	}
	async stateHook (path) {
		if (path === "searchValue") {
			this.state.isLoading = true
			this.render()
			const data = await this.getBookList(this.state.searchValue, this.state.offSet)
			this.state.isLoading = false
			this.state.numFound = data.numFound
			this.state.bookList = data.docs		
			console.log(data.docs);		
	 }
	 if (path === "bookList") {
		this.render()
	 }
	}

	async getBookList (searchValue,offset) {
		const getData = await fetch(`https://openlibrary.org/search.json?q=${searchValue}&fields=title,author_name,cover_i,subject&offset=${offset}`)
		return getData.json()
	}

	render() {
		console.log(this.state.numFound);
		
		const main = document.createElement("div");
		const searchComponent = new Search(this.state).render()
		const cardList = new CardList(this.appState,this.state).render()
		main.append(searchComponent)
		main.append(cardList)
		this.app.innerHTML = "";
		this.app.append(main);
		this.renderHeader()
	}
	renderHeader() {
		const header = new Header(this.appState).render()
		this.app.prepend(header)
		
	}
	 
}
