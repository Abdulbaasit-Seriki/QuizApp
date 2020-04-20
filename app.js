const question = document.querySelector("#question");
const options = [...document.querySelectorAll(".option-text")];
const questionCounterDisplay = document.querySelector(".questionCounter");
const scoreDisplay = document.querySelector(".score");

const questions = [
	{
		question: "What is the name of Colt's dog in The Web Development Bootcamp",
		option1: "Pola",
		option2: "Rusty",
		option3: "Bingo",
		option4: "Kola",
		correctOption: 2
	},
	{
		question: "Who killed Thanos in Avengers: Endgame",
		option1: "Tony Stark(Iron Man)",
		option2: "Thor",
		option3: "Captain America",
		option4: "Nebula",
		correctOption: 2
	},
	{
		question: "Why is Orange the New Black",
		option1: "HIMYM",
		option2: "Westworld",
		option3: "Veep",
		option4: "Ozark",
		correctOption: 3
	},
];

const questionBonus = 10;
const maxQuestions = 3;

let permitToAnswerQuestion = false;
let score;
let currentQuestion = {};
let availableQuestions;
let questionCounter = 0;

const startGame = () => {
	// reset all the game parameters
	availableQuestions = [...questions];
	score = 0;
	questionCounter = 0;
	// Pick a new question from the array of questions
	selectNewQuestion();
}

const selectNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
		// finish the game
		return window.location.assign('finish.html');
	}
	questionCounter++;
	// Update the question counter display
	questionCounterDisplay.innerText = `${questionCounter}/${maxQuestions}`;

	// Select a random question from the available question array
	questionIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	options.forEach( option => {
		// Here, I'm getting the number I added to tye dataset attribute of each option elemebt tag
		const optionNumber = option.dataset["number"];
		// Add the number to the option to get the option out of the currentQuestion Object
		option.innerText = currentQuestion[`option${optionNumber}`];
	});

	// Remove the selected question from the available questions array
	availableQuestions.splice(questionIndex, 1);

	permitToAnswerQuestion = true;
}

const incrementScore = x => {
	score += x;
	scoreDisplay.innerText = score;
}

startGame();

// checks if the answer picked is correct
for (let option of options) {
	option.addEventListener("click", event => {


		if (!permitToAnswerQuestion) {
		return
	}
		permitToAnswerQuestion = false;
		const selectedOption = event.target.dataset["number"];

		console.log(currentQuestion.correctOption);

		const classToApply = selectedOption == currentQuestion.correctOption ? "correct" : "incorrect";
		event.target.parentElement.classList.add(classToApply);
		setTimeout(() => {
			event.target.parentElement.classList.remove(classToApply);
		}, 1000)

		if (classToApply === "correct") {
			incrementScore(questionBonus);
		}

		selectNewQuestion();
	});
}