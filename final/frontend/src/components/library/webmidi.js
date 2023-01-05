/*
================== webmidi.js ==================
export 兩個函式 + 一個array
init() : 初始化 WebMidi 這個 library，並幫現有的每個 input device 加上 listener，於程式最一開始使用
redetectInputDevice() : 重新幫每個 input device 加上 listener，作為 reconnect 的 onClick function 用
score[] : 儲存輸入完的音符 object
​
obj note {
    identifier,
    attack,
    release,
    start,
    end
}
*/

import { WebMidi } from "webmidi";
import * as Tone from 'tone';
import low from "./sound/low.wav";
import high from "./sound/high.wav";
import { useState } from "react";

let noteBuffer = [];
let score = [];
let song = [];

const init = (bpm,countdown,setCountdown) => {
    let theBeat = 0;
    let section = -3;
    let countdownNum = 9
    Tone.Transport.bpm.value = bpm;
    const oneBeat = Tone.Time("4n").toSeconds();
    const halfBeat = Tone.Time("8n").toSeconds();
    const delayBeat = 0.3333333
    let playing = [];
    let bufferForMidi = [];
    for (let index = 0; index < 223; index++) {
        playing[index] = false;
    }

    WebMidi.enable().then(() => {
        song = [];
        if (WebMidi.inputs.length!==0) {
            console.log("midi input existed")
            WebMidi.inputs.forEach((i) => {
                i.removeListener();
                i.addListener("noteon", (e) => {
                    if (noteBuffer.findIndex((n) => n.identifier === e.note.identifier) === -1) {
                        bufferForMidi.push([e.note.identifier,Math.floor(parseFloat(e.timestamp)/1000)%60,Math.floor(parseFloat(e.timestamp)*1000)%1000, theBeat,section]);
                        noteBuffer.push({
                            identifier: e.note.identifier,
                            attack: e.note.attack,
                            release: e.note.release,
                            start: e.timestamp,
                        });
                    console.log(bufferForMidi);
                    }
                });
                i.addListener("noteoff", (e) => {
                    const index = noteBuffer.findIndex(
                        (n) => n.identifier === e.note.identifier
                    );
                    const notes = e.note.identifier.toLowerCase()[0]+"/"+e.note.identifier.toLowerCase()[1]
                    const playingIndex = bufferForMidi.findIndex(
                        (n) => n[0] === e.note.identifier
                    )
                    const second = Math.floor(parseFloat(e.timestamp)/1000)%60 - bufferForMidi[playingIndex][1] + 0.001*(Math.floor(parseFloat(e.timestamp)*1000)%1000-bufferForMidi[playingIndex][2]);
                    let beats = Math.floor((second + 0.6*oneBeat) / oneBeat);
                    if(beats === 0) {beats = 1};
                    song.push([notes,beats,bufferForMidi[playingIndex][3],bufferForMidi[playingIndex][4]])
                    bufferForMidi.splice(playingIndex,1);
                    const note = {
                        identifier: e.note.identifier,
                        attack: noteBuffer[index].attack,
                        release: noteBuffer[index].release,
                        start: noteBuffer[index].start,
                        end: e.timestamp,
                    };
                    noteBuffer.splice(index, 1);
                    score.push(note);
                });
            });
        }

        else{
            console.log("midi not existed")

            const playMusic = (e)=>{
                if(playing[e.keyCode]){return;}
                const d = new Date();
                playing[e.keyCode] = [d.getSeconds(), d.getMilliseconds(), theBeat, section];
            }
            const stopMusic = (e)=>{
                let note = '';
                switch(e.keyCode){
                    case 65:
                        note = 'c/4';
                        break;
                    case 83:
                        note = 'd/4';
                        break;
                    case 68: 
                        note = 'e/4';
                        break;
                    case 70:
                        note = 'f/4';
                        break;
                    case 71:
                        note = 'g/4';
                        break;
                    case 72:
                        note = 'a/4';
                        break;
                    case 74: 
                        note = 'b/4';
                        break;
                    case 90: 
                        note = 'c/5';
                        break;
                    case 88:
                        note = 'd/5';
                        break;
                    case 67:
                        note = 'e/5';
                        break;
                    case 86:
                        note = 'f/5';
                        break;
                    case 66: 
                        note = 'g/5';
                        break;
                    case 78: 
                        note = 'a/5';
                        break;
                    default: 
                        break;
                };
                const d = new Date();
                let second = d.getSeconds() - playing[e.keyCode][0] + 0.001*(d.getMilliseconds() - playing[e.keyCode][1]);
                if(second <= 0){second += 60}
                let beats = Math.floor((second + 0.6*halfBeat) / halfBeat);
                if (beats === 0){ beats = 1}
                if(note !== ''){
                    let connect = false;
                    let preBeat = 0;
                    if(playing[e.keyCode][2] + beats > 9){
                        preBeat = beats;
                        beats = (9-playing[e.keyCode][2]);
                        preBeat -= beats;
                        preBeat %= 8;
                        if(preBeat === 0){
                            preBeat = 8;
                        }
                        connect= true;
                    }
                    if(song.length === 0 || playing[e.keyCode][3] !== song[song.length -1][3] ||
                        playing[e.keyCode][2] > (song[song.length -1][2] + song[song.length -1][1] -1 )){
                            song.push([note, beats, playing[e.keyCode][2], playing[e.keyCode][3], connect]);
                    }
                    if(preBeat !== 0){
                        connect = false;
                        song.push([note, preBeat, 1, playing[e.keyCode][3] + 1, connect]);
                    }
                }
                playing[e.keyCode] = false;
            }
            document.onkeydown = playMusic;
            document.onkeyup = stopMusic;     
        }

        const highPlayer = new Tone.Player(high).toDestination();
        const player = new Tone.Player(low).toDestination();
        const player2 = new Tone.Player(low).toDestination();
        const player3 = new Tone.Player(low).toDestination();
        
        const loopB = new Tone.Loop(time => {
            Tone.loaded().then(() => {
                highPlayer.start();
            });
        }, 4*oneBeat).start(0);
        const loopC = new Tone.Loop(time => {
            Tone.loaded().then(() => {
                player.start();
            });
        }, 4*oneBeat).start(oneBeat);
        const loopA = new Tone.Loop(time => {
            Tone.loaded().then(() => {
                player2.start();
            });
        }, 4*oneBeat).start(2*oneBeat);
        const loopD = new Tone.Loop(time => {
            Tone.loaded().then(() => {
                player3.start();
            });
        }, 4*oneBeat).start(3*oneBeat);

        const loopW = new Tone.Loop(time => {
            theBeat = 2;
        }, 4*oneBeat).start(0.5*oneBeat + delayBeat);
        const loopX = new Tone.Loop(time => {
            theBeat = 4;
        }, 4*oneBeat).start(1.5*oneBeat + delayBeat);
        const loopY = new Tone.Loop(time => {
            theBeat = 6;
        }, 4*oneBeat).start(2.5*oneBeat + delayBeat);
        const loopZ = new Tone.Loop(time => {
            theBeat = 8;
        }, 4*oneBeat).start(3.5*oneBeat + delayBeat);
        const loopP = new Tone.Loop(time => {
            if(countdownNum === 9){
                setCountdown('8');
                countdownNum = 8;
            }else if(countdownNum === 5){
                setCountdown('4');
                countdownNum = 4;
            }else if(countdownNum === 1){
                setCountdown('');
                countdownNum = 0;
            }
            theBeat = 1;
            section += 1;
        }, 4*oneBeat).start(0*oneBeat + delayBeat);
        const loopQ = new Tone.Loop(time => {
            if(countdownNum === 8){
                setCountdown('7');
                countdownNum = 7;
            }else if(countdownNum === 4){
                setCountdown('3');
                countdownNum = 3;
            }
            theBeat = 3;
        }, 4*oneBeat).start(1*oneBeat + delayBeat);
        const loopR = new Tone.Loop(time => {
            if(countdownNum === 7){
                setCountdown('6');
                countdownNum = 6;
            }else if(countdownNum === 3){
                setCountdown('2');
                countdownNum = 2;
            }
            theBeat = 5;
        }, 4*oneBeat).start(2*oneBeat + delayBeat);
        const loopS = new Tone.Loop(time => {
            if(countdownNum === 6){
                setCountdown('5');
                countdownNum = 5;
            }else if(countdownNum === 2){
                setCountdown('1');
                countdownNum = 1;
            }
            theBeat = 7;
        }, 4*oneBeat).start(3*oneBeat + delayBeat);





        Tone.start()
        Tone.Transport.start();  
    });
};

const redetectInputDevice = () => {
    WebMidi.inputs.forEach((i) => {
        i.removeListener();
        i.addListener("noteon", (e) => {
            if (noteBuffer.findIndex((n) => n.identifier === e.note.identifier) === -1) {
                noteBuffer.push({
                    identifier: e.note.identifier,
                    attack: e.note.attack,
                    release: e.note.release,
                    start: e.timestamp,
                });
            }
        });
        i.addListener("noteoff", (e) => {
            const index = noteBuffer.findIndex(
                (n) => n.identifier === e.note.identifier
            );
            const note = {
                identifier: e.note.identifier,
                attack: noteBuffer[index].attack,
                release: noteBuffer[index].release,
                start: noteBuffer[index].start,
                end: e.timestamp,
            };
            noteBuffer.splice(index, 1);
            score.push(note);
        });
    });
};
const stopIt = ()=>{
    Tone.Transport.stop();  
    return(song);  
}

export { init, redetectInputDevice, score, stopIt };