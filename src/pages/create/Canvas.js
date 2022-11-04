
// Utils
import Mouse from '../../utils/mouse';
import getLineBetween from '../../utils/getLine';
import { downloadCanvas, downloadThumbnail } from '../../utils/downloadCanvas';

//  Styles
import { useEffect, useRef, useState } from 'react';
import './Canvas.css';

export default function Canvas() {
    console.log('canvas component re-rendered');
    // Setup
    //-----------------------------------------------------

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const dimensions = { width: 126, height: 80 };
    const defaultBackgroundColor = '#ffffff';
    const pixelSize = 10;
    const pixels = new Array(dimensions.width * dimensions.height).fill(defaultBackgroundColor);

    const mouse = new Mouse(null, true);

    //-----------------------------------------------------

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');

        mouse.follow(canvas, true);



        // Add listener
        window.addEventListener('mousedown', onMouseEvent);
        window.addEventListener('mouseup', onMouseEvent);
        window.addEventListener('mousemove', onMouseEvent);

        render();
        // drawGrid();

        // Cleanup function
        return () => {
            window.removeEventListener('mousedown', onMouseEvent);
            window.removeEventListener('mouseup', onMouseEvent);
            window.removeEventListener('mousemove', onMouseEvent);
        };
    }, []);

    const onMouseEvent = (e) => {
        executeCurrentState();
    }




    // State machine
    // ---------------------------------------
    const states = { IDLE: 'IDLE', DRAWING: 'DRAWING', FILLING: 'FILLING', COLOR_PICKING: 'COLOR_PICKING', LOCKED: 'LOCKED' };
    const state = { current: states.IDLE };

    const setState = (newState) => {
        state.current = newState;
        console.log('set state to -> ' + newState);
        executeCurrentState();
    }

    const executeCurrentState = () => {
        switch (state.current) {
            case states.IDLE:
                executeState_IDLE();
                break;
            case states.DRAWING:
                executeState_DRAWING();
                break;
            case states.FILLING:
                executeState_FILLING();
                break;
            case states.COLOR_PICKING:
                executeState_COLOR_PICKING();
                break;
            case states.LOCKED:
                executeState_LOCKED();
                break;
        }
    }

    const executeState_IDLE = () => {
        if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.DRAWING);
            return;
        }
    }

    const executeState_DRAWING = () => {
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.IDLE);
            return;
        }

        if (mouse.button[2] || mouse.button[1]) {
            setState(states.LOCKED);
            return;
        }

        const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
        const prevPos = screenToPixelCoords(mouse.prevPos.x, mouse.prevPos.y);

        drawLine(prevPos, pos);
    }



    const executeState_FILLING = () => {

    }

    const executeState_COLOR_PICKING = () => {

    }

    const executeState_LOCKED = () => {
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.IDLE);
            return;
        }

    }

    const screenToPixelCoords = (x, y) => {
        return { x: ~~(x / pixelSize), y: ~~(y / pixelSize) };
    }


    const drawLine = (point1, point2) => {
        const line = getLineBetween(point1, point2);

        for (let point of line) {
            setPixel(point.x, point.y, '#000000');
            renderPixel(point.x, point.y);
        }
    }

    const fill = (x, y) => {

    }

    const setPixel = (x, y, color) => {
        pixels[x + y * dimensions.width] = color;
        // console.log(`set pixel ${x}, ${y} to ${color}`)
    }

    const getPixel = (x, y) => {
        return pixels[x + y * dimensions.width];
    }


    const renderPixel = (x, y) => {
        const ctx = contextRef.current;

        ctx.fillStyle = getPixel(x, y);
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    }

    function render() {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pixels.length; i++) {
            const x = i % dimensions.width;
            const y = ~~(i / dimensions.width);
            renderPixel(x, y);
        }
    }

    function drawGrid() {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;

        ctx.strokeStyle = '#dadada';
        for (let x = 0; x < canvas.width; x += pixelSize)
            for (let y = 0; y < canvas.height; y += pixelSize)
                ctx.strokeRect(x, y, pixelSize, pixelSize);

    }

    // ---------------------------------------------

    // document.onmousedown = function(e) {
    //     executeCurrentState();
    // }
    // document.onmouseup = function(e) {
    //     executeCurrentState();
    // }
    // document.onmousemove = function(e) {
    //     executeCurrentState();
    // }



    return (
        <>
            <div style={{ textAlign: 'center', border: '2px dashed red', width: 'fit-content', margin: 'auto' }}>
                <p>TestZone</p>
                <button onClick={() => downloadThumbnail(canvasRef.current)}>Download Thumbnail</button>
                <button onClick={() => uploadThumbnail(canvasRef.current)}>Upload Thumbnail</button>
            </div>

            <canvas
                className="canvas"
                id="canvas"
                ref={canvasRef}
                width={dimensions.width * pixelSize}
                height={dimensions.height * pixelSize}
            />
        </>
    );
}