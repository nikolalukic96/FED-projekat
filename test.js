// Hvatam sve elemente koji su mi potrebni iz html-a
const start = document.getElementById('start');
const test = document.getElementById('test');
const question = document.getElementById('question');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');
const progress = document.getElementById('progress');
const scoreDiv = document.getElementById('scoreContainer');

//Kreiram pitanja, array sa objektima, u svakom objektu je pitanje,izbor A,B,C i tacan odgovor
let questions = [
	{
		question: 'The monsters, and the dark forest they live in, __.',
		choiceA: 'are scare',
		choiceB: 'are scary',
		choiceC: 'is scary',
		correct: 'B'
	},
	{
		question: 'Did you go to the movies __?',
		choiceA: 'today',
		choiceB: 'tomorrow',
		choiceC: 'now',
		correct: 'A'
	},
	{
		question: 'Either place you decide to visit __ for its own reasons.',
		choiceA: 'are good',
		choiceB: 'are gooder',
		choiceC: 'is good',
		correct: 'C'
	},
	{
		question: '___ there a restaurant near here?',
		choiceA: 'Do',
		choiceB: 'Is',
		choiceC: 'Have',
		correct: 'B'
	},
	{
		question: 'Look! The bus ___.',
		choiceA: 'is leaving',
		choiceB: 'leaves',
		choiceC: 'leaving',
		correct: 'A'
	},
	{
		question: 'Dubai has ___ building in the world.',
		choiceA: 'tall',
		choiceB: 'the tallest',
		choiceC: 'bigger',
		correct: 'B'
	},
	{
		question: 'Everybody __ what is happening at the concert hall tonight.',
		choiceA: 'knowed',
		choiceB: 'knewed',
		choiceC: 'know',
		correct: 'C'
	},
	{
		question: 'We ___ to go today.',
		choiceA: 'are planning',
		choiceB: 'is planning',
		choiceC: 'are planned',
		correct: 'A'
	},
	{
		question: 'I ___ to Chicago last summer.',
		choiceA: 'went',
		choiceB: 'had been',
		choiceC: 'has been',
		correct: 'A'
	},
	{
		question: `I didn't _____ TV last night.`,
		choiceA: 'not watched',
		choiceB: 'watched',
		choiceC: 'watch',
		correct: 'C'
	}
];

const lastQuestion = questions.length - 1; //question.lenght je zato sto array uvek krece od nule a ne od 1
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // // 20 sekundi da se odgovori na pitanje
const gaugeWidth = 150; //duzina bara u px
const gaugeUnit = gaugeWidth / questionTime; // Ovo deli sirinu bara sa vremenom koje smo zadali (u ovom slucaj 150/20)
let TIMER;
let score = 0;

//Renderuje pitanje
function renderQuestion() {
	let q = questions[runningQuestion];

	question.innerHTML = '<p>' + q.question + '</p>'; //ovo ce kreirati paragraf u kome ce se nalaziti pitanje
	choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click', startTest);

// Startuje test kada kliknemo na dugme
function startTest() {
	start.style.display = 'none'; //sakriva dugme za startovanje testa
	renderQuestion();
	test.style.display = 'block'; //prikazuje test, u html je prethodno stavljen display:none
	renderProgress();
	renderCounter();
	TIMER = setInterval(renderCounter, 1000);
}

// Renderuje progres bar, kreira div sa klasom prog odnosno kreira one male kruzice za svako pitanje u testu
function renderProgress() {
	for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
		progress.innerHTML += "<div class='prog' id=" + qIndex + '></div>';
	}
}

//Renderovanje brojaca

function renderCounter() {
	if (count <= questionTime) {
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit + 'px'; // sa ovim ce se counter pomerati za 15px po sekundi(ili koliko smo vec zadali da vreme bude)
		count++;
	} else {
		count = 0;
		// ovaj je u slucaju da nam istekne vreme, counter se resetuje
		// a posto je isteklo vreme to znaci da je odgovor bio pogresan
		answerIsWrong();
		if (runningQuestion < lastQuestion) {
			runningQuestion++; //ovo proverava da li je ostalo jos pitanja
			renderQuestion();
		} else {
			// zavrsava test i pokazuje rezultat
			clearInterval(TIMER);
			scoreRender();
		}
	}
}

// Provera odgovora

function checkAnswer(answer) {
	if (answer == questions[runningQuestion].correct) {
		//ako je odgovor tacan povecava score i menja boju kruzica u zeleno
		score++;
		answerIsCorrect();
	} else {
		answerIsWrong(); //ako je odgovor netacan menja boju kruzica u crveno
	}
	count = 0;
	if (runningQuestion < lastQuestion) {
		runningQuestion++; // ovo proverava da li je ostalo jos pitanja
		renderQuestion();
	} else {
		//zavrsava test i pokazuje score
		clearInterval(TIMER);
		scoreRender();
	}
}

//Ovo ce da boji kruzic u zeleno ako je odgovor tacan
function answerIsCorrect() {
	document.getElementById(runningQuestion).style.backgroundColor = 'mediumseagreen';
}

//Ovo ce da boji kruzic u crveno ako je odgovor netacan
function answerIsWrong() {
	document.getElementById(runningQuestion).style.backgroundColor = '#f00';
}

//Prikazivanje rezultata
function scoreRender() {
	scoreDiv.style.display = 'block';
	test.style.display = 'none';
	// Pretvara rezultat testa u procente
	const scorePerCent = Math.round(100 * score / questions.length);

	scoreDiv.innerHTML += '<h2>Correct answers: ' + score + '</h2>';
	scoreDiv.innerHTML += '<h4>You had ' + scorePerCent + '% score on this test.</h4>';
}
function resetPage() {
	location.reload();
}
