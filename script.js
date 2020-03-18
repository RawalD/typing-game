const word = document.getElementById('word'),
    text = document.getElementById('text'),
    scoreEL = document.getElementById('score'),
    timeEL = document.getElementById('time'),
    endGameEL = document.getElementById('end-game-container'),
    settingsBtn = document.getElementById('settings-btn'),
    settings = document.getElementById('settings'),
    settingsForm = document.getElementById('settings-form'),
    difficultySelection = document.getElementById('difficulty');

    let words = ['DOG','CHANGE','SIGH','INDEPENDENT','SHIN','LOVING','TELEVISION','LAPTOP','CELLPHONE','WIRELESS','KITCHEN','SPOON'];

    let randomWord;

    let score = 0;

    let time = 10;

    let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

    difficultySelection.value =localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'): 'medium';

    //focus on text
    text.focus();

    //time var
    const timeInt = setInterval(updateTime, 1000);

    function getRandomWord(){
        return words[Math.floor(Math.random() * words.length)];
    }

    function addWordToDOM(){
        randomWord = getRandomWord();
        word.innerHTML = randomWord;
    }

    function updateScore(){
        score++;
        scoreEL.innerHTML = score;
    }

    function updateTime(){
       // console.log(1);
       time--;
       timeEL.innerHTML = `${time}s`;

       if(time === 0){
           clearInterval(timeInt);
           //end game
           gameOver();
       }
    }

    function gameOver(){
        endGameEL.innerHTML = `
        <h1>Time Up</h1>
        <p>Your Score Is : ${score}</p>
        <button onclick="location.reload()">Replay</button>
        `;
        endGameEL.style.display = 'flex';
    }

    addWordToDOM();
   // console.log(getRandomWord());
   
   
   //event listeners
    text.addEventListener('input', e => {
     const insertedText = e.target.value.toUpperCase();
        
    if (insertedText === randomWord) {
        //console.log(insertedText);
        addWordToDOM();
        updateScore();
        e.target.value = '';

        if(difficulty === 'easy'){
            time+=5;
        }else if(difficulty === 'medium'){
            time += 3;
        }
        else{
            time += 1;
        }


        updateTime();
    } else {
        console.log('no');
    }
 })

 //settings eventlisteners
 settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

 //settings select
 settingsForm.addEventListener('change',e => {
     difficulty = e.target.value;
    // console.log(difficulty);
    localStorage.setItem('difficulty', difficulty);
 })