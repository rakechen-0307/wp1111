import Vex from 'vexflow';
import { Dot, StaveTie } from 'vexflow';
import { useEffect, useState } from 'react';
import './css/Staff.css';

const Staff = ( { song, page } ) => {
    console.log('page = ',page )
    function dotted(staveNote, noteIndex = -1) {
        if (noteIndex < 0) {
            Dot.buildAndAttach([staveNote], {
                all: true,
            });
        } else {
            Dot.buildAndAttach([staveNote], {
                index: noteIndex,
            });
        }
        return staveNote;
    }

    useEffect(()=>{
        const { Stave, StaveNote, Beam, Formatter, Renderer } = Vex.Flow;
        const VF = Vex.Flow;

        // We created an object to store the information about the workspace
        var WorkspaceInformation = {
            // The <canvas> element in which you're going to work
            canvas: document.getElementById("boo"), // Vex creates a canvas with specific dimensions
            canvasWidth: 500, canvasHeight: 500
        };
        
        // Create a renderer with Canvas
        var renderer = new VF.Renderer(
            WorkspaceInformation.canvas, VF.Renderer.Backends.CANVAS
        );


        // Configure the rendering context.
        renderer.resize(990, 680);
        const context = renderer.getContext();

        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        
        var staveMeasure = new Array(song.length >= (page+1)*10 ? 10: song.length % 10);
        let connectIt = false;
        let startNode = [];
        let endNode = [];
        let cutOrNot = [];

        for(let i = page*10 ; i < (song.length > (page+1)*10 ? (page+1)*10: song.length); i += 1){
            console.log('i = ',i)
            if(i % 10 === 0){
                staveMeasure[i%1] = new Stave(10, 20, 480);
                staveMeasure[i%10].addClef("treble").setContext(context).draw();
            }else{
                if(i % 2 === 0){
                    staveMeasure[i%10] = new Stave(10, staveMeasure[i%10-2].height + staveMeasure[i%10-2].y+40, 480);
                    staveMeasure[i%10].setContext(context).draw();
                }else{
                    staveMeasure[i%10] = new Stave(staveMeasure[i%10-1].width + staveMeasure[i%10-1].x, staveMeasure[i%10-1].y, 480);
                    staveMeasure[i%10].setContext(context).draw();
                }
            }
            var beam = [];
            var beamIndex = []
            const section = song[i]
            

            for(let j = 0; j < section.length; j += 1){
                //notesMeasure.push(new StaveNote({ keys: [section[j][0]], duration: section[j][1]}));
                let stavenode = 0;
                if(j === 0){
                    if(section[j].duration === 3 || section[j].duration === -3){
                        stavenode = dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat}))
                        beam.push([stavenode]);
                    }else if(section[j].duration === 7 || section[j].duration === -7){
                        stavenode = dotted(dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})))
                        beam.push([stavenode]);
                    }else{
                        stavenode = new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})
                        beam.push([stavenode]);
                    }
                    if(section[j].beat === "8"){
                        beamIndex.push(beam.length);
                    }
                }else{
                    if(section[j - 1].beat === section[j].beat){
                        if(section[j].duration === 3 || section[j].duration === -3){
                            stavenode = dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat}))
                            beam[beam.length-1].push(stavenode);
                        }else if(section[j].duration === 7 || section[j].duration === -7){
                            stavenode = dotted(dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})))
                            beam[beam.length-1].push(stavenode);
                        }else{
                            stavenode = new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})
                            beam[beam.length-1].push(stavenode);
                        }
                    }else{
                        if(section[j].duration === 3 || section[j].duration === -3){
                            stavenode = dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat}))
                            beam.push([stavenode]);
                        }else if(section[j].duration === 7 || section[j].duration === -7){
                            stavenode = dotted(dotted(new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})))
                            beam.push([stavenode]);
                        }else{
                            stavenode = new StaveNote({ keys: [section[j].pitch], duration: section[j].beat})
                            beam.push([stavenode]);
                        }
                        if(section[j].beat === "8"){
                            beamIndex.push(beam.length);
                        }
                    }
                }
                if(section[j].duration < 0){
                    startNode.push(stavenode);
                    endNode.push(undefined);
                    if(i % 2 === 1){
                        cutOrNot.push(true);
                    }else{
                        cutOrNot.push(false);
                    }
                    connectIt = true;
                }else if(connectIt){
                    connectIt = false;
                    endNode[endNode.length - 1] = stavenode;
                }
            }
            var finalBeam = []
           
            for(let k = 0; k < beam.length; k += 1){
                if(beamIndex.includes(k+1) && beam[k].length > 1){
                  finalBeam.push(new Beam(beam[k]));
                }
            }
            console.log('beam = ',beam);
            var result=[].concat.apply([], beam);
            Formatter.FormatAndDraw(context, staveMeasure[i%10], result);
            for(let l = 0; l < finalBeam.length; l += 1){
                finalBeam[l].setContext(context).draw();
            }
        }
        let ties = [];
        for(let i = 0; i < startNode.length; i += 1){
            if(cutOrNot[i]){
                ties.push( 
                    new StaveTie({
                        first_note: startNode[i],
                        first_indices: [0],
                        last_indices: [0],
                    }));
                if(endNode[i]){
                    ties.push( 
                        new StaveTie({
                            last_note: endNode[i],
                            first_indices: [0],
                            last_indices: [0],
                        }));
                }
            }else{
                if(!startNode[i] && !endNode[i]){continue};
                ties.push( 
                    new StaveTie({
                        first_note: startNode[i],
                        last_note: endNode[i],
                        first_indices: [0],
                        last_indices: [0],
                    }));
            }
        }
        ties.forEach((t) => {
            t.setContext(context).draw();
        });
    },[page]);
    return (
        <canvas id='boo'></canvas>
    )
}

export default Staff;