// ================================
// QUIZ HerTeen
// ================================

let currentQuestion = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");

const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const finalScore = document.getElementById("finalScore");
const grade = document.getElementById("grade");
const message = document.getElementById("message");

const retryBtn = document.getElementById("retryBtn");

startBtn.addEventListener("click", () => {

document.querySelector(".card").parentElement.style.display = "none";

quizBox.style.display = "block";

showQuestion();

});

function showQuestion(){

const q = questions[currentQuestion];

questionNumber.innerHTML =
`Soal ${currentQuestion+1} dari ${questions.length}`;

questionText.innerHTML = q.question;

progressBar.style.width =
((currentQuestion)/questions.length*100)+"%";

answerButtons.innerHTML="";

feedback.innerHTML="";

q.answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.className="btn btn-outline-primary w-100 text-start mb-3";

btn.innerHTML=answer;

btn.onclick=()=>selectAnswer(index);

if(selectedAnswers[currentQuestion]===index){

btn.classList.remove("btn-outline-primary");

btn.classList.add("btn-primary");

}

answerButtons.appendChild(btn);

});

prevBtn.disabled=currentQuestion===0;

if(currentQuestion===questions.length-1){

nextBtn.innerHTML="Selesai";

}else{

nextBtn.innerHTML=`Selanjutnya
<i class="fa-solid fa-arrow-right"></i>`;

}

}

function selectAnswer(index){

selectedAnswers[currentQuestion]=index;

const q=questions[currentQuestion];

const buttons=answerButtons.querySelectorAll("button");

buttons.forEach((btn,i)=>{

btn.classList.remove("btn-primary","btn-success","btn-danger");

btn.classList.add("btn-outline-primary");

if(i===index){

if(i===q.correct){

btn.classList.remove("btn-outline-primary");

btn.classList.add("btn-success");

feedback.innerHTML=

`<div class="alert alert-success">

<b>✅ Jawaban Benar</b><br><br>

${q.explanation}

</div>`;

}else{

btn.classList.remove("btn-outline-primary");

btn.classList.add("btn-danger");

feedback.innerHTML=

`<div class="alert alert-danger">

<b>❌ Jawaban Salah</b><br><br>

Jawaban yang benar:

<b>${q.answers[q.correct]}</b>

<hr>

${q.explanation}

</div>`;

}

}

});

}

nextBtn.onclick=()=>{

if(selectedAnswers[currentQuestion]===null){

alert("Silakan pilih jawaban terlebih dahulu.");

return;

}

if(currentQuestion<questions.length-1){

currentQuestion++;

showQuestion();

}else{

finishQuiz();

}

}

prevBtn.onclick=()=>{

if(currentQuestion>0){

currentQuestion--;

showQuestion();

}

}

function finishQuiz(){

score=0;

questions.forEach((q,index)=>{

if(selectedAnswers[index]===q.correct){

score++;

}

});

quizBox.style.display="none";

resultBox.style.display="block";

const nilai=Math.round(score/questions.length*100);

finalScore.innerHTML=nilai;

let kategori="";
let pesan="";

if(nilai>=90){

kategori="🥇 Sangat Baik";

pesan="Luar biasa! Kamu memahami materi HerTeen dengan sangat baik.";

}

else if(nilai>=80){

kategori="🥈 Baik";

pesan="Bagus! Terus pertahankan pemahamanmu.";

}

else if(nilai>=70){

kategori="🥉 Cukup";

pesan="Pemahamanmu sudah cukup baik. Pelajari kembali beberapa materi.";

}

else{

kategori="📚 Belajar Lagi";

pesan="Yuk pelajari kembali materi HerTeen lalu coba lagi.";

}

grade.innerHTML=kategori;

message.innerHTML=pesan;

}

retryBtn.onclick=()=>{

location.reload();

};