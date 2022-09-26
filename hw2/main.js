/* 移除參與者 */

function RemovePeople(divID){
    let ID = document.getElementById(divID);
    if(ID){
        if(ID.style.display == 'block'){
            ID.style.display = 'none';
            console.log("deleted!!");
        }
        else{
            ID.style.display = 'block';
            console.log("Not");
        }
    }
}

