let gameSeq = []
let userSeq = []
let btns = ["yellow","red","green","purple"]
let started = false
let level = 0;

let h2 = document.querySelector('h2')

document.addEventListener("keypress", function () {

    if (started == false) {
        console.log("game started");
        started = true;

        levelUp()
    }
})

function btnFlash(btn){
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 250);
}


function levelUp(){
    userSeq = []
    level++;
    h2.innerText = `level ${level}`

    let randomIdx = Math.floor(Math.random() * 3)
    let randomColor = btns[randomIdx]
    let randombtn = document.querySelector(`.${randomColor}`)

    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randombtn);
    gameSeq.push(randomColor)
    console.log(gameSeq);
    
    btnFlash(randombtn)
}


function checkAns(idx){

    if(userSeq[idx] == gameSeq[idx]){
       if(userSeq.length == gameSeq.length){
        setTimeout(levelUp , 1000)
       }
    }else{
        h2.innerHTML = `Game Over! <b>Your Score was ${level}</b> <br> Please Try again`
        reset()
    }
}


function btnPress(){
    console.log(this);
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id")
    console.log(userColor);
    userSeq.push(userColor)

    checkAns(userSeq.length-1)
}

let allBtns  = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}


function reset(){
    started = false;
    gameSeq = []
    userSeq = []
    level = 0 
}
