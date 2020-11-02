import React, {useState, useEffect, useRef} from 'react';
import './Painter.css';

import { WHITE_PNG, WorkMemory, canvasImgSetting } from '../../utils/utils';

const workMemory = new WorkMemory();

const Painter = () => {

    const [Eraser_flag, setEraser_flag] = useState(false);
    const [PenColor, setPenColor] = useState('black');

    const myCanvasRef = useRef();
    const eraserButtonRef = useRef();
    const paletteOpenButtonRef = useRef();
    const paletteRef = useRef();
    const saveAnchorRef = useRef();

    const handleClickOutside = (e) => {
        if(!paletteOpenButtonRef.current.contains(e.target)) {
            paletteRef.current.style.display = "none";
        }
    };

    // canvas init
    useEffect(() => {
        const myCanvas = myCanvasRef.current;
        const myCtx = myCanvas.getContext('2d');
        myCtx.fillStyle = 'white';
        myCtx.fillRect(0,0,myCanvasRef.current.width,myCanvasRef.current.height);

        myCanvas.addEventListener("touchstart", function (e) {
            if (e.target === myCanvasRef.current) {
            e.preventDefault();
            }
        }, false);
        myCanvas.addEventListener("touchend", function (e) {
            if (e.target === myCanvasRef.current) {
            e.preventDefault();
            }
        }, false);
        myCanvas.addEventListener("touchmove", function (e) {
            if (e.target === myCanvasRef.current) {
            e.preventDefault();
            }
        }, false);

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {

        const myCanvas = myCanvasRef.current;
        const myCtx = myCanvas.getContext('2d');

        let prevX = 0;
        let prevY = 0;
        let currX = 0;
        let currY = 0;

        let forXCorrection = myCanvas.getBoundingClientRect().left;
        let forYCorrection = myCanvas.getBoundingClientRect().top;

        let path_flag = false;
        const drawing = (type, e, eraser_flag, color, x, y) => {
            if(eraser_flag === false) {
                myCtx.fillStyle = color;
                myCtx.strokeStyle = color;
                myCtx.lineWidth = 3;
            } else {
                myCtx.fillStyle = 'white';
                myCtx.strokeStyle = 'white';
                myCtx.lineWidth = 15;
            }
            
            const rectWidth = 3;
            myCtx.lineJoin = 'round';
            myCtx.lineCap = 'round';

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

                if(type === 'up') {
                    setTimeout(()=> {
                        const cashingImage = myCanvasRef.current.toDataURL();
                        workMemory.saving(cashingImage);
                    }, 100);
                    
                }
            }
        }

        const mousedownListener = (e) => {
            drawing('down', e, Eraser_flag, PenColor);
        }

        const mousemoveListener = (e) => {
            drawing('move', e, Eraser_flag, PenColor);
        }

        const mouseupListener = (e) => {
            drawing('up', e, Eraser_flag, PenColor);
        }

        const mouseoutListener = (e) => {
            drawing('out', e, Eraser_flag, PenColor);
        }

        const touchstartListener = (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            myCanvas.dispatchEvent(mouseEvent);
        }
        const touchendListener = (e) => {
            const mouseEvent = new MouseEvent("mouseup", {});
            myCanvas.dispatchEvent(mouseEvent);
        }
        const touchmoveListener = (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
            });
            myCanvas.dispatchEvent(mouseEvent);
        }

        const resizeAndScrollListener = () => {
            forXCorrection = myCanvas.getBoundingClientRect().left;
            forYCorrection = myCanvas.getBoundingClientRect().top;
        };

        window.addEventListener('resize', resizeAndScrollListener);
        window.addEventListener('scroll', resizeAndScrollListener);
        myCanvas.addEventListener('mousedown', mousedownListener);
        myCanvas.addEventListener('mousemove', mousemoveListener);
        myCanvas.addEventListener('mouseup', mouseupListener);
        myCanvas.addEventListener('mouseout', mouseoutListener);
        myCanvas.addEventListener("touchstart", touchstartListener);
        myCanvas.addEventListener("touchend", touchendListener);
        myCanvas.addEventListener("touchmove", touchmoveListener);

        return () => {
            window.removeEventListener('resize', resizeAndScrollListener);
            window.removeEventListener('scroll', resizeAndScrollListener);
            myCanvas.removeEventListener('mousedown', mousedownListener);
            myCanvas.removeEventListener('mousemove', mousemoveListener);
            myCanvas.removeEventListener('mouseup', mouseupListener);
            myCanvas.removeEventListener('mouseout', mouseoutListener);
            myCanvas.removeEventListener("touchstart", touchstartListener);
            myCanvas.removeEventListener("touchend", touchendListener);
            myCanvas.removeEventListener("touchmove", touchmoveListener);
        }
    }, [Eraser_flag, PenColor]);


    return (
        <div className="Painter-wrapper">
            <div className="painter-title-box">
                <h2>Painter</h2>
            </div>
            <div className="painter-drawing-box">
                <canvas ref={myCanvasRef} id="myCanvas" width="500" height="500">Error</canvas>
            </div>
            <div className="painter-tool-box">
                <button className="reset" type="button" onClick={() => {
                    const myCtx = myCanvasRef.current.getContext('2d');
                    myCtx.fillStyle = 'white';
                    myCtx.fillRect(0,0,myCanvasRef.current.width,myCanvasRef.current.height);
                    
                    const cashingImage = myCanvasRef.current.toDataURL();
                    workMemory.saving(cashingImage);
                }}>
                    Reset
                </button>
                <button ref={eraserButtonRef} className="eraser" type="button" onClick={() => {
                    if(Eraser_flag){
                        setEraser_flag(false);
                        //eraserButtonRef.current.style.backgroundImage = `url(${eraser_svg})`;
                    } else {
                        setEraser_flag(true);
                        //eraserButtonRef.current.style.backgroundImage = `url(${pen_svg})`;
                    }
                }}>
                    {Eraser_flag ? 'Pen' : 'Eraser'}
                </button>
                <button ref={paletteOpenButtonRef} className="palette-open-button" type="button" onClick={() => {
                    if(paletteRef.current.style.display === "flex"){
                        paletteRef.current.style.display = "none";
                        return;
                    }
                    paletteRef.current.style.display = "flex";
                    paletteRef.current.style.flexFlow = "row";
                    paletteRef.current.style.justifyContent = "space-evenly";
                }}>
                    Color
                    <div ref={paletteRef} className="palette">
                        <div className="palette-color palette-black" type="button" onClick={()=>{setPenColor('black')}} >color</div>
                        <div className="palette-color palette-red" type="button" onClick={()=>{setPenColor('red')}} >color</div>
                        <div className="palette-color palette-blue" type="button" onClick={()=>{setPenColor('blue')}} >color</div>
                        <div className="palette-color palette-skyblue" type="button" onClick={()=>{setPenColor('skyblue')}} >color</div>
                        <div className="palette-color palette-green" type="button" onClick={()=>{setPenColor('green')}} >color</div>
                        <div className="palette-color palette-purple" type="button" onClick={()=>{setPenColor('purple')}} >color</div>
                        <div className="palette-color palette-yellow" type="button" onClick={()=>{setPenColor('yellow')}} >color</div>
                        <div className="palette-color palette-brown" type="button" onClick={()=>{setPenColor('brown')}} >color</div>
                    </div>
                </button>
                <button className="prev-btn" type="button" onClick={() => {
                    const flag = workMemory.moveToPrev((prev) => {

                        canvasImgSetting(myCanvasRef.current, prev);
                    });
                    if(flag === 'end') {
                    }
                }}>
                    Prev
                </button>
                <button className="next-btn" type="button" onClick={() => {
                    const flag = workMemory.moveToNext((next) => {

                        canvasImgSetting(myCanvasRef.current, next);
                    });
                    if(flag === 'end') {
                    }
                }}>
                    Next
                </button>
                <button>
                    <a ref={saveAnchorRef} href={WHITE_PNG} 
                        onClick={()=>{
                            const url = myCanvasRef.current.toDataURL("image/png");
                            const link = saveAnchorRef.current;
                            link.download = "canvasImage.png";
                            link.href = url;
                    }}>
                        save
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Painter;