// import { name } from './finish.js';

const highestPlayersScores = JSON.parse(localStorage.getItem("highScores"));

highestPlayersScores.forEach( player => {

	const playerNameTag = document.createElement("p");
	playerNameTag.classList.add("playerName");
	playerNameTag.innerText = player.name;   

	document.querySelector(".names").append(playerNameTag);

	const playerScoreTag = document.createElement("p");
	playerScoreTag.classList.add("playerScore");
	playerScoreTag.innerText = player.score;
	document.querySelector(".scores").append(playerScoreTag);

	// if (playerName.value) {

	// 	if (playerName.value === player.name) {
	// 		playerNameTag.classList.add("high-score-member");
	// 		playerNameTag.classList.add("high-score-member");
	// 	}
	// }
});