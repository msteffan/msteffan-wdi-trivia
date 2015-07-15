////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions on load
$(document).ready(function() {
    $('a').smoothScroll();
    $(this).scrollTop(0);
});
if($(window).width() <= 1050){
  alert("Yikes—your browswer screen is awfully small! For the best experience, expand the browser to full screen!")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// click events

$("#Seattle").on("click", function(){
    source = "Seattle";
    sourceQ = trivia.questions.Seattle;
    sourceA = trivia.answers.Seattle;
    startGame();
});
$("#DC").on("click", function(){
    source = "DC";
    sourceQ = trivia.questions.DC;
    sourceA = trivia.answers.DC;
    startGame();
});
$("#resetGame").on("click", function(){
    trivia.playGame.resetGame();
    });
$("#twoPlayer").on("click", function(){
    trivia.playGame.twoPlayerMode();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game play functions

// this function starts the game when a user clicks on a city div
function startGame(){
    // starts the timer
    trivia.timer.increment();
    // displays the first question
    trivia.playGame.showQuestion(sourceQ)
//When a player answers a question
    $("#playerInput").on("keypress", function(e){
        if(e.which === 13){
            trivia.playGame.checkAnswer(sourceQ, sourceA);
        }
    });
}
// global variables
var currentGuess;
var interval;
var answers;
var firstScore;
var playerTwo;
// object that controls everything else
var trivia = {
    num: 0,
// controls the game timer
    timer: {
        seconds: 300,
        newTime: 0,
        // starts the timer when invoked
        increment: function incrementTime() {
            interval = setInterval(function(){
                if(trivia.timer.seconds > 0){
                    trivia.timer.seconds--;
                    $("#timer").html(trivia.timer.seconds);
                } else {
                    trivia.timer.stopTimer();
                }
            }, 1000);
        },
        // stops the timer when invoked
        stopTimer: function stopTimer(){
            if(trivia.timer.seconds < 0){
                var prompt = confirm("You ran out of time! Play again?")
                if(prompt){
                    clearInterval(interval)
                    trivia.playGame.resetGame()
                } else {
                    clearInterval(interval)
                }
            } else {
                clearInterval(interval)
            }
        }
    },
// tracks how many questions are remaining in the game
    qCounter: {
        numCorrect: 0,
        totalQ: 16,
        numAsked: 0,
        // adds +1 to the correct answers box for every correct question
        addCorrect: function incrementQs(){
            trivia.qCounter.numCorrect++;
            var correctAnswers = trivia.qCounter.numCorrect - 1;
            $("p.correctAnswers").html(correctAnswers);
        },
        // subtracts -1 from the remaining questions for every question answered
        getTotal: function checkRemaining() {
            trivia.qCounter.numAsked++;
            var numRemaining = trivia.qCounter.totalQ - trivia.qCounter.numAsked;
            $(".numQuestionsLeft").html(numRemaining)
            // if the user answers all the questions, it displays that the game is over
            if(numRemaining<0){
                $(".numQuestionsLeft").html("Game is over!");
            }
        }
    },
// questions for the game--Seattle & DC categories
    questions: {
        Seattle: [
            "Ready to play? Type 'y' to begin. Don't capitalize your answers, and use correct spelling!",
            "What is the name of the large outdoor market in Seattle?",
            "What is the name of the tallest building in Seattle?",
            "What is the name of the large manmade lake in Seattle?",
            "What mountain is located just south of Seattle?",
            "True or false: When the Space Needle was built, it was the tallest building west of the Mississippi.",
            "True or false: Seattle's annual rainfall is less than that of Houston, Chicago and NYC.",
            "What creature lives under the Aurora Bridge?",
            "What major public university is based in Seattle?",
            "True or False: People in Seattle buy the fewest sunglasses per capita than any other U.S. city.",
            "Which annual marijuana festival is the largest 'Legalize It' gathering in the country?",
            "Which coffee giant is headquartered in Seattle?",
            "What is the only Seattle mens' pro sports team to win a championship in the last 10 years?",
            "True or false: More than 1 million people live in Seattle.",
            "What flag flies atop the Space Needle during the NFL season?",
            "Bill Gates founded which software giant located in the Seattle area?",
            "Which Fortune 500 company is the largest Seattle-area employer?"
        ],
        DC: [
            "Ready to play? Type 'y' to begin. Don't capitalize your answers, and use correct spelling!",
            "True or false: The city of D.C. is divided into quadrants, with the U.S. Capitol at the center.",
            "How do D.C. residents refer to the local rail system?",
            "What is most visited site in Washington, D.C.?",
            "True or false: The president lives at 1600 Pennsylvania Avenue, SW.",
            "In D.C., streets that run diagonally are named after what?",
            "True or false: The National Cherry Blossom Festival attracts 5 million people to D.C. each spring.",
            "True or false: The original Declaration of Independence is kept at the U.S. Capitol.",
            "How many columns does the Lincoln memorial have?",
            "Which is taller: the Washington Monument or the US Capitol?",
            "True or False: Georgetown University is older than the city of D.C.",
            "What is the name of the Washington D.C. NBA team?",
            "Who is the mayor of Washington D.C.?",
            "Which of the following is NOT a House office building: Russell, Rayburn or Longworth?",
            "True or false: D.C. residents consume more wine per capita than any other state.",
            "Which Smithsonian museum is the second-most visited museum in the world?",
            "True or false: When it was completed, the Washington Monument was the world's tallest structure."
        ]
    },
    // answers for the questions
    // yes, you must have the exact right answer to get the point. The world needs more people who use correct spelling.
    answers: {
        Seattle:
            ["y", "pike place","columbia center","green lake", "mount rainier", "true", "true", "fremont troll", "uw", "false", "hempfest", "starbucks","seahawks", "false", "12th man", "microsoft", "boeing"],
        DC: ["y","true", "metro", "union station", "false", "states", "false", "false", "36", "washington monument", "true", "wizards", "muriel bowser", "russell", "true", "air and space", "true"]
    },
    // functions called in order to play the game
    playGame: {
        // this is the main function that checks the player's answer against the value stored as the correct answer.
        checkAnswer: function checkAnswer(question, answer) {
            // pass in the right arrays for the answer, based on which category is being played
            var sourceA = answer;
            var sourceQ = question;
            event.preventDefault();
            //get the player's guess
            currentGuess = $("#playerInput").val();
            // if the player's guess matches the answer in the array, add 1 to the correct answers
            if (currentGuess == sourceA[trivia.num])
                trivia.qCounter.addCorrect();
            // after a question is answered, hide it and display the next question
            trivia.playGame.displayAnswers(sourceA);
            // add one to the game counter
            trivia.num++
            //display next question in the questions array
            trivia.playGame.showQuestion(sourceQ);
            // decrease numQuestionsLeft by one
            trivia.qCounter.getTotal();
            //resets input box to empty
            $("#playerInput").val("");
        },
        // add a new row to the table show the correct answer and the user's answer
        displayAnswers: function displayAnswers(sourceA) {
            $(".showAnswers").append("<tr class='answersRow'></tr>");
            // because the first answer is just the 'y' to start the game, I wanted to skip it and not add it to the table of answers. Thus: if the number != 0, add the player's guess and the corect answer to the table
            if(trivia.num!==0){
                $(".answersRow").last().append("<td>"+ currentGuess + "</td>")
                $(".answersRow").last().append("<td>"+ sourceA[trivia.num]+"</td>")
            }
        },
        // display the next question
        showQuestion: function showQuestion(sourceQ) {
            // set the number of correct answers as the current player's score
            answers = trivia.qCounter.numCorrect - 1;
            // get the value of "check" from session storage in order to see if this is a two-player game.
            check = sessionStorage.getItem("isItTwoPlayers");
            // if the final question was answered AND this is a two-player game, run the function to compare scores
            if(trivia.num+1 > $(sourceQ).length && check==="yes"){
                trivia.playGame.compareScores();
            // if the final question was answered, tell the player how many he/she got correct
            } else if (trivia.num+1 > $(sourceQ).length){
                $("h4.question").html("You answered "+ answers + " out of 16 questions correctly! Scroll down to see how your knowledge stacks up!");
                // stop the timer after the final question is answered
                trivia.timer.stopTimer();
            // if the player is not yet on the final question, display the next question
            } else {
                $("h4.question").html(sourceQ[trivia.num])
            }
        },
        // resets the game page on click
        resetGame: function resetGame() {
            // scroll to the top
            function goUp(){
                $('a').smoothScroll();
            }
            // reload the page
            location.reload();
        },
        // sets up two player game
        twoPlayerMode: function twoPlayerMode(){
            //store the first score in the browser storage, as well as a "check" value to indicate that this is a two-player game
            var secondPlayer = "yes";
            var playerOne = answers;
            sessionStorage.setItem("isItTwoPlayers", secondPlayer);
            sessionStorage.setItem("playerOneScore", playerOne);
            // reload the page
            trivia.playGame.resetGame();
        },
        // function that compares two scores if the final question is answered AND the two-player mode is running
        compareScores: function compareScores(){
            // get the first player's score from storage
            firstScore = parseInt(sessionStorage.getItem("playerOneScore"));
            // play a second  game
            playerTwo = answers;
            // compare the second score to the first and determine a winner
            if(firstScore > playerTwo){
                $("h4.question").html("Player one wins! Player one answered "+ firstScore + " out of 15 questions correctly! Player two answered "+playerTwo+".");
            } else if(firstScore < playerTwo)  {
                $("h4.question").html("Player two wins! Player two answered "+ playerTwo + " out of 15 questions correctly! Player one answered "+firstScore+".");

            } else {
                $("h4.question").html("It's a tie!");
            }
            // clear the storage
            sessionStorage.removeItem("playerOneScore")
            sessionStorage.removeItem("isItTwoPlayers")
        }

    }
}
