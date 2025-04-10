const cards = document.querySelectorAll('.card');
const cardContent = ['🍔', '🍔', '❤️', '❤️', '🍀', '🍀', '🚗', '🚗', '🌈', '🌈', '⭐', '⭐', '🐬', '🐬', '⚽️', '⚽️'];
const shuffledContent = cardContent.sort((a, b) => Math.random() - 0.5);
const resetButton = document.querySelector('.restBtn');


let firstCardElement = null;
let firstCardContent = null;
let secondCardElement = null;
let secondCardContent = null;
let lockboard = false;

function resetGame() {
    location.reload();
}


cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        if( lockboard || card.innerHTML != "?"){ return }
        
        card.innerHTML = shuffledContent[idx];
        
        if (firstCardContent === null) {
            firstCardContent = shuffledContent[idx];
            firstCardElement = card;
        }
        else {
            secondCardContent = shuffledContent[idx];
            secondCardElement = card;
        }
        console.log(firstCardContent, secondCardContent);

        if (firstCardContent != null && secondCardContent != null) {
            lockboard = true;
            if (firstCardContent != secondCardContent) {
                firstCardContent = null;
                secondCardContent = null;
                setTimeout(() => {
                    firstCardElement.innerHTML = "?";
                    secondCardElement.innerHTML = "?";
                    lockboard = false;
                }, 500)
                
            }
            else if(firstCardContent === secondCardContent){
                firstCardContent = null;
                secondCardContent = null;
                setTimeout(() => {
                    firstCardElement.style.backgroundColor="green"
                    secondCardElement.style.backgroundColor="green"
                    lockboard = false;
                }, 100);
            }
        }

    })
})


