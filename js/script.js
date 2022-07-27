   
   var gameplaying = true;
    var playerTurn = 1;
    var arr = [4,4,4,4,4,4,4,4,4,4,4,4];
    // var count = 1;
    var end = 0;
    var Player1Bench = 0;
    var Player2Bench = 0;
    var obj;

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
    var hole = document.getElementById("hole"+value);
    var newStone = document.createElement('div');
    newStone.className = "stones";
    newStone.style.background = "#D9D9D9";
    newStone.style.left = left+'%';
    newStone.style.top = top+'%';
    newStone.style.visibility = "visible";
    hole.appendChild(newStone);

}

function visual(hole, value){
    var tempPercent1 = 30;
    var tempPercent2 = 15;
    for(var count = 0; count<value; count++){
        if(tempPercent1 < tempPercent2){
            var test = tempPercent1;
            tempPercent1 = tempPercent2
            tempPercent2 = test;
        } else if(tempPercent1 > tempPercent2){
            tempPercent2 += 15;
        } else {
            tempPercent2 += 15;
        }
        if(tempPercent1 >=80){
            tempPercent1 = 30;
        } 
        if(tempPercent2 >= 80){
            tempPercent2 = 15;
        }
        numToStone(hole,tempPercent1,tempPercent2);
    }
}


function StartGame(){
    document.getElementById("Instructions").style.visibility = "hidden";
    document.getElementById("yay").style.visibility = "hidden";
    document.getElementById("instruct3").style.visibility = "hidden";
    const element = document.getElementById("plainBoard");
    const nodes = element.getElementsByClassName("stones");
    
    /*to make the stones visible after intro*/
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.visibility = "visible";
    }  

    /* change the color of player depending onn turn */
    if(playerTurn%2 == 0){
        document.getElementById("player2").style.background = "rgba(217, 217, 217, 0.8)"; //fix for only the text
        document.getElementById("player1").style.backgroundImage = "url(https://salarmycentral.org/wp-content/uploads/wood-grain-from-commissioning-poster.jpg)"; //fix for only the text
        document.getElementById("player1").style.backgroundSize = "50%";

        for(var x = 7; x<13; x++){
            document.getElementById("hole"+x).style.background = "rgba(217, 217, 217, 0.8)";
        }
        for(var x = 1; x<7; x++){
            document.getElementById("hole"+x).style.background = "#604141"
        }
        obj = {player: 2, board: arr};
    } else {
        document.getElementById("player1").style.background = "rgba(217, 217, 217, 0.8)";
        document.getElementById("player2").style.backgroundImage = "url(https://salarmycentral.org/wp-content/uploads/wood-grain-from-commissioning-poster.jpg)"; //fix for only the text
        document.getElementById("player1").style.backgroundSize = "50%";

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


function playGame(hole){
        let move = obj.board[hole-1];

        /* If an empty hole is selected: error */
        if(move <= 0){
            window.alert("That's an empty hole, you can only move stones from a hole\nwith at least 1 stone. \nTry again");
        }

        /* actual game playing*/

    //color correct
    for(var x = 1; x<13; x++){
        document.getElementById("hole"+x).style.background = "#604141";
    }


    //remove stones from clicked hole
        var re = obj.board[hole-1];
        obj.board[hole - 1] = 0;
        var holee = document.getElementById("hole"+hole);
        while (holee.hasChildNodes()) {
            holee.removeChild(holee.lastChild);
        }

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
            visual(hole, obj.board[pos]); 
        }
        let text = "hole" + hole;
        document.getElementById(text).style.background = "rgba(217, 217, 217, 0.8)";
        
        //to switch players when reach end of stones -- not working
        if(obj.board[hole] == 1){
            playerTurn++;
            console.log(playerTurn);
            StartGame(); 
        }
}

function gameEnd(){
    if(Player1Bench > Player2Bench){
        alert("Winner Winner Chicken Dinner Player 1 ;-) \nMaybe Next time Player 2?");
    } else if(Player2Bench > Player1Bench){
        alert("Winner Winner Chicken Dinner Player 2 ;-) \nMaybe Next time Player 1?");
    } else {
        alert("Draw ^-^");
    }
    gameplaying = false;
}

