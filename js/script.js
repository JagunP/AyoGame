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

function StartGame(){
    var gameplaying = true;
    var playerTurn = 1;
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
        document.getElementById("player2").style.color = "#F5F5F5";
    } else {
        document.getElementById("player1").style.color = "#F5F5F5";
    }

}