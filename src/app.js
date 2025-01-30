import { FavoritesPage } from "./pages/favorites/favorites.js";
import { MainPage } from "./pages/main/main.js";
import { NotFoundPage } from "./pages/not-found/not-found.js";

class App {
	routes = [
		{
			path: "",
			page: MainPage,
		},		
		{
			path: "#favorites",
			page: FavoritesPage,
		},
	];
	appState = {
		favorites:[]
	}
	constructor() {
		window.addEventListener('hashchange',this.route.bind(this))
		this.route() 
	}

	route() {
		const page = this.routes.find((r) => r.path === location.hash )?.page
		if (!page) {
			this.caurrentPage = new NotFoundPage()
			this.caurrentPage.render()
			return
		}
		this.caurrentPage = new page(this.appState)
		this.caurrentPage.render()
	}
}

new App();

