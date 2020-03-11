
function showCards () {
    randomCards();

    const cards = document.querySelectorAll(".parent article");
    let cardsToCheck = [];
    let noMatch = [];
    let pairs = [];
    let turns = 0;
    let timer;
    let second = 0;

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
                    console.log("jaaaa");
                    pairs.push(cardsToCheck[0], cardsToCheck[1]);

                }else {
                    console.log("nope");
                    noMatch.push(cardsToCheck[0], cardsToCheck[1]);
            }
            turns++;
            console.log(turns);

            if(turns == 1) {
                timer = setInterval(function() {
                    second++;

                }, 1000);
            }
            cardsToCheck = [];
            }


            if (pairs.length == cards.length) {
                
                alertWinner();
                myTurns(turns);
                clearInterval(timer);
                myTime(second);
                console.log(second);
                
            }

        })

    }
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
    winnerSection.append(text);
}

function alertWinner() {
    const div = document.querySelector(".root");
    const winnerSection = document.createElement("section");
    winnerSection.classList.add("winner");
    const title = document.createElement("h2");
    const titleSection = document.createElement("section");
    titleSection.style.display = "flex";
    titleSection.style.justifyContent = "center";

    title.innerText = "You are the winner!";
    titleSection.append(title);
    winnerSection.append(titleSection);
    div.append(winnerSection);

}

function randomCards () {
    let parent = document.querySelector(".parent");

    for (i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}


showCards();
//alertWinner();


//Jämför två kort. noMatch? = Ge korten klassen hide och lägg i ny array.
// Match? = Lägg korten i ny array "Pairs".
//High-Score, 5 snabbaste tiderna? lägg in på local storage.

