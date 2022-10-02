/* 移除參與者 */

let side_num = 5;

let remove1 = document.getElementById("Remove1");
let remove2 = document.getElementById("Remove2");
let remove3 = document.getElementById("Remove3");
let remove4 = document.getElementById("Remove4");
let remove5 = document.getElementById("Remove5");
let remove6 = document.getElementById("Remove6");
remove6.style.display = 'none';

let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");
let icon3 = document.getElementById("icon3");
let icon4 = document.getElementById("icon4");
let icon5 = document.getElementById("icon5");
let icon6 = document.getElementById("icon6");

let main = document.getElementById("main");
let main_icon = document.getElementById("main_icon");
let side = document.getElementById("side");
let upper_black = document.getElementById("side_upper_black");

let main_disappear = false;

function Remove(ID){
    ID.style.display = 'none';
    console.log("deleted!!");
}

let last_block = remove5;
let last_icon = icon5;
function LastBlock(){
    if(remove5.style.display == 'none'){
        if(remove4.style.display == 'none'){
            if(remove3.style.display == 'none'){
                if(remove2.style.display == 'none'){
                    last_block = remove1;
                    last_icon = icon1;
                }
                last_block = remove2;
                last_icon = icon2;
            }
            last_block = remove3;
            last_icon = icon3;
        }
        last_block = remove4;
        last_icon = icon4;
    }
}

function AdjustDisplay1(num){
    if(num == 4){
        upper_black.style.height = "20vh";
        last_block.style.width = "15vw";
        last_icon.style.width = "5.2vw";
        last_icon.style.height = "5.2vw";
        last_icon.style.fontSize = "2vw";
    }
    else if(num == 3){
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
        last_block.style.width = "25vw";
        last_block.style.height = "30vh";
        last_icon.style.width = "6.5vw";
        last_icon.style.height = "6.5vw";
        last_icon.style.fontSize = "2.8vw";
    }
    else{
        main.style.width = "100vw";
        side.style.width = "0";
    }
}

function Remove1(){
    Remove(remove1);
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
    Remove(remove2);
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
    Remove(remove3);
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
    Remove(remove4);
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
    Remove(remove5);
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

let current_main = main;

function AdjustDisplay2(num){
    if(num == 5 || num == 4 || num == 2){
        upper_black.style.width = "100vw";
        upper_black.style.height = "15vh";
        remove1.style.width = "30vw";
        remove2.style.width = "30vw";
        remove3.style.width = "30vw";
        remove4.style.width = "30vw";
        remove5.style.width = "30vw";
        remove6.style.width = "30vw";
        remove1.style.height = "30vh";
        remove2.style.height = "30vh";
        remove3.style.height = "30vh";
        remove4.style.height = "30vh";
        remove5.style.height = "30vh";
        remove6.style.height = "30vh";
        icon1.style.width = "6vw";
        icon1.style.height = "6vw";
        icon1.style.fontSize = "2.6vw";
        icon2.style.width = "6vw";
        icon2.style.height = "6vw";
        icon2.style.fontSize = "2.6vw";
        icon3.style.width = "6vw";
        icon3.style.height = "6vw";
        icon3.style.fontSize = "2.6vw";
        icon4.style.width = "6vw";
        icon4.style.height = "6vw";
        icon4.style.fontSize = "2.6vw";
        icon5.style.width = "6vw";
        icon5.style.height = "6vw";
        icon5.style.fontSize = "2.6vw";
        icon6.style.width = "6vw";
        icon6.style.height = "6vw";
        icon6.style.fontSize = "2.6vw";
        if(num == 2){
            upper_black.style.height = "25vh";
        }
    }
    else if(num == 3 || num == 1){
        upper_black.style.width = "100vw";
        upper_black.style.height = "10vh";
        remove1.style.width = "45vw";
        remove2.style.width = "45vw";
        remove3.style.width = "45vw";
        remove4.style.width = "45vw";
        remove5.style.width = "45vw";
        remove6.style.width = "45vw";
        remove1.style.height = "35vh";
        remove2.style.height = "35vh";
        remove3.style.height = "35vh";
        remove4.style.height = "35vh";
        remove5.style.height = "35vh";
        remove6.style.height = "35vh";
        icon1.style.width = "6vw";
        icon1.style.height = "6vw";
        icon1.style.fontSize = "2.6vw";
        icon2.style.width = "6vw";
        icon2.style.height = "6vw";
        icon2.style.fontSize = "2.6vw";
        icon3.style.width = "6vw";
        icon3.style.height = "6vw";
        icon3.style.fontSize = "2.6vw";
        icon4.style.width = "6vw";
        icon4.style.height = "6vw";
        icon4.style.fontSize = "2.6vw";
        icon5.style.width = "6vw";
        icon5.style.height = "6vw";
        icon5.style.fontSize = "2.6vw";
        icon6.style.width = "6vw";
        icon6.style.height = "6vw";
        icon6.style.fontSize = "2.6vw";
        if(num == 1){
            upper_black.style.height = "23vh";
        }
    }
    else{
        main.style.width = "100vw";
        side.style.width = "0";
        main.style.display = "block";
        remove6.style.display = "none";
    }
}

function NoPin(){
    if(side_num != 0){
        main.style.width = "0";
        side.style.width = "100vw";
        main.style.display = "none";
        remove6.style.display = "block";
        icon6.style.backgroundColor = "rgb(144, 28, 246)";
        AdjustDisplay2(side_num);
        main_disappear = true;
    }
}