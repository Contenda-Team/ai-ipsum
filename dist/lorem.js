const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const quantity = document.querySelector("#quantity");
	fetch(`/ipsum/${quantity.value}`)
		.then((response) => response.json())
		.then((data) => {
			const display = document.querySelector("#sample");
			display.innerHTML = `<h3>${
				data.words
			} words of AI Ipsum</h3><div class="ipsum"><p>${data.ipsum.replace(
				/(?:\r\n|\r|\n)/g,
				"</p><p>"
			)}</p></div>`;
		});
});
