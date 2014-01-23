$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}

	
	//shuffle the deck

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var newDeck = shuffle(deck);
	
	var cards_player_1 = [];
	var cards_player_2 = [];

	//divide out the cards into the two arrays
	for(i=0; i<newDeck.length; i++){
        if(i <= 25){
            cards_player_1.push(newDeck[i]);
        }else{
            cards_player_2.push(newDeck[i]);
        }
    }


	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(card1, card2) {
        if(card1.number > card2.number){
            return card1;
        }else if(card2.number > card1.number){
            return card2;
        }else if(card1.number === card2.number){
            return false;
        }
	}

	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var winningCard = war(cards_player_1[0],cards_player_2[0]);
        if(winningCard === false){
            var card1_4 = cards_player_1[3];
            var card2_4 = cards_player_2[3];
            $("#opp-card").html(convert_value_to_string(card1_4.number)+" "+card1_4.suit);
            $("#my-card").html(convert_value_to_string(card2_4.number)+" "+card2_4.suit);

            if(card1_4 > card2_4){
                var wonCards = cards_player_2.splice(0,4);
                var firstCard = cards_player_1.shift();
                cards_player_1.push(wonCards);
                cards_player_1.push(firstCard);
                cards_player_1.push(cards_player_2[0]);
                cards_player_2.splice(0,1);
                advance();
            }else{
                var wonCards = cards_player_1.splice(0,4);
                var firstCard = cards_player_2.shift();
                cards_player_2.push(wonCards);
                cards_player_2.push(firstCard);
                cards_player_2.push(cards_player_1[0]);
                cards_player_1.splice(0,1);

                advance();
            }
        }
        if(winningCard === cards_player_1[0] && winningCard != false){
            var firstCard = cards_player_1.shift();
            cards_player_1.push(firstCard);
            cards_player_1.push(cards_player_2[0]);
            cards_player_2.splice(0,1);

            advance();
        }else if(winningCard === cards_player_2[0] && winningCard != false){
            var firstCard = cards_player_2.shift();
            cards_player_2.push(firstCard);
            cards_player_2.push(cards_player_1[0]);
            cards_player_1.splice(0,1);

            advance();
        }

		//this function (defined below) will continue to the next turn

	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});