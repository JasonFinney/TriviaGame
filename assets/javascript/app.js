$("#time-remaining").append("Click to answer a question!");
$("#random-question").append("<button>" + "Generate Question" + "</button>");

var win = 0;
var loss = 0;
var draw = 0;
var questions;
var timer;
var randomGuess;
var flag = 0;

$(document).on("click", "button", function () {
    questions = [
        {
            Quest: "Who was the legendary Benedictine monk who invented champagne?",
            Answers: [
                "Dom Perignon", "Francios de Bar", "Martin Luther", "Gregor Mendel",
            ],
            Correct: "Dom Perignon"
        },
        {
            Quest: "Russia is Europe's largest country by area. What is the second largest?",
            Answers: [
                "Ukraine", "Denmark", "Poland", "France",
            ],
            Correct: "Denmark"
        },
        {
            Quest: "What is the first Sherlock Holmes book published?",
            Answers: [
                "The Hound of the Baskervilles", "The Valley of Fear", "The Adventures of Sherlock Holmes", "A Study in Scarlet",
            ],
            Correct: "A Study in Scarlet"
        }];
    win = 0;
    loss = 0;
    draw = 0;
    initial();
});

function initial() {
    if (questions.length === 0) {
        clearInterval(timer);
        $("#time-remaining").html("Click to Restart the Game!");
        $("#random-question").html("<button>" + "Generate Question" + "</button>");
        $("#answer1").html("Questions answered correctly:  " + win);
        $("#answer2").html("Questions answered incorrectly:  " + loss);
        $("#answer3").html("Timed Out Questions:  " + draw);
        $("#answer4").html("");
        return;
    };
    $("#time-remaining").html("");
    $("#random-question").html("");
    var sec = 7;
    $("#time-remaining").text("Time Remaining:  " + sec);
    timer = setInterval(function () {
        $("#time-remaining").text("Time Remaining:  " + sec);
        sec--;
        if (sec === -1) {
            draw++;
            flag = 3;
            results();
        }
    }, 1000);

    var chosen = Math.floor(Math.random() * questions.length);

    randomGuess = questions[chosen];

    console.log(randomGuess);

    $("#random-question").text(randomGuess.Quest);
    $("#answer1").text(randomGuess.Answers[0]);
    $("#answer2").text(randomGuess.Answers[1]);
    $("#answer3").text(randomGuess.Answers[2]);
    $("#answer4").text(randomGuess.Answers[3]);

    questions.splice(chosen, 1);
    console.log(questions);
};

$(".ans").on("click", function () {
    console.log($(this).text());
    var choice = $(this).text();
    if (choice === randomGuess.Correct) {
        win++;
        flag = 1;
    } else {
        loss++;
        flag = 2;
    }
    results();
});

function results() {
    clearInterval(timer);
    switch (flag) {
        case 1:
            $("#time-remaining").html("Nice!");
            break;
        case 2:
            $("#time-remaining").html("Nope!");
            break;
        case 3:
            $("#time-remaining").html("Think Faster!");
            break;
    };
    $("#random-question").html("The correct answer was:  " + randomGuess.Correct);
    $("#answer1").html("Questions answered correctly:  " + win);
    $("#answer2").html("Questions answered incorrectly:  " + loss);
    $("#answer3").html("Timed Out Questions:  " + draw);
    $("#answer4").html("");
    setTimeout(initial, 2000);
};