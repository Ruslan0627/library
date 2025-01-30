import "../card-list/card-list.css";
import { DivComponent } from "../../common/classes/div-component";
import { Card } from "../card/card";

export class CardList extends DivComponent {
	constructor (appState, parentState) {
		super()
		this.appState = appState
		this.parentState = parentState
	}
	render() {
		this.element.innerHTML = ""
		this.element.classList.add("card-list")
		if (this.parentState.isLoading) {
			this.element.innerHTML = `<h1>Загрузка...</h1>`;
			return this.element;
		}
		else {
			const cardGrid = document.createElement('div')
			cardGrid.classList.add("card__grid")

			this.element.append(cardGrid)

			for (const book of this.parentState.bookList) {
				cardGrid.append(new Card(this.appState, book).render())
			}
		}
	
		return this.element;
	}
}