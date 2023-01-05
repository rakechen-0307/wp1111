const convertNoteToVex = (notes,beat=8,clef= "treble") =>{
   
    let currentBeat = 0;
    let primaryArray = [];
    let secondaryArray = [];
    notes.forEach(e=>{
        const [pitch,duration,pos,section,connect] = e;
        const totalBeat = pos-1 + 8*section;
       
        if(currentBeat !== totalBeat){
            if(Math.floor(parseFloat(currentBeat/8)) !== section){
                const difference = 8 - currentBeat % 8;
               
                switch(difference){
                    case 1:
                        currentBeat += 1;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0}); 
                        break;
                    case 2:
                        currentBeat += 2;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        break;
                    case 3:
                        currentBeat += 3;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        break;
                    case 4:
                        currentBeat +=4;
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 5:
                        currentBeat += 5;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 6:
                        currentBeat += 6;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 7:
                        currentBeat += 7;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 8:
                        currentBeat += 8;
                        secondaryArray.push({pitch:"c/5",beat:"1r",duration:0});
                        break;
                }
                primaryArray.push(secondaryArray);
                secondaryArray = [];

                const sectionDifference = Math.floor(parseFloat((totalBeat - currentBeat)/8));
               
                for(let i =0;i<sectionDifference;i++) primaryArray.push([{pitch:"c/5",beat:"1r",duration:0}]);
                const beatDifference = (totalBeat - currentBeat) % 8;
            
                switch(beatDifference){
                    case 1:
                        currentBeat += 1;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        break;
                    case 2:
                        currentBeat += 2;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        break;
                    case 3:
                        currentBeat += 3;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        break;
                    case 4:
                        currentBeat +=4;
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 5:
                        currentBeat += 5;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 6:
                        currentBeat += 6;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 7:
                        currentBeat += 7;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 8:
                        currentBeat += 8;
                        secondaryArray.push({pitch:"c/5",beat:"1r",duration:0});
                        break;
                }
                currentBeat = totalBeat;
            }
            else{
                const difference = totalBeat - currentBeat;
                switch(difference){
                    case 1:
                        currentBeat += 1;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        break;
                    case 2:
                        currentBeat += 2;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        break;
                    case 3:
                        currentBeat += 3;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        break;
                    case 4:
                        currentBeat +=4;
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 5:
                        currentBeat += 5;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 6:
                        currentBeat += 6;
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 7:
                        currentBeat += 7;
                        secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                        secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                        break;
                    case 8:
                        currentBeat += 8;
                        secondaryArray.push({pitch:"c/5",beat:"1r",duration:0});
                }
            }
        }
        if(!connect){
            switch(duration){
                case 1:
                    secondaryArray.push({pitch:pitch,beat:"8",duration:0}); 
                    break;
                case 2:
                    secondaryArray.push({pitch:pitch,beat:"q",duration:0});
                    break;
                case 3:
                    secondaryArray.push({pitch:pitch,beat:"q",duration:3});
                    break;
                case 4:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:0});
                    break;
                case 5:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:0});
                    secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                    break;
                case 6:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:3});
                    break;
                case 7:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:7});
                    break;
                case 8:
                    secondaryArray.push({pitch:pitch,beat:"1",duration:0});
                    break;
                default:
                    secondaryArray.push({pitch:pitch,beat:"1",duration:0});
                    break;
            }
        }else{
            switch(duration){
                case 1:
                    secondaryArray.push({pitch:pitch,beat:"8",duration:-1}); 
                    break;
                case 2:
                    secondaryArray.push({pitch:pitch,beat:"q",duration:-1});
                    break;
                case 3:
                    secondaryArray.push({pitch:pitch,beat:"q",duration:-3});
                    break;
                case 4:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:-1});
                    break;
                case 5:
                    secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                    secondaryArray.push({pitch:pitch,beat:"2",duration:-1});
                    break;
                case 6:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:-3});
                    break;
                case 7:
                    secondaryArray.push({pitch:pitch,beat:"2",duration:-7});
                    break;
                case 8:
                    secondaryArray.push({pitch:pitch,beat:"1",duration:-1});
                    break;
                default:
                    secondaryArray.push({pitch:pitch,beat:"1",duration:-1});
                    break;
            }
        }
            
        currentBeat += duration>=9?8:duration;
        const before = Math.floor(parseFloat((totalBeat)/8))
        const after = Math.floor(parseFloat((totalBeat+duration)/8))
        if(before!==after){
            primaryArray.push(secondaryArray);
            secondaryArray = []
        }
    });
    if(secondaryArray.length!==0){
        switch(8 - currentBeat%8){
            case 1:
                currentBeat += 1;
                secondaryArray.push({pitch:"c/5",beat:"8r",duration:0}); 
                break;
            case 2:
                currentBeat += 2;
                secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                break;
            case 3:
                currentBeat += 3;
                secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                break;
            case 4:
                currentBeat +=4;
                secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                break;
            case 5:
                currentBeat += 5;
                secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                break;
            case 6:
                currentBeat += 6;
                secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                break;
            case 7:
                currentBeat += 7;
                secondaryArray.push({pitch:"c/5",beat:"8r",duration:0});
                secondaryArray.push({pitch:"c/5",beat:"qr",duration:0});
                secondaryArray.push({pitch:"c/5",beat:"2r",duration:0});
                break;
        }
        primaryArray.push(secondaryArray);
    }
    secondaryArray = [];
    console.log("=============result============")
    console.log(primaryArray)
    return primaryArray.length === 0 ? "empty message":primaryArray;        
}

export default convertNoteToVex