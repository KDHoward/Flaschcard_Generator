 String.prototype.isEmpty = function() {// Returns if a string has only whitespace
            return (this.length === 0 || !this.trim());
        };

        function Card(front, back){
            /*A card is just a container that holds a front and back value! 
                - You can get either back or front by displaying it*/
            this.frontVal = front;
            this.backVal = back;

            this.display = function(side){
                if( side === 0 ){
                    return this.frontVal;
                }else{
                    return this.backVal;
                }
            };
        }

        var cardsHandle = {
            cards: [],
            cardInd: 0,
            cardButton: document.getElementById("cardButton"),
            cardText: document.getElementById("cardText"),
            cardTPosition: document.getElementById("positionIndex"),
            cardSide: 0,

            cardAdd: function(back, front){
                this.cards.push( new Card(back, front) );
            },
            cardUpdate: function(){
                var curCard = this.cards[ this.cardInd ];
                this.cardText.innerHTML = curCard.display( this.cardSide );
                this.cardTPosition.innerHTML = (this.cardInd+1)+"/"+this.cards.length;
            },
            cardFlip: function(){
                this.cardSide = (this.cardSide + 1) % 2;
            },
            cardMove: function(moveBy){
                this.cardInd += moveBy;
                if( this. cardInd < 0 ){
                    this.cardInd += this.cards.length;
                }
                this.cardInd = this.cardInd % this.cards.length;

                this.cardSide = 0;// Set back to front
                this.cardUpdate();
            },
            cardTap: function(){
                this.cardFlip();
                this.cardUpdate();// Display card
            }
        };

        cardsHandle.cardAdd("Hello or Good bye","Salut");
        cardsHandle.cardAdd("Hello or Good Morning","Bonjour");
        cardsHandle.cardAdd("Good Night","Bonne nuit!");
        cardsHandle.cardUpdate();

        var userEnter = function(){
            var nFront = document.getElementById("newFront"),
                nBack = document.getElementById("newBack");

            if( nFront.value.isEmpty() || nBack.value.isEmpty() )
                return;

            cardsHandle.cardAdd(nFront.value,nBack.value);
            nFront.value="";
            nBack.value="";
            cardsHandle.cardUpdate();
        }

        cardsHandle.cardButton.addEventListener('click', function(){ cardsHandle.cardTap();} );
