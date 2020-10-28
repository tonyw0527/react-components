import React, { useEffect, useRef } from 'react';
import './TimingGame.css';

const TimingGame = () => {

    const ledLength = 40;
    let gameSpeed = 15;
    let isPlaying = false;
    let play_interval_id = '';
    const goalLedIndex = Math.round(ledLength/2);
    let currLedIndex;

    useEffect(() => {
        const goalLed = document.getElementById(goalLedIndex);
        goalLed.style.backgroundColor = 'red'

        document.addEventListener('keypress', (e) =>{
            if(e.code == 'Space'){
                handleGame();
            }
        });
        
        return () => {
            
        }
    }, []);

    //from stack over flow powerd by br3ntor
    const graph = useRef(null);

    useEffect(() => {
        const ciclegraph = graph.current;
        const circleElements = ciclegraph.childNodes;

        let angle = 360 - 90;
        let dangle = 360 / circleElements.length;

        for (let i = 0; i < circleElements.length; i++) {
        let circle = circleElements[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${ciclegraph.clientWidth /
            2}px) rotate(-${angle}deg)`;
        }
    }, []);

    const handleGame = () => {
        if(isPlaying){
            isPlaying = false;
            clearInterval(play_interval_id);

            if(currLedIndex === goalLedIndex){
                const goalLed = document.getElementById(goalLedIndex);
                goalLed.style.backgroundColor = 'purple';
                setTimeout(()=>{
                    alert('You win!');
                    console.log('hihi')
                }, 100);
                
            } else {
                //alert('Wrong!...')
            }
        } else {
            let i = 0;
            isPlaying = true;
            const goalLed = document.getElementById(goalLedIndex);
            goalLed.style.backgroundColor = 'red'
            if(currLedIndex && currLedIndex !== goalLedIndex){
                const currLed = document.getElementById(currLedIndex);
                currLed.style.backgroundColor = 'gray'
            }

            play_interval_id = setInterval(()=>{
                if(i === 0) {
                    const lastLed = document.getElementById(ledLength-1);
                    if(lastLed){
                        lastLed.style.backgroundColor = 'gray';
                    }
                }

                const prevLed = document.getElementById(i-1);
                if(prevLed){
                    if(i-1 !== goalLedIndex){
                        prevLed.style.backgroundColor = 'gray';    
                    } else {
                        prevLed.style.backgroundColor = 'red';    
                    }
                }

                if(i !== goalLedIndex){
                    const led = document.getElementById(i);
                    led.style.backgroundColor = 'blue';
                } else {
                    const led = document.getElementById(i);
                    led.style.backgroundColor = 'purple';
                }
                
                currLedIndex = i;
                i++;
                if(i === ledLength){
                    i = 0;
                };
            }, gameSpeed);
        } 

    }

    const renderLED = () => {
        const LEDArr = [];
        for(let i = 0; i<ledLength; i++){
            LEDArr.push(<div className="circle" key={i} id={i}>{i}</div>);
        }

        return LEDArr;
    };

    return (
        <div className="timing-game-wrapper">
            <div className="timing-game-header">
                <h1>Timing Game</h1>
            </div>
            <div className="timing-game-main">
                <div className="ciclegraph" ref={graph}>
                    {renderLED()}
                </div>
                <button className="main-start-btn" type="button" onClick={()=>{handleGame()}}>
                    Go!
                </button>
            </div>
            
        </div>
    );
};

export default TimingGame;