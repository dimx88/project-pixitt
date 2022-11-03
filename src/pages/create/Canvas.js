
// Utils
import Mouse from '../../utils/mouse';

//  Styles
import { useEffect, useRef, useState } from 'react';
import './Canvas.css';

export default function Canvas() {
    // Setup
    //---------------------------
    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);
    const contextRef = useRef(null);

    const dimensions = { width: 800, height: 600 };

    const mouse = new Mouse(null, true);

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');
        mouse.follow(canvas, true);
    }, []);



    // ---------------------------------------

    const onMouseDown = (e) => {

    };

    const onMouseUp = (e) => {

    };

    const onMouseMove = (e) => {

    };

    const onMouseLeave = (e) => {

    };



    return (
        <canvas
            className="canvas"
            id="canvas"
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        />
    );
}