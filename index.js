const checkDifficulty = () => {
	const difficulties = [...document.querySelectorAll(".difficulty article")];
	difficulties.forEach( difficulty => {

		difficulty.addEventListener("click", event => {

			let difficulty = event.target.innerText.toLowerCase();

			switch (difficulty) {
				case "medium": 
					difficulty = "medium"
					break;
				case "easy": 
					difficulty = "easy"
					break;
				case "hard":
					difficulty = "hard"
					break;
			}
			console.log(difficulty);
			localStorage.setItem("difficulty", difficulty);
		});
	});
};


const checkCategory = () => {
	const categories = [...document.querySelectorAll(".category")];
	for (let category of categories) {

		category.addEventListener("click", event => {
			let category = event.target.dataset["number"];
			console.log(category);
			localStorage.setItem("category", category);
		});
	}
};

checkCategory();
checkDifficulty();