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

// const questions = [
// 	{
// 		question: "What is the name of Colt's dog in The Web Development Bootcamp",
// 		option1: "Pola",
// 		option2: "Rusty",
// 		option3: "Bingo",
// 		option4: "Kola",
// 		correctOption: 2
// 	},
// 	{
// 		question: "Who killed Thanos in Avengers: Endgame",
// 		option1: "Tony Stark(Iron Man)",
// 		option2: "Thor",
// 		option3: "Captain America",
// 		option4: "Nebula",
// 		correctOption: 2
// 	},
// 	{
// 		question: "Why is Orange the New Black",
// 		option1: "HIMYM",
// 		option2: "Westworld",
// 		option3: "Veep",
// 		option4: "Ozark",
// 		correctOption: 3
// 	},
// ];

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
		// Formats the question to my prffered question format
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
			console.log(correctQuestionFormat);
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
	questionCounterDisplay.style.width = `${(questionCounter / maxQuestions) * 100}%`;

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
	scoreDisplay.innerText = score;
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
