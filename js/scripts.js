// main page click to play commands
// $("#Seattle").on("click", playGame);
// $("#DC").on("click", playGame);

// Global Variables:
var num = 0;
var timer = {
    seconds: 301,
    newTime: 0,
    increment: function incrementTime() {
        if(timer.seconds>0){
            setInterval(function(){
                timer.seconds--;
                $("#timer").html(timer.seconds);
            }, 1000)
        } else {
            alert("Timer is up!");
        };
    }
};
var qCounter = {
    numCorrect: 0,
    totalQ: 15,
    numAsked: 0,
    addCorrect: function incrementQs(){
        qCounter.numCorrect++
        $("p.correctAnswers").html(this.numCorrect);
    },
    getTotal: function checkRemaining() {
        qCounter.numAsked++;
        var numRemaining = qCounter.totalQ - qCounter.numAsked;
        $(".numQuestionsLeft").html(numRemaining)
    }
};
var answers = {
    Seattle: ["Pike Place","Columbia Tower","Greenlake", "Mount Rainier"],
    DC: [],
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// on page load:

$(window).load(function(){
    // start the timer
    timer.increment()
    // display questions correct out of total questions
    $("p.correctAnswers").html(qCounter.numCorrect)
    // display first question
    $("h4.question").eq(num).css("display", "block")
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game play functions

function showQuestion(){
    if(num+1 >= $("h4.question").length){
        alert("that's all");
    }
    $("h4.question").eq(num).css("display", "none");
    num++;
    $("h4.question").eq(num).css("display", "block");

}
function checkAnswer(){
    event.preventDefault();
    currentGuess = $("#playerInput").val()
    if (currentGuess=== answers.Seattle[num])
        qCounter.addCorrect();
    // hides prev questions and displays the next question
    displayAnswers();
    showQuestion();
    //resets input box to empty
    $("#playerInput").val("");
    //display next question
    // decrease numQuestionsLeft by one
    qCounter.getTotal();
}

function displayAnswers(){
    //display user guesses

    //display correctAnswers
    $(".showAnswers").append("<tr class='answersRow'></tr>");
    $(".answersRow").last().append("<td>"+currentGuess+"</td>")
    $(".answersRow").last().append("<td>"+answers.Seattle[num]+"</td>")
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// click events

//When a player answers a question
$("#playerInput").on("keypress", function(e){
//  event.preventDefault();
    if(e.which === 13){
        checkAnswer();
    }
});
