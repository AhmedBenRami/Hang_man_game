const hangManDOll = {
    ground: '<path stroke="#000" id="svg_1" d="m18,583l155.99999,0" opacity="undefined" stroke-linecap="undefined" stroke-linejoin="undefined" stroke-width="6" fill="none" />',
    support: '<line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="75.99999" x2="93" y1="584" x1="94" stroke-width="6" fill="none" />',
    roof: '<line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="78" x2="327.99999" y1="79" x1="94" stroke-width="6" fill="none" />',
    rope: '<line stroke-linecap="round" stroke-linejoin="round" id="svg_5" y2="138" x2="325" y1="78" x1="325" stroke-width="6" stroke="#000" fill="none" />',
    head: '<ellipse ry="26" rx="25" id="svg_6" cy="166" cx="325" stroke-width="6" stroke="#000" fill="none" />',
    body: '<line id="svg_8" y2="331" x2="326" y1="193" x1="325" stroke-width="6" stroke="#000" fill="none" />',
    arms: '<path id="svg_9" d="m327,241l78,-46" opacity="undefined" stroke-width="6" stroke="#000" fill="none"/><path transform="rotate(62 286.617 217.637)" id="svg_11" d="m247.61723,240.6369l78,-46" opacity="undefined" stroke-width="6" stroke="#000" fill="none"/>',
    legs: '<path transform="rotate(45 360.5 359.5)" id="svg_12" d="m314,360l93,-1" opacity="undefined" stroke-width="6" stroke="#000" fill="none"/><path transform="rotate(-45 292.5 360.5)" id="svg_13" d="m246,360l93,-1" opacity="undefined" stroke-width="6" stroke="#000" fill="#000"/> ',
};

let alpha = 0;
const words = ["Elephant", "Sunshine", "Bicycle", "Adventure", "Harmony", "Serendipity", "Wanderlust", "Tranquility", "Rainbow", "Delicious"];

let word = "";
let isGuessed = [];

function start() {
    document.querySelector("#score span").textContent = localStorage.getItem("score") || "??? (NEW)";
}

function generateKeyboardAndWord(buttonStart, keyboard = document.querySelector("#keyboard"), display = document.querySelector("#display")) {
    let alps = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    for (let i = 0; i < alps.length; i++) {
        keyboard.innerHTML += `<div class="letter centering" onclick="clickLetter('${alps[i]}', this)">${alps[i]}</div>`
    }
    document.body.removeChild(buttonStart.parentNode);

    word = words[parseInt(Math.random() * words.length)];
    word = word.toUpperCase();
    console.log(word);

    word.split('').forEach(function (ele) {
        display.innerHTML += `<span class="word centering ${ele}"></span>`;
    })

}

function clickLetter(letter, button) {
    let spanELes = document.querySelectorAll(`.${letter}`);
    if (word.includes(letter)) {
        spanELes.forEach(function (ele) {
            ele.innerHTML = letter;
            button.classList.add("checked");
        });
        button.onclick = function (event) { event.preventDefault() };
    } else {
        document.querySelector("g").innerHTML += hangManDOll[Object.keys(hangManDOll)[alpha]];
        alpha++;
    }

    isGuessed = isGuessed.concat(word.includes(letter));
    console.log(isGuessed);

    const truth = isGuessed.reduce((acc, ele) => {
        return (!ele) ? acc + !ele : acc;
    }, 0);
    if (truth === Object.keys(hangManDOll).length) {
        localStorage.setItem("score", `${parseInt(localStorage.getItem("score")) + 1 || 1}`);
        alert("Loose");
        location.reload();
    }
}