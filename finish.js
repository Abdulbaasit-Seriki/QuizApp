/* End page Functionality */                

const saveScoreBtn = document.querySelector("#saveScoreButton");
const playerName = document.querySelector(".playername");
const finalScore = document.querySelector(".finalscore");
const thanks = document.querySelector(".thanks");
const myComment = document.querySelector(".final-comment");

const playerScore = localStorage.getItem("recentScore");

if (playerScore < 40) {
	thanks.innerText = `Olodo!!!!`
	myComment.innerHTML = `Una no go school ni. <br> Olodo rabata silati lo mo je ko ni je paper silati lo mo je, shiiiooooorrr`;
} else if(playerScore > 40 || playerScore < 65) {
	thanks.innerText = `Congrats!!!`;
	myComment.innerHTML = `You try small, make we no sing for Una. Go back to Primary 5`;
} else {
	thanks.innerText = `Congratulation!!!!`
	myComment.innerHTML = `I dey say na una dey carry first your class, Tualee!!!`
}

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