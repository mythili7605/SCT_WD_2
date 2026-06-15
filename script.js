let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("start").classList.add("active");
    }
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("start").classList.remove("active");
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    startTime = 0;
    lapCount = 0;
    display.innerHTML = '00:00<span class="milliseconds">.00</span>';
    laps.innerHTML = "";
    document.getElementById("start").classList.remove("active");
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

function formatTime(time) {
    let diffInMin = time / 60000;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = String(mm).padStart(2, "0");
    let formattedSS = String(ss).padStart(2, "0");
    let formattedMS = String(ms).padStart(2, "0");

    return `${formattedMM}:${formattedSS}<span class="milliseconds">.${formattedMS}</span>`;
}

function recordLap() {
    if (elapsedTime > 0) {
        lapCount++;
        const li = document.createElement("li");
        li.setAttribute("data-index", lapCount);
        
        // Inner content with lap time
        li.innerHTML = `<span>${formatTime(elapsedTime)}</span>`;
        laps.insertBefore(li, laps.firstChild);
        
        // Auto-scroll to top of laps list
        laps.scrollTop = 0;
    }
}

// Event Listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

// Initial Display state setup
display.innerHTML = '00:00<span class="milliseconds">.00</span>';