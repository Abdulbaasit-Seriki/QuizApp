/* End page Functionality */

const saveScoreBtn = document.querySelector("#saveScoreButton");
const playerName = document.querySelector(".playername");
const finalScore = document.querySelector(".finalscore");

const playerScore = localStorage.getItem("recentScore");
finalScore.innerText = playerScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

playerName.addEventListener("keyup", event => {
	// Disable the button if there's no text in the input yet
	saveScoreButton.disabled = !playerName.value;
});

saveScoreButton.addEventListener("click", event => {
	event.preventDefault();
	
	const score = {
		score: playerScore,
		name: playerName.value
	};
	highScores.push(score);
	// Sort the the scores from highest to lowest
	highScores.sort((a, b) => b.score - a.score);
	// Store only the top 10 scores
	highScores.splice(10);

	localStorage.setItem("highScores", JSON.stringify(highScores));
	window.location.assign('/leaderboard.html');
});

// export let name = playerName.value;