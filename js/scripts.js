//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// two player mode
//
// set up button that, on click, allows you to:
    // click which city to play
    // play one game
    // save the score
    // play a second  game

    // compare the second score to the first
    // determine whose score was higher
    // display who won
    $(document).ready(function() {

          $('a').smoothScroll();
          $(this).scrollTop(0);
            });


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

function startGame(){
    if(source==="Seattle"){
        var photo = "images/Seattle-left.jpg";
    } else {
        var photo = "images/DC_right.jpg";
    }
    $("#gamePlay").css("background", "url("+ photo+ ") no-repeat center fixed")
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
            "Ready to play? Type 'y' to begin.",
            "What is the name of the large outdoor market in Seattle?",
            "What is the name of the tallest building in Seattle?",
            "What is the name of the large manmade lake in Seattle?",
            "What mountain is located just south of Seattle?",
            "True or false: When the Space Needle was built, it was the tallest building west of the Mississippi.",
            "True or false: Seattle's annual rainfall is less than that of Houston, Chicago and New York City.",
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
            "Ready to play? Type 'y' to begin.",
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
            "True or false: When it was completed in 1884, the Washington Monument was the tallest structure in the world."
        ]
    },
    // answers for the questions
    // yes, you must have the exact right answer to get the point. The world needs more people who use correct capitalization.
    answers: {
        Seattle:
            ["y", "Pike Place","Columbia Tower","Greenlake", "Mount Rainier", "true", "true", "Fremont Troll", "UW", "false", "Hempfest", "Starbucks","Seahawks", "false", "12th Man", "Microsoft", "Boeing"],
        DC: ["y","Metro", "Union Station", "false", "states", "false", "false", "36", "Washington Monument", "true", "Wizards", "Muriel Bowser", "Russell", "true", "Air and Space", "true"]
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
            var answers = trivia.qCounter.numCorrect - 1;
            if(trivia.num+1 > $(sourceQ).length){
                $("h4.question").html("You answered "+ answers + " out of 15 questions correctly!");
                // stop the timer after the final question is answered
                trivia.timer.stopTimer();
            }
            // otherwise, display the next question
            $("h4.question").html(sourceQ[trivia.num])
        },
        // resets the game page on click
        resetGame: function resetGame() {
            ///Remove the anchor link from the URL
            // var hash = location.hash.replace('#','');
            // if(hash != ''){
            //     location.hash = '';
            // }
            //reload the page
            function goUp(){
                $('a').smoothScroll();
            }
            // trivia.timer.stopTimer();
            // $(".showAnswers").empty();
            // trivia.num = 0;
            // trivia.qCounter.numCorrect = 0;

            location.reload();


        }
    }
}
