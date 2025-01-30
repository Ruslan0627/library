export class AbstractPage {

	constructor () {
	 this.app = document.getElementById("root")

	}
	setTitle (title) {
		return document.title = title
	}
}