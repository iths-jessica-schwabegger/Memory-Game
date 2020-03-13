
//localStorage.clear();
function showCards () {
    randomCards();

    const cards = document.querySelectorAll(".parent article");
    let cardsToCheck = [];
    let noMatch = [];
    let pairs = [];
    let turns = 0;
    let timer;
    let seconds = 0;


    for(let card of cards) {
        const icon = card.querySelector(".material-icons");

        card.addEventListener("click", () => {

            if(noMatch.length >= 2) {
                for(let item of noMatch) {
                    item.classList.add("hide");
                    item.children[0].classList.add("hidden");
                    item.classList.remove("disabled");
                }
            }
            noMatch = [];
 
            card.classList.remove("hide");
            card.classList.add("disabled");
            icon.classList.remove("hidden");

            cardsToCheck.push(card);

            if (cardsToCheck.length == 2) {
                if (cardsToCheck[0].children[0].innerText == cardsToCheck[1].children[0].innerText) {
                    pairs.push(cardsToCheck[0], cardsToCheck[1]);
                    let color = randomColor();
                    cardsToCheck[0].style.backgroundColor = color;
                    cardsToCheck[1].style.backgroundColor = color;


                }else {
                    noMatch.push(cardsToCheck[0], cardsToCheck[1]);
            }
            turns++;

            if(turns == 1) {
                timer = setInterval(function() {
                    seconds++;

                }, 1000);
            }
            cardsToCheck = [];
            }

            if (pairs.length == cards.length) {
                alertWinner();
                myTurns(turns);
                clearInterval(timer);
                myTime(seconds);
                console.log(seconds);
            }
        })
    }
}
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function myTurns(turns){
    const winnerSection = document.querySelector(".winner");
    const text = document.createElement("p");
    text.innerText = "You made " + turns + " moves!";
    winnerSection.append(text);
}

function myTime(time){
    const winnerSection = document.querySelector(".winner");
    const text = document.createElement("p");
    text.innerText = "Your time was " + time + " seconds!";

    let checkHighScore = currentHighScores(time);
    restartBtn = document.createElement("button");
    restartBtn.innerText = "Try again?";
    winnerSection.append(text, restartBtn);

    restartBtn.addEventListener("click", () => {
        window.location.reload();
    })
}

function alertWinner() {
    const div = document.querySelector(".root");
    const winnerSection = document.createElement("section");
    winnerSection.classList.add("winner");
    const title = document.createElement("h2");
    // const closeBtn = document.createElement("button");
    // closeBtn.innerText = "X";
    const titleSection = document.createElement("section");
    titleSection.style.display = "flex";
    titleSection.style.justifyContent = "center";
    title.innerText = "You are the winner!";

    titleSection.append(title);
    winnerSection.append(titleSection);
    div.append(winnerSection);

}

function storeHighScore(time, placing) {
    localStorage.setItem(placing, JSON.stringify(time));
    const data = JSON.parse(localStorage.getItem(time));
    console.log(data);
}

function currentHighScores(time) {

    let topThree;
    let highScores;
    if (localStorage.getItem("placing")) {
        highScores = JSON.parse(localStorage.getItem("placing"));
        console.log(highScores);
        }
        else {
        highScores = [10000, 10000, 10000];
        }

    if (time < highScores[0]) {
        highScores[2] = highScores[1];
        highScores[1] = highScores[0];
        highScores[0] = time;
    } else if (time < highScores[1]) {
        highScores[2] = highScores[1];
        highScores[1] = time;

    } else if (time < highScores[2]) {
        highScores[2] = time;
    }

    topThree = [highScores[0], highScores[1], highScores[2]];
    storeHighScore(topThree, "placing");
    return topThree;
}

function highScoreBox() {
    const scoreBtn = document.querySelector(".highscores p");
    const div = document.querySelector(".root");
    const scoreSection = document.createElement("section");
    scoreSection.classList.add("score-section", "display-none");
    div.append(scoreSection);

    scoreBtn.addEventListener("click", () => {
        scoreSection.classList.toggle("display-none");
        if(scoreSection.classList.length != 2) {
            scoreSection.innerHTML = "";
            renderHighScores();
        }
    })
}

function renderHighScores() {
    let bestHighScore = JSON.parse(localStorage.getItem("placing"));
    const scoreSection = document.querySelector(".score-section");
    const ul = document.createElement("ul");
    scoreSection.append(ul);

    if(!localStorage.getItem("placing")) {
        const message = document.createElement("p");
        scoreSection.append(message);
        message.innerText = "There are no current highscores. It is time for you to play!";
    }else {
    for (let time of bestHighScore) {
        const li = document.createElement("li");
        ul.append(li);
        li.innerText = "Username: " + time + " seconds!";
    }

    }
}

function randomCards () {
    let parent = document.querySelector(".parent");

    for (let i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}

showCards();
highScoreBox();
//alertWinner();

