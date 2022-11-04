
// Utils
import Mouse from '../../utils/mouse';
import getLineBetween from '../../utils/getLine';

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
        const ctx = contextRef.current;

        mouse.follow(canvas, true);

        drawGrid();

    }, []);

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

        drawLine({ x: pos.col, y: pos.row }, { x: prevPos.col, y: prevPos.row });
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
        return { col: ~~(x / pixelSize), row: ~~(y / pixelSize) };
    }

    const drawLine = (point1, point2) => {
        const line = getLineBetween(point1, point2);

        for (let point of line) {
            setPixel(point.x, point.y, '#000000');
            renderPixel(point.x, point.y);
        }
    }

    const setPixel = (col, row, color) => {
        pixels[col + row * dimensions.width] = color;
        // console.log(`set pixel ${col}, ${row} to ${color}`)
    }

    const getPixel = (col, row) => {
        return pixels[col + row * dimensions.width];
    }


    const renderPixel = (col, row) => {
        const ctx = contextRef.current;

        // ctx.fillStyle = getPixel(x, y);
        ctx.fillStyle = '#000000';
        ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);

    }

    const fill = (cow, row) => {

    }

    function render() {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;

        for (let pixel of pixels) {
            // ctx.clear(0, 0, canvas.width, canvas.height);
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





    return (
        <canvas
            className="canvas"
            id="canvas"
            ref={canvasRef}
            width={dimensions.width * pixelSize}
            height={dimensions.height * pixelSize}
            onMouseDown={executeCurrentState}
            onMouseUp={executeCurrentState}
            onMouseMove={executeCurrentState}
        />
    );
}