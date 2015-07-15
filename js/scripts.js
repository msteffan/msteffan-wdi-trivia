////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// click events
$(document).ready(function() {
    $('a').smoothScroll();
    $(this).scrollTop(0);
});
if($(window).width() <= 1050){
  alert("Yike—your browswer screen is awfully small! For the best experience, expand the browser to full screen!")
}

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

function startGame(){
    trivia.timer.increment();
    trivia.playGame.showQuestion(sourceQ)
//When a player answers a question
    $("#playerInput").on("keypress", function(e){
        if(e.which === 13){
            trivia.playGame.checkAnswer(sourceQ, sourceA);
        }
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game play functions


var currentGuess;
var interval;
var answers;
var trivia = {
    num: 0,
// controls the game timer
    timer: {
        seconds: 90,
        newTime: 0,
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
            if(numRemaining<0){
                $(".numQuestionsLeft").html("Game is over!");
            }
        }
    },
// questions for the game--Seattle & DC categories
    questions: {
        Seattle: [
            "Ready to play? Type 'y' to begin. Remember: Spelling and capitalization count!",
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
            "What is the only Seattle mens' pro sports team to win a championship?",
            "True or false: More than 1 million people live in Seattle.",
            "What flag flies atop the Space Needle during the NFL season?",
            "Bill Gates founded which software giant located in the Seattle area?",
            "Which Fortune 500 company is the largest Seattle-area employer?"
        ],
        DC: [
            "Ready to play? Type 'y' to begin. Remember: Spelling and capitalization count!",
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
    // yes, you must have the exact right answer to get the point. The world needs more people who use correct capitalization.
    answers: {
        Seattle:
            ["y", "pike place","columbia center","greenlake", "mount rainier", "true", "true", "fremont troll", "uw", "false", "hempfest", "starbucks","seahawks", "false", "12th man", "microsoft", "boeing"],
        DC: ["y","metro", "union station", "false", "states", "false", "false", "36", "washington monument", "true", "wizards", "muriel bowser", "russell", "true", "air and space", "true"]
    },
    // functions called in order to play the game
    playGame: {
        checkAnswer: function checkAnswer(question, answer) {
            var sourceA = answer;
            var sourceQ = question;
            event.preventDefault();
            //get the player's guess
            currentGuess = $("#playerInput").val();
            if (currentGuess == sourceA[trivia.num])
                trivia.qCounter.addCorrect();
            // hides prev questions and displays the next question
            trivia.playGame.displayAnswers(sourceA);
            trivia.num++
            //display next question
            // check = localStorage.getItem("isItTwoPlayers");
            // if(check==="yes"){
            //     trivia.playGame.compareScores();
            // }
            trivia.playGame.showQuestion(sourceQ);
            // decrease numQuestionsLeft by one
            trivia.qCounter.getTotal();
            //resets input box to empty
            $("#playerInput").val("");


        },
        // add a new row to the table show the correct answer and the user's answer
        displayAnswers: function displayAnswers(sourceA) {
            $(".showAnswers").append("<tr class='answersRow'></tr>");
            if(trivia.num!==0){
                $(".answersRow").last().append("<td>"+ currentGuess + "</td>")
                $(".answersRow").last().append("<td>"+ sourceA[trivia.num]+"</td>")
            }
        },
        // display the next question
        showQuestion: function showQuestion(sourceQ) {
            // if the final question was answered, tell the player how many he/she got correct
            answers = trivia.qCounter.numCorrect - 1;
            check = sessionStorage.getItem("isItTwoPlayers");
            if(trivia.num+1 > $(sourceQ).length && check==="yes"){
                trivia.playGame.compareScores();
            } else if (trivia.num+1 > $(sourceQ).length){
                $("h4.question").html("You answered "+ answers + " out of 15 questions correctly! Scroll down to see how your knowledge stacks up!");
                // stop the timer after the final question is answered
                trivia.timer.stopTimer();
            } else {
                $("h4.question").html(sourceQ[trivia.num])
            }
        },
        // resets the game page on click
        resetGame: function resetGame() {
            // go to the top
            function goUp(){
                $('a').smoothScroll();
            }
            // reload the page
            location.reload();
        },
        // sets up two player game
        twoPlayerMode: function twoPlayerMode(){
            //store the first score
            var secondPlayer = "yes";
            var playerOne = answers;
            sessionStorage.setItem("isItTwoPlayers", secondPlayer);
            sessionStorage.setItem("playerOneScore", playerOne);
            // reload the page
            trivia.playGame.resetGame();
        },
        compareScores: function compareScores(){
            // get the first score
            firstScore = parseInt(sessionStorage.getItem("playerOneScore"));
            // play a second  game
            playerTwo = answers;
            // compare the second score to the first
            if(firstScore > playerTwo){
                $("h4.question").html("Player one wins! Player one answered "+ firstScore + " out of 15 questions correctly! Player two answered "+playerTwo+".");
            } else {
                $("h4.question").html("Player two wins! Player two answered "+ playerTwo + " out of 15 questions correctly! Player one answered "+firstScore+".");

            }
            sessionStorage.removeItem("playerOneScore")
            sessionStorage.removeItem("isItTwoPlayers")
        }

    }
}
