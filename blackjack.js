const dealer = document.getElementById('dealer');
const player = document.getElementById('player');
const playerscore = document.getElementById('playerscore')
const dealerscore = document.getElementById('dealerscore')
const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
const ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king']
const deck = [];
const playerHand = []
const dealerHand = []
wasDealt = false


const deal = document.getElementById('deal');
deal.addEventListener('click', dealCard);

const hit = document.getElementById('hit');
hit.addEventListener('click', hitCard);

const stand = document.getElementById('stand');
stand.addEventListener('click', standCard);

const createDeck = () => {
    suits.forEach(suit => {
        ranks.forEach(rank => {
            if (rank ==='ace'){
                value = 11;
            }
            else if (rank ==='jack' || rank ==='queen' || rank ==='king') {
                value = 10;
            }
            else {
                value = rank;
            }
            deck.push({suit : suit, rank: rank, value: value, imgpath: `./assets/${rank}_of_${suit}.png` })
        })
    })
}

createDeck()

function dealCard() {
    if(wasDealt == false) {
        shuffle()

        hitDealer()
        setTimeout(hitPlayer, 1000)
        setTimeout(hitDealer, 2000)
        setTimeout(hitPlayer, 3000)

        if (handValue(playerHand) == 21 || handValue(dealerHand) == 21){
            alert('Blackjack!');
            setTimeout(endGame,2000);
        }

        wasDealt = true;
    }
}
function hitDealer() {
    newCard = document.createElement('img')
    newCard.src = deck[0].imgpath
    dealerHand.push(deck[0])
    deck.splice(0,1)
    dealer.append(newCard)
    dealerscore.innerText = `Dealer: ${handValue(dealerHand)}`;
    // console.log(dealerHand)
}

function hitPlayer() {
    newCard = document.createElement('img')
    newCard.src = deck[0].imgpath
    playerHand.push(deck[0])
    deck.splice(0,1)
    player.append(newCard)
    playerscore.innerText = `Player: ${handValue(playerHand)}`;
    // console.log(playerHand)

    if (handValue(playerHand) > 21) {
        playerHand.forEach(card => {
            if (card.rank == 'ace'){
                card.value = 1;
                playerscore.innerText = `Player: ${handValue(playerHand)}`;
            }
        })}
    if (handValue(playerHand) > 21){    
        console.log('player hand value: ' + handValue(playerHand));
        console.log('Player Busts!');
        // window.onload = function() {
            setTimeout(function () {
                alert("Player Busts!");
            },1000);
        
        standCard();
    }
}

function hitCard() {
    // setTimeout(hitDealer, 1000)
   
    hitPlayer()
}

function standCard() {

    for (handValue(dealerHand); handValue(dealerHand) < 17;) {
        hitDealer();
    }

    if (handValue(dealerHand) > 21) {
        dealerHand.forEach(card => {
            if (card.rank == 'ace'){
                card.value = 1;
                dealerscore.innerText = `Player: ${handValue(dealerHand)}`;
            }
        })}
    
    for (handValue(dealerHand); handValue(dealerHand) < 17;) {
        hitDealer();
    }

    if (handValue(dealerHand) > 21) {
        console.log('Dealer hand value: ' + handValue(dealerHand));
        console.log('Bust!');
        // window.onload = function() {
        setTimeout(function () {
            alert("Dealer Busts");
        },1000);
        setTimeout(endGame,1000);
    }

    else if (handValue(dealerHand) >= 17) {
        setTimeout(endGame,1000);
    }

}

function handValue(hand) {
    let value = 0;
    for (let i = 0; i < hand.length; i++) {
        value += hand[i].value
    }
    return value;
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        let x = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[x]
        deck[x] = temp
    }
}

function endGame() {
    if ((handValue(playerHand) > 21 && handValue(dealerHand) > 21) || handValue(playerHand) == handValue(dealerHand)) {
        console.log('Draw!');
        // window.onload = function() {
        alert("Draw!")
    }
    else if ((handValue(playerHand) > 21 && handValue(dealerHand) <= 21) || ((handValue(playerHand) < handValue(dealerHand)) && handValue(dealerHand) <= 21)) {
        console.log('Dealer wins!');
        // window.onload = function() {
        alert("Dealer Wins!")
        
    }
    else if ((handValue(playerHand) <= 21 && handValue(dealerHand)) || (handValue(playerHand) > handValue(dealerHand)) && handValue(playerHand) <= 21){
        console.log('Player wins!');
        // window.onload = function() {
        alert("Player Wins!");
    }


}