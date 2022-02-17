var buttonColours =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern= [];

var keypressed=false;
var level=0;

$(document).keypress(function(){
    if(keypressed===false){
        keypressed=true;

    setTimeout(function(){
        nextSequence();
       }, 1000);
    }
});


$(".btn").click( function(event) {

    var userChoosenColor =  event.target.id;                   //   $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else{
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level=0;
    keypressed=false;
}

function nextSequence(){
    userClickedPattern = [];

    $("h1").html("Level  "+level);

    var randomnumber=Math.floor(Math.random()*4);
    var ramdomChoosenColor=buttonColours[randomnumber];

    gamePattern.push(ramdomChoosenColor);
    var selectedButton = $("#"+ramdomChoosenColor);
    selectedButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(ramdomChoosenColor);
    level++;
}
function playSound(name){
    var audio=new Audio("sounds/"+name +".mp3");
    audio.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
         $("#"+name).removeClass("pressed")
        }, 100);
}

