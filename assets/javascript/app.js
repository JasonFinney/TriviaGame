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
            Quest: "This is the first question",
            Answers: [
                "an1", "an2", "an3", "an4",
            ],
            Correct: "an1"
        },
        {
            Quest: "This is the second question",
            Answers: [
                "ans1", "ans2", "ans3", "ans4",
            ],
            Correct: "ans2"
        },
        {
            Quest: "This is the third question",
            Answers: [
                "answ1", "answ2", "answ3", "answ4",
            ],
            Correct: "answ3"
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