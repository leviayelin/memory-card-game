// Selectors Section 
// getting game board element
const gameBoard = document.querySelector('.board-game');
// getting reset button element 
const btnResetGame  = document.querySelector('.btn-reset-game');
// Symbols list - creating a list of images/icons/symbols
const symbols = ['🦊','🐶','🐸','🐔','🏠','🤖','👻','🛻'];
// Duplicate - creating another list set of the same list 
let cards = [...symbols,...symbols];
// Game variables - parameters 
let firstCard,secondCard; // card 1 , card 2
let lockBoard = false;
let matchedPairs = 0; // counter - indicator for matches 
let congrateGif = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMms2N3FsbWRtYXZmYTV4NzBoZTJtbDN1ejMyNWZuOXRzY3pnNTVieiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s2qXK8wAvkHTO/giphy.gif';

// Function section 
// Board game - adding cards 
const createBoard = () =>{
    gameBoard.innerHTML = '';
    cards.forEach(symbol =>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="front">${symbol}</div>
        <div class="back">❓</div>
        `;
        card.addEventListener('click',flipCard);
        gameBoard.appendChild(card);
    })
}

// Board game - cards, shuffle function 
const shuffle = (arr) =>{
    for(let i = arr.length - 1; i > 0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j] ]= [arr[j],arr[i]];
    };
};

// Creating card fliping function 
const flipCard = function(){
    // prevent double click 
    if(lockBoard)return;
    if(this === firstCard)return;
    // adding 'flip' element
    this.classList.add('flip');
    // condition - checkig whitch card fliped
    if(!firstCard){
        firstCard = this;
        return;
    };
    secondCard = this;
    // checking for match 
    checkForMatch();
};

// Check for match after flip 
const checkForMatch = () =>{
    const isMatch = firstCard.querySelector('.front').textContent ===
    secondCard.querySelector('.front').textContent;
    // condition - 
    // 1. if match do 
    // 2. if not match do
    if(isMatch){
        disableCards(); // disable matching cards
        matchedPairs++; // add 1 to counter
        // checking for wining condition
        if(matchedPairs === symbols.length){
           setTimeout(()=>{
                gameBoard.innerHTML = `
                <div class="winner">                
                    <img src='${congrate}'/>
                    <div>You Win!</div>
                </div>
                `;
           },500); 
        }
    }else{
        // if no match found, fliping the cards
        unflipCards();
    };
};

// Disabled cards when found match 
const disableCards = () =>{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTurn();
};

// Flip cards after no matched cards found
const unflipCards = () =>{
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
    },1000);
};

// Enable to keep fliping cards, when 
// match fund or not found
const resetTurn = () =>{
    [firstCard,secondCard,lockBoard] = 
    [null,null,false];
};

// Reset game board
btnResetGame.addEventListener('click',()=>{
    matchedPairs = 0;
    cards = [...symbols,...symbols];
    shuffle(cards);
    createBoard();
});

// running components
shuffle(cards);
createBoard();