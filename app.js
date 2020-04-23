const question = document.querySelector("#question");
const options = [...document.querySelectorAll(".option-text")];
const questionCounterDisplay = document.querySelector(".questionCounter");
const scoreDisplay = document.querySelector(".score");

let permitToAnswerQuestion = false;
let score;
let currentQuestion = {};
let availableQuestions;
let questionCounter = 0;

const questionBonus = 10;
const maxQuestions = 10;

// Functions
const fetchQuestions = async () => {
	let response, data;
	try {
		response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple`);
		if(!response.ok) {
			throw new Error(err)
		}
	}
	catch(err) {
		return err;
	}

	try {
		data =  await response.json();
		// Formats the question to my preffered question format
		questions = data.results.map( question => {
			const correctQuestionFormat = {
				question: question.question
			};
			const questionOptions = [... question.incorrect_answers];
			correctQuestionFormat.correctOption = Math.floor(Math.random() * 3) + 1;
			// Insert the correct option in the question object
			questionOptions.splice(correctQuestionFormat.correctOption - 1, 0, question.correct_answer);

			questionOptions.forEach((option, index) => {
				correctQuestionFormat["option" + (index + 1)] = option;
			});
			return correctQuestionFormat;
		});
		startGame();
	}
	catch(err) {
		console.log(err);
	}
};


const startGame = () => {
	// reset all the game parameters
	availableQuestions = [...questions];
	// Creates a long lines for each questions
	availableQuestions.forEach( question => {
		const span = document.createElement("span");
		span.classList.add("question-progress");
		const width = document.querySelector(".scoredisplay").style.width;
		span.style.width = `${(width / maxQuestions)}%`;
		document.querySelector(".question-progress-bar").append(span);
	});
	score = 0;
	questionCounter = 0;
	// Pick a new question from the array of questions
	selectNewQuestion();
}

const selectNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > maxQuestions) {

		// Save the score of the user to local storage
		localStorage.setItem("recentScore", score);

		// finish the game
		return window.location.assign('finish.html');
	}
	questionCounter++;

	// Update the question counter display
	questionCounterDisplay.innerText = `${questionCounter}/${maxQuestions}`;
	// document.querySelector(".question-progress").style.width = `${(questionCounter / maxQuestions) * 100}`%

	// Select a random question from the available question array
	questionIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionIndex];
	question.innerHTML = currentQuestion.question;

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
	// scoreDisplay.innerText = score;
}

fetchQuestions();

// checks if the answer picked is correct
for (let option of options) {
	option.addEventListener("click", event => {


		if (!permitToAnswerQuestion) {
		return
	}
		permitToAnswerQuestion = false;
		const selectedOption = event.target.dataset["number"];

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
