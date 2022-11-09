
// Utils
import Mouse from '../../utils/mouse';
import getLineBetween from '../../utils/getLine';

//  Styles
import { useEffect, useRef } from 'react';
import './Canvas.css';



export default function Canvas({ setCanvasRef, drawingAppShared, paletteRef }) {

    console.log('canvas rendered');

    // Setup
    //-----------------------------------------------------

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // const dimensions = { width: 96, height: 64 };
    const dimensions = { width: 96, height: 64 };
    const pixelSize = 12;
    const defaultBackgroundColor = '#eeeeee';
    const pixels = new Array(dimensions.width * dimensions.height).fill(defaultBackgroundColor);

    // const randomHexColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);


    // const mouse = new Mouse(null, true);
    const mouse = new Mouse(canvasRef.current, true);



    //-----------------------------------------------------

    useEffect(() => {
        setCanvasRef(canvasRef.current);
        contextRef.current = canvasRef.current.getContext('2d');


        // Add listeners
        document.addEventListener('mousedown', onMouseEvent);
        document.addEventListener('mouseup', onMouseEvent);
        document.addEventListener('mousemove', onMouseEvent);




        render();

        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', onMouseEvent);
            document.removeEventListener('mouseup', onMouseEvent);
            document.removeEventListener('mousemove', onMouseEvent);
            mouse.removeListeners();
        };

    }, [render, setCanvasRef]);







    // State machine
    // ---------------------------------------

    const onMouseEvent = (e) => {
        executeCurrentState();
    }

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
            default: 
                return;
        }
    }

    const executeState_IDLE = () => {
        if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.DRAWING);
            return;
        }

        if (mouse.button[2] && !mouse.button[0] && !mouse.button[1]) {
            setState(states.FILLING);
            return;
        }

        if (mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {
            setState(states.COLOR_PICKING);
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

        if (isWithinBounds(pos.x, pos.y) && isWithinBounds(prevPos.x, prevPos.y))
            drawLine(prevPos, pos);
    }



    const executeState_FILLING = () => {
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            if (!isWithinBounds(pos.x, pos.y)) return;

            floodFill(pos.x, pos.y);
            setState(states.IDLE);
            render();
            return;
        }
    }

    const executeState_COLOR_PICKING = () => {
        if (!mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {
            if (drawingAppShared.paletteToolbar) {
                const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
                // drawingAppShared.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
                drawingAppShared.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
            }


            setState(states.IDLE);
            return;
        }
    }

    const executeState_LOCKED = () => {
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.IDLE);
            return;
        }

    }




    // Helper functions
    //--------------------------------

    const screenToPixelCoords = (x, y) => {
        // console.log(`mouse pos ${x}, ${y}`); 
        // console.log(`pixel pos ${~~(x / pixelSize)}, ${~~(y / pixelSize)}`);
        return { x: ~~(x / pixelSize), y: ~~(y / pixelSize) };
    }


    const drawLine = (point1, point2) => {
        const line = getLineBetween(point1, point2);

        for (let point of line) {
            setPixel(point.x, point.y, window.activeColor);
            renderPixel(point.x, point.y);
        }
    }

    const floodFill = (x, y) => {

        const oldColor = getPixel(x, y);
        const fillColor = window.activeColor;

        if (oldColor === fillColor) return;

        const queue = [];

        queue.push({ x, y });

        while (queue.length > 0) {
            const currentPixel = queue.pop();

            if (!isWithinBounds(currentPixel.x, currentPixel.y)) continue;

            if (getPixel(currentPixel.x, currentPixel.y) === oldColor) {
                setPixel(currentPixel.x, currentPixel.y, fillColor);
            }

            for (let neighbor of getNeighbors(currentPixel.x, currentPixel.y)) {
                if (getPixel(neighbor.x, neighbor.y) === oldColor)
                    queue.push(neighbor);
            }
        }
    }

    const isWithinBounds = (x, y) => {
        return (x >= 0 && x < dimensions.width && y >= 0 && y < dimensions.height);
    }

    const getNeighbors = (x, y) => {
        const neighborLeft = { x: x - 1, y: y };
        const neighborRight = { x: x + 1, y: y };
        const neighborUp = { x: x, y: y - 1 };
        const neighborDown = { x: x, y: y + 1 };
        return [neighborLeft, neighborRight, neighborDown, neighborUp];
    }

    const setPixel = (x, y, color) => {
        pixels[x + y * dimensions.width] = color;
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



    return (
        <canvas
            className="canvas"
            id="canvas"
            ref={canvasRef}
            width={dimensions.width * pixelSize}
            height={dimensions.height * pixelSize}
        />
    );
}