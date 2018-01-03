var deck = new Deck();
var player1 = new Player();
var comp = new Comp();

function main(){
  const b = document.querySelector(".playBtn");
  b.addEventListener('click', function click(evt) {
    var f = document.querySelector(".valuesform");
   evt.preventDefault();
   console.log(f)
   f.classList.add("disappear")
   var sValues = f.elements['startValues'].value;
   sValues = sValues.split(",")
   console.log(sValues);
   shuffle();
   dealDeck(sValues)
   checkScore()
   const h = document.querySelector("#HitButton");
   const s = document.querySelector("#StandButton");
   h.addEventListener('click', function click(evt) {
        hit();
        checkScore()
     });
   s.addEventListener('click', function click(evt) {
          console.log("STAND WORKS")
          stand();
          checkScore()
       });
  });
}
Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

function dealDeck(sValues)
{
  for(var j = sValues.length-1; j >= 0; j--){
    for(var i = 0; i < deck.cards.length; i++){
     if (deck.cards[i].name === sValues[j]) {
       console.log("Deck Length: "+ deck.cards[i].name);
       var a = deck.cards.splice(i,1);
        deck.cards.unshift(a[0]);
        break;
     }
    }
   }
	for(var i = 0; i < 2; i++){
    comp.addCard();
    player1.addCard();
    console.log("PLAYER: "+JSON.stringify(player1.cards));
    console.log("COMP: "+JSON.stringify(comp.cards));
  }
  var Phead = document.createElement("h2");
  Phead.innerHTML = "Player Hand - Total: "+player1.cards.sum("value");
  Phead.id = "player"
  document.getElementById("userhand").appendChild(Phead);
  var Chead = document.createElement("h2");
  Chead.innerHTML = "Computer Hand - Total:?";
  Chead.id = "CPU"
  document.getElementById("comphand").appendChild(Chead);
  var hit = document.createElement("button");
  var stand = document.createElement("button");
  hit.type = "button"
  hit.id ="HitButton"
  stand.type = "button"
  stand.id = "StandButton"
  hit.innerHTML="HIT"
  stand.innerHTML="STAND"
  document.getElementById("user").appendChild(hit);
  document.getElementById("user").appendChild(stand);
  for(var i = 0; i < player1.cards.length; i++){
    console.log("PLAYER: "+JSON.stringify(player1.cards))
    console.log("COMP: "+JSON.stringify(comp.cards))
		var Pcard = document.createElement("div");
		var Pvalue = document.createElement("p");
		Pcard.className = "card suit" + player1.cards[i].suit;
		Pvalue.innerHTML = player1.cards[i].name;
    Pcard.appendChild(Pvalue);
    document.getElementById("userhand").appendChild(Pcard);
  }
  for(var i = 0; i < comp.cards.length; i++){
    var Ccard = document.createElement("div");
		var Cvalue = document.createElement("p");
    if(i==0){
      Ccard.style.backgroundImage="url(../public/img/cardback.png)";
      Ccard.className = "card";
      Cvalue.innerHTML = comp.cards[i].name;
      Cvalue.style.visibility ="hidden";
      Ccard.id = "first";
      Cvalue.id = "firstV";
      Ccard.appendChild(Cvalue);
    }
    else{
      Ccard.className = "card suit" + comp.cards[i].suit;
      Cvalue.innerHTML = comp.cards[i].name;
      Ccard.appendChild(Cvalue);
    }
	 document.getElementById("comphand").appendChild(Ccard);
	}
}

function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function Player() {
    //this.name;
    this.cards = [];
    this.turn = true;
}

function Comp() {
    //this.name;
    this.cards = [];
    this.turn = false;
}



function shuffle()
{
	for (var i = 0; i < 1000; i++)
	{
		var loc1 = Math.floor((Math.random() * deck.cards.length));
		var loc2 = Math.floor((Math.random() * deck.cards.length));
		var tmp = deck.cards[loc1];

		deck.cards[loc1] = deck.cards[loc2];
		deck.cards[loc2] = tmp;
	}
}

Deck.prototype.getCard = function () {
  if (this.cards.length == deck.cardsDrawn) {
    return null;
  }
  console.log("CARDS: "+JSON.stringify(this.cards));
  var temp = this.cards.shift();
  this.cardsDrawn++;
  console.log("CARDS5: "+JSON.stringify(temp));
  return temp;
};

Player.prototype.addCard = function () {
    this.cards.push(deck.getCard());
    // var Ncard = document.createElement("div");
    // var Nvalue = document.createElement("p");
    // Ncard.className = "card suit" + player1.cards[this.cards.length-1].suit;
    // Nvalue.innerHTML = player1.cards[this.cards.length-1].name;
    // Ncard.appendChild(Nvalue);
    // document.getElementById("userhand").appendChild(Ncard);
};

Player.prototype.score = function () {
    return this.cards.sum("value")
};

Comp.prototype.score = function () {
    return this.cards.sum("value")
};

