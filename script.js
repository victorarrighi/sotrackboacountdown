// script.js

const targetDate = new Date("2026-05-28T16:00:00-03:00");

const previousValues = {
    days: "",
    hours: "",
    minutes: "",
    seconds: ""
};

function animateChange(id, value){

    const container = document.getElementById(id);

    if(previousValues[id] === value) return;

    const current = container.querySelector(".current");

    const next = document.createElement("div");
    next.className = "digit enter";
    next.textContent = value;

    container.appendChild(next);

    requestAnimationFrame(() => {
        next.classList.add("enter-active");

        if(current){
            current.classList.add("exit-active");
        }
    });

    setTimeout(() => {

        if(current){
            current.remove();
        }

        next.classList.remove("enter");
        next.classList.remove("enter-active");
        next.classList.add("current");

    }, 550);

    previousValues[id] = value;
}

function updateCountdown(){

    const now = new Date();
    const difference = targetDate - now;

    if(difference <= 0){
        document.body.innerHTML =
        `<h1 style="
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh;
            background:black;
            color:white;
            font-family:sans-serif;">
            O EVENTO COMEÇOU 🍾
        </h1>`;
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    animateChange("days", String(days).padStart(2, "0"));
    animateChange("hours", String(hours).padStart(2, "0"));
    animateChange("minutes", String(minutes).padStart(2, "0"));
    animateChange("seconds", String(seconds).padStart(2, "0"));
}

updateCountdown();
setInterval(updateCountdown, 1000);
