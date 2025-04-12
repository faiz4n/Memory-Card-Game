const cards = document.querySelectorAll('.card');
const cardContent = ['🍔', '🍔', '❤️', '❤️', '🎁','🎁', '🚗', '🚗', '🌈', '🌈', '⭐', '⭐', '🐬', '🐬', '⚽️', '⚽️'];
const shuffledContent = cardContent.sort((a, b) => Math.random() - 0.5);
const resetButton = document.querySelector('.restBtn');
const flipCount = document.querySelector('.flips');
const timer = document.querySelector('.timer');


let firstCardElement = null;
let firstCardContent = null;
let secondCardElement = null;
let secondCardContent = null;
let flips = 0;
let time = 60;
let lockboard = false;
let WinStatus = false;

const countdown = setInterval(() => {
    time -= 1;
    timer.innerHTML = time;

    if(time <= 0){
        clearInterval(countdown);
        setTimeout(() => {
            alert("Time's Up!");
        }, 100)
    }
}, 1000);



function resetGame() {
    location.reload();
}



function checkWin(){
    const checkCards = [...cards].every((card) =>
        card.classList.contains('cardMatched')
    )
    if(checkCards){
        clearInterval(countdown)
        alert("YOU WIN!");
    }
}


cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        if( lockboard || card.innerHTML != "?" || time <= 0){ return }
        flips += 1;
        flipCount.innerHTML = flips;
        
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
                }, 350)
                
            }
            else if(firstCardContent === secondCardContent){
                firstCardContent = null;
                secondCardContent = null;
                    firstCardElement.classList.add('cardMatched');
                    secondCardElement.classList.add('cardMatched');
                    lockboard = false;
                    setTimeout(() => checkWin(), 50)

            }
        }
        
        
    })
})