Comp.prototype.addCard = function () {
    this.cards.push(deck.getCard());
};
function checkScore(){
  console.log("Player: "+player1.turn);
  console.log("CPU: "+comp.turn);
  console.log("Player S: "+player1.score());
  console.log("CPU S: "+comp.score());
  console.log("DECK1: "+JSON.stringify(player1.cards));
  console.log("DECK2: "+JSON.stringify(comp.cards));
  console.log("Firtst: "+JSON.stringify(comp.cards[0].name));
  var Chead = document.getElementById("CPU")
  var r = document.getElementById("result")
  if (comp.score() == 21) {
      console.log("BLACK JACK!!! THE COMPUTER WON!!!!")
      var f = document.getElementById("first");
      var p = document.getElementById("firstV");
      f.style.backgroundImage = '';
      f.className = "card suit" + comp.cards[0].suit;

      Chead.innerHTML = "Computer Hand - Total: "+comp.score();
  }
  else if (player1.score() == 21) {
      console.log("BLACK JACK!!! YOU WON!!!!")
      var Chead = document.getElementById("CPU")
      var f = document.getElementById("first")
      var p = document.getElementById("firstV");
      f.style.backgroundImage = '';
      f.className = "card suit" + comp.cards[0].suit;
      Chead.innerHTML = "Computer Hand - Total: "+comp.score();
      r.innerHTML = "BLACK JACK!!! YOU WON!!!!";

  }
  else if (comp.score() > 21) {
    console.log("THE COMPUTER BUST!! YOU WON!!!!")
    var Chead = document.getElementById("CPU")
    var f = document.getElementById("first")
    var p = document.getElementById("firstV");
    f.style.backgroundImage = '';
    f.className = "card suit" + comp.cards[0].suit;
    Chead.innerHTML = "Computer Hand - Total: "+comp.score();
    r.innerHTML = "THE COMPUTER BUST!! YOU WON!!!!"

  }
  else if (player1.score() > 21) {
    console.log("YOU BUST!! THE COMPUTER WON!!")
    var Chead = document.getElementById("CPU")
    var f = document.getElementById("first");
    var p = document.getElementById("firstV");
    f.style.backgroundImage = '';
    f.className = "card suit" + comp.cards[0].suit;
    p.style.visibility ="visible";
    console.log("VL: "+comp.cards[0].value)
    Chead.innerHTML = "Computer Hand - Total: "+comp.score();
    r.innerHTML = "YOU BUST!! THE COMPUTER WON!!";

  }
  else if ((player1.turn == false && comp.turn == false)&&(player1.score() < 21 && comp.score() < 21)) {
      if(player1.score() > comp.score()){
        console.log("YOU WON!!!!")
        var Chead = document.getElementById("CPU")
        var f = document.getElementById("first");
        var p = document.getElementById("firstV")
        f.style.backgroundImage = '';
        f.className = "card suit" + comp.cards[0].suit;
        Chead.innerHTML = "Computer Hand - Total: "+comp.score();
        r.innerHTML = "YOU WON!!!!";

      }
      else if(comp.score() > player1.score()){
        console.log("CPU WON!!!!")
        var Chead = document.getElementById("CPU")
        var f = document.getElementById("first")
        var p = document.getElementById("firstV")
        f.style.backgroundImage = '';
        f.className = "card suit" + comp.cards[0].suit;
        Chead.innerHTML = "Computer Hand - Total: "+comp.score();
        r.innerHTML = "CPU WON!!!!";

      }

      else if(comp.score() > player1.score()){
        console.log("TIE")
        var Chead = document.getElementById("CPU")
        var f = document.getElementById("first");
        var p = document.getElementById("firstV");
        f.style.backgroundImage = '';
        f.className = "card suit" + comp.cards[0].suit;
        Chead.innerHTML = "Computer Hand - Total: "+comp.score();
        r.innerHTML = "TIE";
      }
   }
}
function hit(){
  if(player1.turn == true){
    console.log("Player Turn");
    player1.addCard();
    var Phead = document.getElementById("player")
    Phead.innerHTML = "Player Hand - Total: "+player1.cards.sum("value");
    console.log("DECK3: "+JSON.stringify(player1.cards));
    var Pcard = document.createElement("div");
    var Pvalue = document.createElement("p");
    Pcard.className = "card suit" + player1.cards[player1.cards.length-1].suit;
    Pvalue.innerHTML = player1.cards[player1.cards.length-1].name;
    Pcard.appendChild(Pvalue);
    document.getElementById("userhand").appendChild(Pcard);
  }
  if(comp.turn == true){
    console.log("Computer Turn");
    comp.addCard();
    // var Phead = document.getElementById("player")
    // Phead.innerHTML = "Player Hand - Total: "+player1.cards.sum("value");
    console.log("DECK3: "+JSON.stringify(comp.cards));
    var Ccard = document.createElement("div");
    var Cvalue = document.createElement("p");
    Ccard.className = "card suit" + comp.cards[comp.cards.length-1].suit;
    Cvalue.innerHTML = comp.cards[comp.cards.length-1].name;
    Ccard.appendChild(Cvalue);
    document.getElementById("comphand").appendChild(Ccard);
 }
}

function stand(){
  player1.turn = false;
  comp.turn = true;
  console.log("COMP SCORE:"+ comp.score())
  if(comp.score() <= 15){
    console.log("Computer Hits");
    hit()
    comp.turn = false;
    stand();
  }
  else {
    console.log("Computer Stands");
    comp.turn = false;
    checkScore();
  }
}


function Deck(){
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts','diamonds','spades','clubs'];
  this.cards = [];
  this.cardsDrawn = 0;
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            this.cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }
}




document.addEventListener('DOMContentLoaded', main);
