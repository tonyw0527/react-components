import React, {useState, useEffect, useRef} from 'react';
import './Painter.css';

const Painter = () => {

    const [Eraser_flag, setEraser_flag] = useState(false);

    const myCanvasRef = useRef()

    useEffect(() => {
        const myCanvas = myCanvasRef.current;
        const myCtx = myCanvas.getContext('2d');
        if(Eraser_flag === false) {
            myCtx.fillStyle = 'black';
            myCtx.strokeStyle = 'black';
            myCtx.lineWidth = 3;
        } else {
            myCtx.fillStyle = 'white';
            myCtx.strokeStyle = 'white';
            myCtx.lineWidth = 15;
        }
        
        const rectWidth = 3;
        myCtx.lineJoin = 'round';
        myCtx.lienCap = 'round';

        let prevX = 0;
        let prevY = 0;
        let currX = 0;
        let currY = 0;
        const forXCorrection = myCanvas.getBoundingClientRect().left;
        const forYCorrection = myCanvas.getBoundingClientRect().top;

        let path_flag = false;
        const drawing = (type, e) => {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - forXCorrection;
            currY = e.clientY- forYCorrection;

            if (type === 'down') {
                path_flag = true;
                myCtx.fillRect(currX, currY, rectWidth, rectWidth);
            } else  if (type === 'move' && path_flag) {
                myCtx.beginPath();
                myCtx.moveTo(prevX, prevY);
                myCtx.lineTo(currX, currY);
                myCtx.stroke();
                myCtx.closePath();
            } else if (type === 'up' || type === 'out') {
                path_flag = false;
            }
        }

        const mousedownListener = (e) => {
            drawing('down', e);
        }

        const mousemoveListener = (e) => {
            drawing('move', e);
        }

        const mouseupListener = (e) => {
            drawing('up', e);
        }

        const mouseoutListener = (e) => {
            drawing('out', e);
        }

        myCanvas.addEventListener('mousedown', mousedownListener);
        myCanvas.addEventListener('mousemove', mousemoveListener);
        myCanvas.addEventListener('mouseup', mouseupListener);
        myCanvas.addEventListener('mouseout', mouseoutListener);

        return () => {
            myCanvas.removeEventListener('mousedown', mousedownListener);
            myCanvas.removeEventListener('mousemove', mousemoveListener);
            myCanvas.removeEventListener('mouseup', mouseupListener);
            myCanvas.removeEventListener('mouseout', mouseoutListener);
        }
    }, [Eraser_flag])

    return (
        <div className="painter-wrapper">
        <canvas ref={myCanvasRef} id="myCanvas" width="300" height="300">Error</canvas>
        <button type="button" onClick={() => {
            myCanvasRef.current.getContext('2d').clearRect(0,0,myCanvasRef.current.width,myCanvasRef.current.height);
        }}>Reset</button>
        <button type="button" onClick={() => {
            Eraser_flag ? setEraser_flag(false) : setEraser_flag(true);
        }}>{Eraser_flag ? 'Pen' : 'Eraser'}</button>
        </div>
    );
}

export default Painter;
