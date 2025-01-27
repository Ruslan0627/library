import "../search/search.css";
import { DivComponent } from "../../../common/classes/div-component.js";

export class Search extends DivComponent {
	constructor(state) {
		super()
		this.state = state
	}

	onSearch() {
		const value = this.element.querySelector("input").value
		this.state.searchValue = value
	}


	render () {
		this.element.innerHTML = ""
		this.element.classList.add("search")
		this.element.innerHTML = `
		<div class = "search__wrapper">
		<input 
		class = "search__input"
		type = "text" 
		placeholder = "Найти книгу или автора...."
		value = "${this.state.searchValue ?? ""}"
		/>
		<img src = "../../../static/search.svg" alt = "Иконка поикса"/>
		</div>
		<button 
		type = "button" 
		class = "search__button"
		>
		<img 
		src = "../../../static/search-white.svg" 
		alt = "Иконка поикса белая"
		/>
		</button>
		`
		this.element.querySelector("button").addEventListener('click', this.onSearch.bind(this))
		this.element.querySelector("button").addEventListener('keydown', (event) => {
			if (event.code === "Enter") this.onSearch()
		})
		return this.element
	}
}