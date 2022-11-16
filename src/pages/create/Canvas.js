
import { useEffect, useRef } from 'react';


// Utils
import Mouse from '../../utils/mouse';
import getLineBetween from '../../utils/getLine';

// Drawing tools
import { freehandTool } from './tools/freehandTool';
import { lineTool } from './tools/lineTool';

//  Styles
import './Canvas.css';




export default function Canvas({ globals }) {

    console.log('canvas rendered');


    // Setup
    //-----------------------------------------------------

    const canvasRef = useRef();
    const tempCanvasRef = useRef();
    // const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;

    const dimensions = { width: 96, height: 64 };
    const pixelSize = 12;
    const defaultBackgroundColor = '#666666';

    // let pixels = useRef(new Array(dimensions.width * dimensions.height).fill(defaultBackgroundColor)).current;
    const pixelsRef = useRef();
    if (!pixelsRef.current) pixelsRef.current = new Array(dimensions.width * dimensions.height).fill(defaultBackgroundColor);

    const mouse = useRef(new Mouse(null, true)).current;




    // Tools setup
    const toolsRef = useRef();
    const canvasFunctions = {
        screenToPixelCoords,
        isWithinBounds,
        floodFill,
        drawLine,
        setPixel,
        getPixel,
        getLineBetween,
        renderPixel,
        render
    };
    if (!toolsRef.current) {
        toolsRef.current = {
            freehandTool: freehandTool(canvasFunctions, pixelsRef, mouse, globals),
            lineTool: lineTool(canvasFunctions, pixelsRef, mouse, globals)
        };
    }

    //-----------------------------------------------------
    const executeCurrentStateRef = useRef();
    executeCurrentStateRef.current = executeCurrentState;
    const renderRef = useRef();
    renderRef.current = render;
    //--------------------------------------------------------
    useEffect(() => {
        // Pass a reference of the drawing canvas element to the globals
        if (!globals.get.canvsRef) globals.set('canvasRef', canvasRef.current);
        if (!globals.get.tempCanvsRef) globals.set('tempCanvasRef', tempCanvasRef.current);


        // Don't create event listeners until we have a reference to the palette and undo manager
        if (!globals.get.paletteToolbar || !globals.get.undoManager) return;



        const executeCurrentStateWrapper = executeCurrentStateRef.current;


        // Mouse util -> add listeners and offset the coordinates relative to the drawing canvas element
        mouse.follow(canvasRef.current);

        const undo = (e) => {
            if (e.code === 'KeyZ') {
                pixelsRef.current = globals.get.undoManager.undo(pixelsRef.current);
                renderRef.current(null, true);
            }
        }

        // Add listeners
        document.addEventListener('keydown', undo);

        document.addEventListener('mousedown', executeCurrentStateWrapper);
        document.addEventListener('mouseup', executeCurrentStateWrapper);
        document.addEventListener('mousemove', executeCurrentStateWrapper);



        // Cleanup
        return () => {
            document.removeEventListener('keydown', undo);

            document.removeEventListener('mousedown', executeCurrentStateWrapper);
            document.removeEventListener('mouseup', executeCurrentStateWrapper);
            document.removeEventListener('mousemove', executeCurrentStateWrapper);
            mouse.removeListeners();
        };

    }, [mouse, globals]);

    if (canvasRef.current) {
        render();
    }

    // State machine
    // ---------------------------------------


    const states = { IDLE: 'IDLE', DRAWING: 'DRAWING', FILLING: 'FILLING', COLOR_PICKING: 'COLOR_PICKING', LOCKED: 'LOCKED' };
    const state = { current: states.IDLE };


    function executeCurrentState(e) {
        toolsRef.current.lineTool.onEvent(e);
        // toolsRef.current.freehandTool.onEvent(e);

        return;
        // console.log('executing ', state.current, Math.random().toFixed(4));
        // eslint-disable-next-line
        switch (state.current) {
            case states.IDLE:
                return executeState_IDLE();
            case states.DRAWING:
                return executeState_DRAWING();
            case states.FILLING:
                return executeState_FILLING();
            case states.COLOR_PICKING:
                return executeState_COLOR_PICKING();
            case states.LOCKED:
                return executeState_LOCKED();
            default:
                return;
        }
    }

    function setState(newState) {
        // console.log('set state to -> ' + newState);
        state.current = newState;
    }


    function executeState_IDLE() {
        if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            globals.get.undoManager.takeSnapshot(pixelsRef.current);
            setState(states.DRAWING);
            executeCurrentState();
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

    function executeState_DRAWING() {
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
            drawLine(prevPos, pos, globals.get.paletteToolbar.activeColor);
    }



    function executeState_FILLING() {
        if (mouse.button[0] || mouse.button[1]) {
            setState(states.LOCKED);
            return;
        }
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            if (!isWithinBounds(pos.x, pos.y)) return;

            globals.get.undoManager.takeSnapshot(pixelsRef.current);
            const floodedPixels = floodFill(pos.x, pos.y, globals.get.paletteToolbar.activeColor);
            render(floodedPixels);
            setState(states.IDLE);
            return;
        }
    }

    function executeState_COLOR_PICKING() {
        if (!mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {
            if (globals.get.paletteToolbar) {
                const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);

                globals.get.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
            }


            setState(states.IDLE);
            return;
        }
    }

    function executeState_LOCKED() {
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            setState(states.IDLE);
            return;
        }
    }




    // Helper functions
    //--------------------------------

    function screenToPixelCoords(x, y) {
        if (!y) return {x: ~~(x.x / pixelSize), y: ~~(x.y / pixelSize)};    // If an {x: y:} object was passed instead of seperate x y values

        return { x: ~~(x / pixelSize), y: ~~(y / pixelSize) };
    }


    function drawLine(point1, point2, color) {
        const line = getLineBetween(point1, point2);
        for (let pixel of line) {
            setPixel(pixel.x, pixel.y, color);
        }

        render(line);
    }

    function floodFill(x, y, fillColor) {

        const oldColor = getPixel(x, y);

        if (oldColor === fillColor) return;

        const updatedPixels = [];
        const queue = [];

        queue.push({ x, y });

        while (queue.length > 0) {
            const currentPixel = queue.pop();

            if (!isWithinBounds(currentPixel.x, currentPixel.y)) continue;

            if (getPixel(currentPixel.x, currentPixel.y) === oldColor) {
                setPixel(currentPixel.x, currentPixel.y, fillColor);
                updatedPixels.push(currentPixel);
            }

            for (let neighbor of getNeighbors(currentPixel.x, currentPixel.y)) {
                if (getPixel(neighbor.x, neighbor.y) === oldColor)
                    queue.push(neighbor);
            }
        }

        return updatedPixels;
    }

    function isWithinBounds(x, y) {
        return (x >= 0 && x < dimensions.width && y >= 0 && y < dimensions.height);
    }

    function getNeighbors(x, y) {
        const neighborLeft = { x: x - 1, y: y };
        const neighborRight = { x: x + 1, y: y };
        const neighborUp = { x: x, y: y - 1 };
        const neighborDown = { x: x, y: y + 1 };
        return [neighborLeft, neighborRight, neighborDown, neighborUp];
    }

    function setPixel(x, y, color) {
        pixelsRef.current[x + y * dimensions.width] = color;
    }

    function getPixel(x, y) {
        return pixelsRef.current[x + y * dimensions.width];
    }


    function renderPixel(x, y, ctx, color) {
        ctx.fillStyle = color || getPixel(x, y);
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    }

    function renderPixels(pixelsArr, ctx) {
        for (let pixel of pixelsArr) {
            renderPixel(pixel.x, pixel.y, ctx);
        }
    }



    function render(pixelsArr, shouldClear) {
        const ctx = canvasRef.current.getContext('2d');

        if (shouldClear) { clearCanvas() };

        if (pixelsArr) {
            return renderPixels(pixelsArr, ctx);
        }

        for (let i = 0; i < pixelsRef.current.length; i++) {
            const x = i % dimensions.width;
            const y = ~~(i / dimensions.width);
            renderPixel(x, y, ctx);
        }

    }

    function clearCanvas() {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }



    const display = { width: dimensions.width * pixelSize, height: dimensions.height * pixelSize };
    return (
        <div className="canvas-wrapper" style={display}>

            <canvas
                className="temp-canvas"
                ref={tempCanvasRef}
                width={display.width}
                height={display.height}
            />
            <canvas
                className="canvas"
                ref={canvasRef}
                width={display.width}
                height={display.height}
            />

        </div>
    );
}