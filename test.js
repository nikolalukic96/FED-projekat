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
		question: 'Koliko je 1+1?',
		choiceA: '0',
		choiceB: '2',
		choiceC: '3',
		correct: 'B'
	},
	{
		question: 'Koliko je 2+2?',
		choiceA: '4',
		choiceB: '9',
		choiceC: '0',
		correct: 'A'
	},
	{
		question: 'Koliko je 3+3?',
		choiceA: '8',
		choiceB: '7',
		choiceC: '6',
		correct: 'C'
	},
	{
		question: 'Koliko je 4+4?',
		choiceA: '7',
		choiceB: '8',
		choiceC: '6',
		correct: 'B'
	},
	{
		question: 'Koliko je 5+5?',
		choiceA: '10',
		choiceB: '11',
		choiceC: '12',
		correct: 'A'
	},
	{
		question: 'Koliko je 6+6?',
		choiceA: '7',
		choiceB: '12',
		choiceC: '20',
		correct: 'B'
	},
	{
		question: 'Koliko je 7+7?',
		choiceA: '7',
		choiceB: '8',
		choiceC: '14',
		correct: 'C'
	},
	{
		question: 'Koliko je 8+8?',
		choiceA: '16',
		choiceB: '8',
		choiceC: '6',
		correct: 'A'
	},
	{
		question: 'Koliko je 9+9?',
		choiceA: '18',
		choiceB: '8',
		choiceC: '6',
		correct: 'A'
	},
	{
		question: 'Koliko je 10+10?',
		choiceA: '7',
		choiceB: '8',
		choiceC: '20',
		correct: 'C'
	}
];

const lastQuestion = questions.length - 1; //question.lenght je zato sto array uvek krece od nule a ne od 1
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // // 10 sekundi da se odgovori na pitanje
const gaugeWidth = 150; //duzina bara u px
const gaugeUnit = gaugeWidth / questionTime; // Ovo deli sirinu bara sa vremenom koje smo zadali (u ovom slucaj 150/10)
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
	TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
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
	document.getElementById(runningQuestion).style.backgroundColor = '#0f0';
}

//Ovo ce da boji kruzic u crveno ako je odgovor netacan
function answerIsWrong() {
	document.getElementById(runningQuestion).style.backgroundColor = '#f00';
}

//Prikazivanje rezultata
function scoreRender() {
	scoreDiv.style.display = 'block';

	// Pretvara rezultat testa u procente
	const scorePerCent = Math.round(100 * score / questions.length);

	scoreDiv.innerHTML += '<h3>Tacnih odgovora: ' + score + '</h3>';
	scoreDiv.innerHTML += '<p>Imali ste ' + scorePerCent + '% na testu</p>';
}
function resetPage() {
	location.reload();
}
