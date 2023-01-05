const modify = (prevSong)=>{
    console.log('prevSong = ',prevSong);
    let song = prevSong;
    song = song.filter(e => e[3] >= 0);
    for(let i = 0; i< song.length-1; i+=1){
        if(song[i][1] === 1 && song[i+1][2] - song[i][2] === 2){
            song[i][1] = 2;
        }else if(song[i][1] === 1 && song[i+1][2] !== 8 && song[i][2] === 7){
            song[i][1] = 2;
        }
    }
    console.log('afterSong = ',song);
    return song;
}

export default modify;