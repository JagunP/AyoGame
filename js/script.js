   //other improvements 
    // add the player bench images
    //add num by holes so users can see what how to play/use it. -- done
    // add a beginner version
    // add an x to skip the instructions page -- done
    //make the boxes on the instructions line up
    // animations?
    // add the link to learn about ayo -- done
    // figure font ;
    
    
    var gameplaying = true;
    var playerTurn = 1;
    var arr = [4,4,4,4,4,4,4,4,4,4,4,4];
    var end = 0;
    var Player1Bench = 0;
    var Player2Bench = 0;
    var obj;
    var old1;
    var old2;

function Intro(){
    document.getElementById("Instructions").style.overflow = "scroll";
    document.getElementById("instruct2").style.visibility = "visible";
    document.getElementById("secbtn").scrollIntoView(false); 
    document.getElementById("firstbtn").style.visibility = "hidden";
    document.getElementById("secbtn").style.visibility = "visible"; 
}

function Intro2(){
    document.getElementById("secbtn").style.visibility = "hidden";
    document.getElementById("instruct3").style.visibility = "visible";
    document.getElementById("yay").scrollIntoView(false); 
    document.getElementById("yay").style.visibility = "visible";
}

function numToStone(value,left,top){
    if(value >= 0){
        var hole = document.getElementById("hole"+value);
    } 
    if(value<0){
        value = value*-1;
        var hole = document.getElementById("player"+value);
    }
    var newStone = document.createElement('div');
    newStone.className = "stones";
    newStone.style.background = "#D9D9D9";
    newStone.style.left = left+'%';
    newStone.style.top = top+'%';
    newStone.style.visibility = "visible";
    hole.appendChild(newStone);
}

function visual(hole, howManyPerHole){
    var tempPercent1 = 15;
    var tempPercent2 = 0;
    for(var count = 0; count<howManyPerHole; count++){
        if(tempPercent1 < tempPercent2){
            var test = tempPercent1;
            tempPercent1 = tempPercent2
            tempPercent2 = test;
        } else if(tempPercent1 > tempPercent2){
            tempPercent2 += 15;
        } else {
            tempPercent2 += 15;
        }
        if(tempPercent1 >=90){
            tempPercent1 = 15;
        } 
        if(tempPercent2 >= 90){
            tempPercent2 = 0;
        }
        numToStone(hole,tempPercent1,tempPercent2);
    }
}

function removeStones(hole){
    var re = obj.board[hole-1];
    obj.board[hole - 1] = 0;
    var holee = document.getElementById("hole"+hole);
    while (holee.hasChildNodes()) {
        holee.removeChild(holee.lastChild);
    }
}

function removeStonesVisually(hole){
    var holee = document.getElementById("hole"+hole);
    while (holee.hasChildNodes()) {
        holee.removeChild(holee.lastChild);
    }
}

//onchange for input
function hover(hole){
    var div = obj.board[hole-1]%12;
    var hov = document.getElementById("hole"+hole);
    var fill = (div+hole)%12;
    if(fill == 0){
        fill = 12;
    }
    var dest = document.getElementById("hole"+fill);
    console.log("hole" + fill + "color: " + dest.style.background);
    if(div != 0){
        old1 = hov.style.background;
        hov.style.background = "white";
        old2 = dest.style.background;
        dest.style.background = "white";
    }
    var num = obj.board[hole-1];
    hov.innerHTML = "<span style='color:white'>" + num + "</span>";
}

function out(hole){
    var div = obj.board[hole-1]%12;
    var teext = document.getElementById("hole"+hole);
    var fill = (div+hole)%12;
    if(fill == 0){
        fill = 12;
    }
    var destt = document.getElementById("hole"+fill);
    if(div != 0){
        teext.style.background = old1;
        destt.style.background = old2;
    }
    var num = obj.board[hole-1];
    teext.innerHTML = "";
    visual(hole, num);
}

