/*====================================
        HerTeen JAVASCRIPT
=====================================*/


/*=========================
Navbar Scroll
=========================*/

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");
        navbar.classList.add("shadow");

    } else {

        navbar.classList.remove("scrolled");
        navbar.classList.remove("shadow");

    }

});


/*=========================
Back To Top
=========================*/

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.onscroll=function(){

if(document.documentElement.scrollTop>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

}

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}


/*=========================
Progress Bar
=========================*/

const progress=document.createElement("div");

progress.id="progressBar";

document.body.prepend(progress);

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const percent=(scrollTop/height)*100;

progress.style.width=percent+"%";

});


/*=========================
Scroll Animation
=========================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});


/*=========================
Like Button
=========================*/

let like=0;

function likeMateri(){

like++;

document.getElementById("likeCount").innerHTML=like;

}


/*=========================
Dark Mode
=========================*/

function darkMode(){

document.body.classList.toggle("dark");

}


/*=========================
Loading Animation
=========================*/

window.onload=function(){

document.body.classList.add("loaded");

}