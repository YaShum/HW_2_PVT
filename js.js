var suit = {0: "♠", 1: "♣", 2: "♥", 3: "♦"};
var suit2 = {"♠": 's', "♣": 'c', "♥": 'h', "♦": 'd'};
var obj = {1: '6', 2: '7', 3: '8', 4: '9', 5: '10', 6: 'J', 7: 'Q', 8: 'K', 9: 'A'};
var obj2 = {'6': 1, '7': 2, '8': 3, '9': 4, '10': 5, 'J': 6, 'Q': 7, 'K': 8, 'A': 9};
var arrCard = [];
var arrSuit = [];
var arrResult = [];

for (var key in suit) {
    arrSuit.push(suit[key]);
}

for (var card in obj) {
    arrCard.push(obj[card]);
}

for (var i = 0; i < arrSuit.length; i++) {
    for (var j = 0; j < arrCard.length; j++) {
        obj = {};
        obj.suit = arrSuit[i];
        obj.num = arrCard[j];
        arrResult.push(obj);
    }
}
console.log(arrResult);

//random order
Array.prototype.shuffle = function () {
    return this.sort(function () {
        return 0.5 - Math.random();
    });
};

var arrColoda = arrResult.shuffle();

//divide into two parts
/*var handPetja = arrColoda.slice(0, 18);
var handVasja = arrColoda.slice(18, 36);*/

function partArray(arr, part) {
    var l, m, n = [];
    for (l = 0, m = arr.length; l < m; l += part) {
        n.push(arr.slice(l, l + part));
    }
    return n;
}

var allHand = partArray(arrColoda, 18);
var handPetja = allHand[0];
var handVasja = allHand[1];

//casual trump
console.log(arrSuit);
var randNum = Math.floor(Math.random() * arrSuit.length);
console.log(arrSuit[randNum]);

//start game
var text = '';
var PetjaPoint = VasjaPoint = 0;
for (i = 0; i < 18; i++) {
    var P = handPetja.pop();
    var V = handVasja.pop();
    if (P.suit == arrSuit[randNum] && V.suit == arrSuit[randNum]) {
        if (obj2[V.num] > obj2[P.num]) {
            VasjaPoint++;
        }
        else {
            PetjaPoint++;
        }
    }
    else if (P.suit == arrSuit[randNum]) {
        PetjaPoint++;
    }
    else if (V.suit == arrSuit[randNum]) {
        VasjaPoint++;
    }
    else if (obj2[V.num] > obj2[P.num]) {
        VasjaPoint++;
    }
    else if (obj2[V.num] < obj2[P.num]){
        PetjaPoint++;
    }
    else if (obj2[V.num] == obj2[P.num]){

    }
    text += ('<li><img src="img_cards/' + suit2[V.suit] + '_' + obj2[V.num] + '.png">' + VasjaPoint + '</li>' + '<li><img src="img_cards/' + suit2[P.suit] + '_' + obj2[P.num] + '.png">' + PetjaPoint + '</li>');
}

var b = document.getElementById("game");
b.innerHTML += text;

document.write("<h2>Козырная масть</h2>" + ' ' + '<span>' + arrSuit[randNum] + '</span>' + '<br>');

if (VasjaPoint > PetjaPoint) {
    document.write('<h2>Вася победил со счетом' + ' ' + VasjaPoint + '</h2>');
}
else {
    document.write('<h2>Петя победил со счетом' + ' ' + PetjaPoint + '</h2>');
}