function StartGame(){
    document.getElementById("Instructions").style.visibility = "hidden";
    document.getElementById("yay").style.visibility = "hidden";
    document.getElementById("instruct3").style.visibility = "hidden";
    document.getElementById("instruct1").style.visibility = "hidden";


    /* change the color of player depending onn turn */
    if(playerTurn%2 == 0){
        document.getElementById("play2").style.background = "#b2efb1"; //fix for only the text
        document.getElementById("play1").style.background = "rgba(217, 217, 217, 0.8)"; //fix for only the text
        document.getElementById("player2").style.boxShadow = "10px 10px 5px rgba(217, 217, 217, 0.8)";
        document.getElementById("player1").style.boxShadow = "5px 5px 5px";


        for(var x = 7; x<13; x++){
            document.getElementById("hole"+x).style.background = "rgba(217, 217, 217, 0.8)";
        }
        for(var x = 1; x<7; x++){
            document.getElementById("hole"+x).style.background = "#604141"
        }
        obj = {player: 2, board: arr};
    } else {
        document.getElementById("play1").style.background = "#b2efb1";
        document.getElementById("play2").style.background = "rgba(217, 217, 217, 0.8)";
        document.getElementById("player1").style.boxShadow = "10px 10px 5px rgba(217, 217, 217, 0.8)";
        document.getElementById("player2").style.boxShadow = "5px 5px 5px";

        for(var x = 1; x<7; x++){
            document.getElementById("hole"+x).style.background = "rgba(217, 217, 217, 0.8)"
        }
        for(var x = 7; x<13; x++){
            document.getElementById("hole"+x).style.background = "#604141";
        }
        obj = {player: 1, board: arr};
    }

// create the stones
    for(var f = 0; f<12; f++){
        visual(f+1, obj.board[f]);
    }
}

function endq(){
    var total = 0;
    for(var c = 0; c<12; c++){
        total += obj.board[c];
    }
    if(total > 8){
        return false;
    } else {
        return true;
    }
}

function playGame(hole){
    let move = obj.board[hole-1];

/* If an empty hole is selected: error */
    if(move <= 0){
        window.alert("That's an empty hole, you can only move stones from a hole\nwith at least 1 stone. \nTry again");
        gameplaying = false;
    }
    
    // /* actual game playing*/
    if(gameplaying == true){
        //color correct
        for(var x = 1; x<13; x++){
            document.getElementById("hole"+x).style.background = "#604141";
        }


        //remove stones from clicked hole
        removeStones(hole);

        //adding stones to other holes
        let neww = hole;
        for(let x = 2; x<=move+1; x++){
            if(hole >= 12){
                hole = 1;
            } else {
                hole++;
            }
            var pos = neww+x-2;
            if(pos >= 12){
                pos = pos%12;
            }
            obj.board[pos]++;
            removeStonesVisually(hole);
            visual(hole, obj.board[pos]); 
        }
        let text = "hole" + hole;
        document.getElementById(text).style.background = "rgba(217, 217, 217, 0.8)";    

        //to switch players when reach end of stones
        // to check for houses -- works but issues with visualizing bench stones;

        if(obj.board[hole-1] == 1){
            for(var one = 0; one<12; one++){
                if(obj.board[one] == 4){
                    if(obj.player == 1){
                        Player1Bench++;
                        visual(-1,4);
                    } else {
                        Player2Bench++;
                        visual(-2,4);
                    }
                    removeStones(one+1);
                }
            }
            playerTurn++;
            StartGame(); 
        } 
    } 
    if (endq() == true){
        gameEnd();
    }
    gameplaying = true;
}


function gameEnd(){
    if(Player1Bench > Player2Bench){
        alert("Winner Winner Chicken Dinner Player 1 ;-) \nMaybe Next time Player 2?");
    } else if(Player2Bench > Player1Bench){
        alert("Winner Winner Chicken Dinner Player 2 ;-) \nMaybe Next time Player 1?");
    } else {
        alert("Draw ^-^");
    }
    for(var t = 1; t<13;t++){
        var rem = document.getElementById("hole"+c)
        removeStones(t);
    }
    gameplaying = false;
    StartGame();


}

