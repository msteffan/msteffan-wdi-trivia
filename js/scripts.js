// main page click to play commands
// $("#Seattle").on("click", playGame);
// $("#DC").on("click", playGame);

// Global Variables:
// var num = 0;
// var timer = {
//     seconds: 60,
//     newTime: 0,
//     increment: function incrementTime() {
//         var interval = setInterval(function(){
//             if(timer.seconds > 0){
//                 timer.seconds--;
//                 $("#timer").html(timer.seconds);
//             } else {
//                 alert("time's up")
//                 clearInterval(interval)
//             }
//         }, 1000);
//     }
// };
// var qCounter = {
//     numCorrect: 0,
//     totalQ: 15,
//     numAsked: 0,
//     addCorrect: function incrementQs(){
//         qCounter.numCorrect++
//         $("p.correctAnswers").html(this.numCorrect);
//     },
//     getTotal: function checkRemaining() {
//         qCounter.numAsked++;
//         var numRemaining = qCounter.totalQ - qCounter.numAsked;
//         $(".numQuestionsLeft").html(numRemaining)
//     }
// };
// var answers = {
//     Seattle: ["Pike Place","Columbia Tower","Greenlake", "Mount Rainier", "true", "true", "Fremont Troll", "UW", "false", "Hempfest", "Starbuck","Seahawks", "false", "12th Man", "Microsoft", "Boeing"],
//     DC: ["Metro", "Union Station", "false", "states", "false", "false", "36", "Washington Monument", "true", "Wizards", "Muriel Bowser", "Russell", "true", "Air and Space", "true"]
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// on page load:

$(window).load(function(){
    // start the timer
    trivia.timer.increment();
    // display questions correct out of total questions
    $("p.correctAnswers").html(trivia.qCounter.numCorrect)
    // display first question
    $("h4.question").eq(trivia.num).css("display", "block")
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game play functions

var trivia = {
    num: 0,
    timer: {
        seconds: 60,
        newTime: 0,
        increment: function incrementTime() {
            var interval = setInterval(function(){
                if(trivia.timer.seconds > 0){
                    trivia.timer.seconds--;
                    $("#timer").html(trivia.timer.seconds);
                } else {
                    console.log("time's up")
                    clearInterval(interval)
                }
            }, 1000);
        }
    },
    qCounter: {
        numCorrect: 0,
        totalQ: 15,
        numAsked: 0,
        addCorrect: function incrementQs(){
            trivia.qCounter.numCorrect++
            $("p.correctAnswers").html(this.numCorrect);
        },
        getTotal: function checkRemaining() {
            trivia.qCounter.numAsked++;
            var numRemaining = trivia.qCounter.totalQ - trivia.qCounter.numAsked;
            $(".numQuestionsLeft").html(numRemaining)
            if(numRemaining<0){
                $(".numQuestionsLeft").html("Game is over!");
            }
        }
    },
    answers: {
        Seattle: ["Pike Place","Columbia Tower","Greenlake", "Mount Rainier", "true", "true", "Fremont Troll", "UW", "false", "Hempfest", "Starbuck","Seahawks", "false", , "Microsoft", "Boeing"],
        DC: ["Metro", "Union Station", "false", "states", "false", "false", "36", "Washington Monument", "true", "Wizards", "Muriel Bowser", "Russell", "true", "Air and Space", "true"]
    },
    playGame: {
        checkAnswer: function checkAnswer() {
            event.preventDefault();
            currentGuess = $("#playerInput").val();
            if (currentGuess === trivia.answers.Seattle[trivia.num])
                trivia.qCounter.addCorrect();
            // hides prev questions and displays the next question
            trivia.playGame.displayAnswers();
            trivia.playGame.showQuestion();
            //resets input box to empty

            //display next question
            // decrease numQuestionsLeft by one
            trivia.qCounter.getTotal();
            $("#playerInput").val("");
        },
        displayAnswers: function displayAnswers() {
            $(".showAnswers").append("<tr class='answersRow'></tr>");
            $(".answersRow").last().append("<td>"+ currentGuess + "</td>")
            $(".answersRow").last().append("<td>"+trivia.answers.Seattle[trivia.num]+"</td>")
        },
        showQuestion: function showQuestion() {
            if(trivia.num+1 >= $("h4.question").length){
                trivia.playGame.lastQuestion();
            }
            $("h4.question").eq(trivia.num).css("display", "none");
            trivia.num++;
            $("h4.question").eq(trivia.num).css("display", "block");
        },
        lastQuestion: function lastQuestion() {
            $("#lastSeattle").after("<h4 class='lastQuestion' style='display:block'></h4>");
            $(".lastQuestion").html("You answered "+ trivia.qCounter.numCorrect + " out of 15 questions correctly!");
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// click events

//When a player answers a question
$("#playerInput").on("keypress", function(e){
//  event.preventDefault();
    if(e.which === 13){
        trivia.playGame.checkAnswer();
    }
});
