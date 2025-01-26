import "../header/header.css";
import { DivComponent } from "../../common/classes/div -component";

export class Header extends DivComponent {
	constructor (appState) {
		super()
		this.appState = appState
	}
	render() {
		this.element.innerHTML = ""
		this.element.classList.add("header")
		this.element.innerHTML = `
		<a src="/">
		<img src ="../../../static/logo.svg" alt = "Лого">
		</a>
		<div class = "menu">
		<div class = menu__links>
		<a class = "menu__link" href ="#search">
		<img src ="../../../static/search.svg" alt = "поиск">
		Поиск книг
		</a>
		<a class = "menu__link" href ="#favorites">
		<img src ="../../../static/favorites.svg" alt = "избранное">
		Избранное
		</a>
		</div>
		<div class ="menu__counter">
	  ${ this.appState.favorites.length }
		</div>
		`
		return this.element
	}
}