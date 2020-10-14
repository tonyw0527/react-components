import React, { useRef, useEffect, useState } from 'react';
import './Painter.css';

const Painter = () => {

    // canvas width, height, context
    const [W, setW] = useState(0);
    const [H, setH] = useState(0);
    const [Ctx, setCtx] = useState();

    const painterRef = useRef(null); // App component ref
    const canvasRef = useRef(null);

    useEffect(() => {
        let prevX = 0;
        let currX = 0;
        let prevY = 0;
        let currY = 0;
        let flag = false;
        let dot_flag = false;

        let color = "black"
        let y = 3;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        setCtx(ctx);
        setW(canvas.width);
        setH(canvas.height);

        canvas.addEventListener('mousemove', e => {
            findxy('move', e);
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);


        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function (e) {
            // mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);
        
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);

        // Prevent scrolling when touching the canvas
        painterRef.current.addEventListener("touchstart", function (e) {
            if (e.target === canvas) {
            e.preventDefault();
            }
        }, false);
        painterRef.current.addEventListener("touchend", function (e) {
            if (e.target === canvas) {
            e.preventDefault();
            }
        }, false);
        painterRef.current.addEventListener("touchmove", function (e) {
            if (e.target === canvas) {
            e.preventDefault();
            }
        }, false);

        
        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = color;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }

        function findxy(res, e) {
            if (res === 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.getBoundingClientRect().left;
                currY = e.clientY - canvas.getBoundingClientRect().top;
        
                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res === 'up' || res === "out") {
                flag = false;
            }
            if (res === 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - canvas.getBoundingClientRect().left;
                    currY = e.clientY - canvas.getBoundingClientRect().top;
                    draw();
                }
            }
        }
    }, []);

    function erase() {
        Ctx.clearRect(0, 0, W, H);
    }
    

    return (
        <div className="painter-wrapper" ref={painterRef}>
            <canvas id="myCanvas" width="300px" height="400px" ref={canvasRef}></canvas>
            <button type="button" onClick={erase}>ERASE</button>
        </div>
    );
}

export default Painter;
