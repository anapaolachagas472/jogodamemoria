document.getElementById('start-button').addEventListener('click', startGame);

        const themes = {
            animals: {
                images: [
                    './img/cachorro.png', 
                    './img/calopisita.png', 
                    './img/coelho.png', 
                    './img/cordeiro.png', 
                    './img/coruja.png', 
                    './img/gato.png', 
                    './img/panda.png',
                    './img/pinguin.png',
                    './img/raposa.png',
                    './img/tucano.png'
                ],
                backgroundColor: '#F2F2F2'
            },
            fruits: {
                images: [
                    'img/apple.jpg', 'img/orange.jpg', 'img/banana.jpg', 'img/watermelon.jpg', 'img/grape.jpg', 
                    'img/strawberry.jpg', 'img/cherry.jpg', 'img/pineapple.jpg', 'img/mango.jpg', 'img/peach.jpg'
                ],
                backgroundColor: '#FFD3C0' 
            },
            vehicles: {
                images: [
                    'img/car.jpg', 'img/taxi.jpg', 'img/suv.jpg', 'img/bus.jpg', 'img/tram.jpg', 
                    'img/racecar.jpg', 'img/policecar.jpg', 'img/ambulance.jpg', 'img/tractor.jpg', 'img/firetruck.jpg'
                ],
                backgroundColor: '#BCE5FF' 
            }
        };

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let matchCount = 0;

        function startGame() {
            const theme = document.getElementById('theme').value;
            const selectedTheme = themes[theme];
            const images = [...selectedTheme.images, ...selectedTheme.images]; // 10 pairs, 20 cards total
            images.sort(() => 0.5 - Math.random());

            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';
            images.forEach(image => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `<img src="${image}" alt="card image" class="card-image">`;
                card.addEventListener('click', flipCard);
                gameBoard.appendChild(card);
            });

            document.body.style.backgroundColor = selectedTheme.backgroundColor; // Mudando a cor de fundo da página de acordo com o tema

            resetBoard();
            matchCount = 0;
        }

        function flipCard() {
            if (lockBoard || this === firstCard) return;
        
            this.classList.add('flipped');
        
            if (!firstCard) {
                firstCard = this;
                return;
            }
        
            secondCard = this;
            checkForMatch();
        }
        
        function checkForMatch() {
            const isMatch = firstCard.querySelector('.card-image').src === secondCard.querySelector('.card-image').src;
            isMatch ? disableCards() : unflipCards();
        }
        
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
            matchCount++;
            if (matchCount === themes[document.getElementById('theme').value].images.length) {
                setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
            }
        }
        
        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
        
        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }
        