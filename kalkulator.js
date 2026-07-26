//====================================
// KALKULATOR SIKLUS MENSTRUASI
// HerTeen
//====================================

let currentMonth;
let currentYear;

let nextPeriodDate;
let ovulationDate;
let fertileStartDate;
let fertileEndDate;

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", calculateCycle);

// Format tanggal Indonesia
function formatDate(date){

const options = {
day: "numeric",
month: "long",
year: "numeric"
};

return date.toLocaleDateString("id-ID", options);

}

function calculateCycle(){

const lastPeriodInput = document.getElementById("lastPeriod").value;
const cycleLength = parseInt(document.getElementById("cycleLength").value);

if(lastPeriodInput === ""){

alert("Silakan pilih tanggal hari pertama haid terakhir.");

return;

}

if(cycleLength < 21 || cycleLength > 35){

alert("Panjang siklus harus antara 21–35 hari.");

return;

}

//====================================
// Hari pertama haid terakhir
//====================================

const lastPeriod = new Date(lastPeriodInput);

//====================================
// Menstruasi berikutnya
//====================================

const nextPeriod = new Date(lastPeriod);

nextPeriod.setDate(
nextPeriod.getDate() + cycleLength
);

//====================================
// Ovulasi
// Sekitar 14 hari sebelum haid berikutnya
//====================================

const ovulation = new Date(nextPeriod);

ovulation.setDate(
ovulation.getDate() - 14
);

//====================================
// Masa subur
// 5 hari sebelum ovulasi
// hingga
// 1 hari sesudah ovulasi
//====================================

const fertileStart = new Date(ovulation);

fertileStart.setDate(
fertileStart.getDate() - 5
);

const fertileEnd = new Date(ovulation);

fertileEnd.setDate(
fertileEnd.getDate() + 1
);

//====================================
// Tampilkan hasil
//====================================

document.getElementById("nextPeriod").innerHTML =
formatDate(nextPeriod);

document.getElementById("ovulation").innerHTML =
formatDate(ovulation);

document.getElementById("fertileWindow").innerHTML =
formatDate(fertileStart)
+
"<br> s.d. <br>"
+
formatDate(fertileEnd);

// ==========================
// TAMBAHAN KALENDER
// ==========================

nextPeriodDate = nextPeriod;
ovulationDate = ovulation;
fertileStartDate = fertileStart;
fertileEndDate = fertileEnd;

currentMonth = nextPeriod.getMonth();
currentYear = nextPeriod.getFullYear();

drawCalendar(currentMonth, currentYear);

document.getElementById("calendarSection").style.display = "block";

//====================================
// Tampilkan card hasil
//====================================

document.getElementById("resultSection").style.display =
"block";

// Scroll ke hasil

document.getElementById("resultSection")
.scrollIntoView({

behavior:"smooth"

});

}

//====================================
// TAMPILKAN TIPS & DISCLAIMER
//====================================

document.getElementById("tipsSection").style.display = "block";

document.getElementById("disclaimerSection").style.display = "block";

document.getElementById("resetSection").style.display = "block";


//====================================
// RESET
//====================================

document.getElementById("resetBtn").addEventListener("click", ()=>{

document.getElementById("lastPeriod").value="";

document.getElementById("cycleLength").value=28;

document.getElementById("resultSection").style.display="none";

document.getElementById("tipsSection").style.display="none";

document.getElementById("disclaimerSection").style.display="none";

document.getElementById("resetSection").style.display="none";

window.scrollTo({

top:0,

behavior:"smooth"

});

});

function drawCalendar(month, year){

const months=[
"Januari","Februari","Maret","April","Mei","Juni",
"Juli","Agustus","September","Oktober","November","Desember"
];

document.getElementById("calendarTitle").innerHTML=
months[month]+" "+year;

const tbody=document.getElementById("calendarBody");

tbody.innerHTML="";

const firstDay=(new Date(year,month,1).getDay()+6)%7;

const days=new Date(year,month+1,0).getDate();

let row=document.createElement("tr");

for(let i=0;i<firstDay;i++){

row.innerHTML+="<td></td>";

}

for(let day=1;day<=days;day++){

const td=document.createElement("td");

td.innerHTML=day;

const d=new Date(year,month,day);

if(isSameDate(d,nextPeriodDate)){

td.className="calendar-menstruation";
td.innerHTML="🩸<br>"+day;

}

if(d>=fertileStartDate && d<=fertileEndDate){

td.className="calendar-fertile";
td.innerHTML="🌱<br>"+day;

}

if(isSameDate(d,ovulationDate)){

td.className="calendar-ovulation";
td.innerHTML="🥚<br>"+day;

}

row.appendChild(td);

if((firstDay+day)%7===0){

tbody.appendChild(row);

row=document.createElement("tr");

}

}

while(row.children.length<7){

row.innerHTML+="<td></td>";

}

tbody.appendChild(row);

}

function isSameDate(a,b){

return a &&
b &&
a.getDate()==b.getDate() &&
a.getMonth()==b.getMonth() &&
a.getFullYear()==b.getFullYear();

}

document.getElementById("prevMonth").onclick=function(){

currentMonth--;

if(currentMonth<0){

currentMonth=11;

currentYear--;

}

drawCalendar(currentMonth,currentYear);

};

document.getElementById("nextMonth").onclick=function(){

currentMonth++;

if(currentMonth>11){

currentMonth=0;

currentYear++;

}

drawCalendar(currentMonth,currentYear);

};