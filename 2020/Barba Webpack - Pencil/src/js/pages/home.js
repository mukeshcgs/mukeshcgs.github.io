class Home {
	namespace = 'home';

	beforeEnter = data => {
		console.log(data, 'on home page');
		var docIcon = document.querySelector('.doc-icon');
		var menu = document.querySelector('.menus');
		// Using a class instead, see note below.
		docIcon.addEventListener("click", (event) => {
			event.preventDefault();
			menu.classList.toggle('open');
		});
	};
}

export default new Home();
