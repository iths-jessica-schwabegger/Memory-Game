
function showCards () {
    randomCards();

    const cards = document.querySelectorAll(".parent article");
    let cardsToCheck = [];
    // let pairs = [];
    let noMatch = [];


    for(let card of cards) {
        const icon = card.querySelector(".material-icons");

        card.addEventListener("click", () => {

            console.log(noMatch);

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
                    // match();

                }else {
                    console.log("nope");
                    noMatch.push(cardsToCheck[0], cardsToCheck[1]);

            }
            cardsToCheck = [];
           
            }

        })
    }
}

function randomCards () {
    let parent = document.querySelector(".parent");

    for (i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}


function noMatch(cards) {
    // cards[0].classList.add("hide");
    // cards[1].classList.add("hide");
}

showCards();


//Jämför två kort. noMatch? = Ge korten klassen hide och lägg i ny array.
// Match? = Lägg korten i ny array "Pairs".
