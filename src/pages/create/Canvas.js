

//  Styles
import { useEffect, useRef, useState } from 'react';
import './Canvas.css';

export default function Canvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const height = 600;
    const width = 800;

    let mouse = { x: 0, y: 0, buttonLeft: false, buttonRight: false, buttonMiddle: false };

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');
    }, []);



    // window.onmouseup = function(e) { }

    const onMouseDown = (e) => {
        e.preventDefault();
        if (e.button == 0) mouse.buttonLeft = true;
        if (e.button == 1) mouse.buttonMiddle = true;
        if (e.button == 2) mouse.buttonRight = true;


    };

    const onMouseUp = (e) => {
        if (e.button == 0) mouse.buttonLeft = false;
        if (e.button == 1) mouse.buttonMiddle = false;
        if (e.button == 2) mouse.buttonRight = false;



    };

    const onMouseMove = (e) => {
        // setLol(prev => prev + 1);   //enable to retrigger re-render
        const ctx = contextRef.current;
        updateMouseCoordinates(e);
        if (mouse.buttonLeft) ctx.fillRect(mouse.x-8, mouse.y-8, 16, 16);
    };

    const onMouseLeave = (e) => {

    };

    window.oncontextmenu = function(e) {
        if(e.target.id === "canvas") e.preventDefault();
    }

    const updateMouseCoordinates = (e) => {
        const offset = canvasRef.current.getBoundingClientRect();
        mouse.x = e.nativeEvent.x - offset.left;
        mouse.y = e.nativeEvent.y - offset.top;
    }

    return (
        <canvas
            className="canvas"
            id="canvas"
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        />
    );
}