let color1 = "rgb(8, 109, 25)";
let color2 = "rgb(236, 124, 13)";
let color3 = "rgb(24, 13, 146)";
let color4 = "rgb(182, 21, 163)";
let color5 = "rgb(6, 139, 234)";
let color6 = "rgb(144, 28, 246)";

let side_num = 5;

let side1 = document.getElementById("side1");
let side2 = document.getElementById("side2");
let side3 = document.getElementById("side3");
let side4 = document.getElementById("side4");
let side5 = document.getElementById("side5");
let side6 = document.getElementById("side6");
let side_icon1 = document.getElementById("side_icon1");
let side_icon2 = document.getElementById("side_icon2");
let side_icon3 = document.getElementById("side_icon3");
let side_icon4 = document.getElementById("side_icon4");
let side_icon5 = document.getElementById("side_icon5");
let side_icon6 = document.getElementById("side_icon6");
let last_block = side5;
let last_icon = side_icon5;

side6.style.display = "none";
side_icon6.style.backgroundColor = color6;

let main = document.getElementById("main");
let main_icon = document.getElementById("main_icon");
let main_text = document.getElementById("main_text");
let side = document.getElementById("side");
let upper_black = document.getElementById("side_upper_black");

let current_main = 6;
let main_disappear = false;


/* 移除參與者 */

function Remove(ID){
    ID.style.display = "none";
    console.log("deleted!!");
}

function LastBlock(){
    last_block = side6;
    last_icon = side_icon6;
    if(side6.style.display == "none"){
        if(side5.style.display == "none"){
            if(side4.style.display == "none"){
                if(side3.style.display == "none"){
                    if(side2.style.display == "none"){
                        last_block = side1;
                        last_icon = side_icon1;
                    }
                    last_block = side2;
                    last_icon = side_icon2;
                }
                last_block = side3;
                last_icon = side_icon3;
            }
            last_block = side4;
            last_icon = side_icon4;
        }
        last_block = side5;
        last_icon = side_icon5;
    }
}

function AdjustDisplay1(num){

    side1.style.width = "15vw";
    side2.style.width = "15vw";
    side3.style.width = "15vw";
    side4.style.width = "15vw";
    side5.style.width = "15vw";
    side6.style.width = "15vw";
    side1.style.height = "22vh";
    side2.style.height = "22vh";
    side3.style.height = "22vh";
    side4.style.height = "22vh";
    side5.style.height = "22vh";
    side6.style.height = "22vh";
    side_icon1.style.width = "5.2vw";
    side_icon1.style.height = "5.2vw";
    side_icon1.style.fontSize = "2vw";
    side_icon2.style.width = "5.2vw";
    side_icon2.style.height = "5.2vw";
    side_icon2.style.fontSize = "2vw";
    side_icon3.style.width = "5.2vw";
    side_icon3.style.height = "5.2vw";
    side_icon3.style.fontSize = "2vw";
    side_icon4.style.width = "5.2vw";
    side_icon4.style.height = "5.2vw";
    side_icon4.style.fontSize = "2vw";
    side_icon5.style.width = "5.2vw";
    side_icon5.style.height = "5.2vw";
    side_icon5.style.fontSize = "2vw";
    side_icon6.style.width = "5.2vw";
    side_icon6.style.height = "5.2vw";
    side_icon6.style.fontSize = "2vw";

    if(num == 5){
        upper_black.style.height = "8vh";
        last_block.style.width = "20vw";
        last_icon.style.width = "6vw";
        last_icon.style.height = "6vw";
        last_icon.style.fontSize = "2.6vw";
    }
    else if(num == 4){
        upper_black.style.height = "20vh";
        last_block.style.width = "15vw";
        last_icon.style.width = "5.2vw";
        last_icon.style.height = "5.2vw";
        last_icon.style.fontSize = "2vw";
    }
    else if(num == 3){
        upper_black.style.height = "20vh";
        last_block.style.width = "20vw";
        last_icon.style.width = "6vw";
        last_icon.style.height = "6vw";
        last_icon.style.fontSize = "2.6vw";
    }
    else if(num == 2){
        upper_black.style.height = "30vh";
        last_block.style.width = "15vw";
        last_icon.style.width = "5.2vw";
        last_icon.style.height = "5.2vw";
        last_icon.style.fontSize = "2vw";
    }
    else if(num == 1){
        upper_black.style.height = "30vh";
        last_block.style.width = "25vw";
        last_block.style.height = "30vh";
        last_icon.style.width = "6.5vw";
        last_icon.style.height = "6.5vw";
        last_icon.style.fontSize = "2.8vw";
    }
    else{
        main.style.width = "100vw";
        side.style.width = "0";
        main_icon.style.backgroundColor = color6;
        main_text.innerHTML = "你無法取消釘選";
    }
}

function Remove1(){
    Remove(side1);
    side_num = side_num - 1;
    LastBlock();
    if(main_disappear == true){
        AdjustDisplay2(side_num);
    }
    else{
        AdjustDisplay1(side_num);
    }
}
function Remove2(){
    Remove(side2);
    side_num = side_num - 1;
    LastBlock();
    if(main_disappear == true){
        AdjustDisplay2(side_num);
    }
    else{
        AdjustDisplay1(side_num);
    }
}
function Remove3(){
    Remove(side3);
    side_num = side_num - 1;
    LastBlock();
    if(main_disappear == true){
        AdjustDisplay2(side_num);
    }
    else{
        AdjustDisplay1(side_num);
    }
}
function Remove4(){
    Remove(side4);
    side_num = side_num - 1;
    LastBlock();
    if(main_disappear == true){
        AdjustDisplay2(side_num);
    }
    else{
        AdjustDisplay1(side_num);
    }
}
function Remove5(){
    Remove(side5);
    side_num = side_num - 1;
    LastBlock();
    if(main_disappear == true){
        AdjustDisplay2(side_num);
    }
    else{
        AdjustDisplay1(side_num);
    }
}


/* 釘選控制 */

function AdjustDisplay2(num){
    if(num == 5 || num == 4 || num == 2){
        upper_black.style.width = "100vw";
        upper_black.style.height = "15vh";
        side1.style.width = "30vw";
        side2.style.width = "30vw";
        side3.style.width = "30vw";
        side4.style.width = "30vw";
        side5.style.width = "30vw";
        side6.style.width = "30vw";
        side1.style.height = "30vh";
        side2.style.height = "30vh";
        side3.style.height = "30vh";
        side4.style.height = "30vh";
        side5.style.height = "30vh";
        side6.style.height = "30vh";
        side_icon1.style.width = "6vw";
        side_icon1.style.height = "6vw";
        side_icon1.style.fontSize = "2.6vw";
        side_icon2.style.width = "6vw";
        side_icon2.style.height = "6vw";
        side_icon2.style.fontSize = "2.6vw";
        side_icon3.style.width = "6vw";
        side_icon3.style.height = "6vw";
        side_icon3.style.fontSize = "2.6vw";
        side_icon4.style.width = "6vw";
        side_icon4.style.height = "6vw";
        side_icon4.style.fontSize = "2.6vw";
        side_icon5.style.width = "6vw";
        side_icon5.style.height = "6vw";
        side_icon5.style.fontSize = "2.6vw";
        side_icon6.style.width = "6vw";
        side_icon6.style.height = "6vw";
        side_icon6.style.fontSize = "2.6vw";
        if(num == 2){
            upper_black.style.height = "25vh";
        }
    }
    else if(num == 3 || num == 1){
        upper_black.style.width = "100vw";
        upper_black.style.height = "10vh";
        side1.style.width = "45vw";
        side2.style.width = "45vw";
        side3.style.width = "45vw";
        side4.style.width = "45vw";
        side5.style.width = "45vw";
        side6.style.width = "45vw";
        side1.style.height = "35vh";
        side2.style.height = "35vh";
        side3.style.height = "35vh";
        side4.style.height = "35vh";
        side5.style.height = "35vh";
        side6.style.height = "35vh";
        side_icon1.style.width = "6vw";
        side_icon1.style.height = "6vw";
        side_icon1.style.fontSize = "2.6vw";
        side_icon2.style.width = "6vw";
        side_icon2.style.height = "6vw";
        side_icon2.style.fontSize = "2.6vw";
        side_icon3.style.width = "6vw";
        side_icon3.style.height = "6vw";
        side_icon3.style.fontSize = "2.6vw";
        side_icon4.style.width = "6vw";
        side_icon4.style.height = "6vw";
        side_icon4.style.fontSize = "2.6vw";
        side_icon5.style.width = "6vw";
        side_icon5.style.height = "6vw";
        side_icon5.style.fontSize = "2.6vw";
        side_icon6.style.width = "6vw";
        side_icon6.style.height = "6vw";
        side_icon6.style.fontSize = "2.6vw";
        if(num == 1){
            upper_black.style.height = "23vh";
        }
    }
    else{
        main.style.width = "100vw";
        side.style.width = "0";
        main.style.display = "block";
        side.style.display = "none";
        main_icon.style.backgroundColor = color6;
        main_text.innerHTML = "你無法取消釘選";
    }
}

function NoPin(){
    if(side_num > 0){
        main.style.width = "0";
        main.style.display = "none";
        side.style.width = "100vw";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        current_main = 0;
        main_disappear = true;
        LastBlock();
        AdjustDisplay2(side_num);
    }
}

function AddPin1(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color1;
        side1.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 1;
        main_disappear = false;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function AddPin2(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color2;
        side2.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 2;
        main_disappear = false;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function AddPin3(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color3;
        side3.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 3;
        main_disappear = false;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function AddPin4(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color4;
        side4.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 4;
        main_disappear = false;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function AddPin5(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color5;
        side5.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 5;
        main_disappear = false;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function AddPin6(){
    if(main_disappear == true){
        main.style.width = "66vw";
        side.style.width = "34vw";
        upper_black.style.width = "34vw";
        main.style.display = "block";
        main_icon.style.backgroundColor = color6;
        side6.style.display = "none";
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 6;
        main_disappear = false;
        main_text.innerHTML = "取消釘選自己";
    }
}

function ChangePin1(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color1;
        side1.style.display = "none";
        if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 1;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function ChangePin2(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color2;
        side2.style.display = "none";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 2;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function ChangePin3(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color3;
        side3.style.display = "none";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 3;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function ChangePin4(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color4;
        side4.style.display = "none";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 4;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function ChangePin5(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color5;
        side5.style.display = "none";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 6){
            side6.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 5;
        main_text.innerHTML = "取消釘選此參與者";
    }
}
function ChangePin6(){
    if(main_disappear == false){
        main.style.display = "block";
        main_icon.style.backgroundColor = color6;
        side6.style.display = "none";
        if(current_main == 1){
            side1.style.display = "block";
        }
        else if(current_main == 2){
            side2.style.display = "block";
        }
        else if(current_main == 3){
            side3.style.display = "block";
        }
        else if(current_main == 4){
            side4.style.display = "block";
        }
        else if(current_main == 5){
            side5.style.display = "block";
        }
        LastBlock();
        AdjustDisplay1(side_num);
        current_main = 6;
        main_text.innerHTML = "取消釘選自己";
    }
}