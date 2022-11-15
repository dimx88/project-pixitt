export default class smartTool {
    // What data am I going to need?
    // mouse, canvas, listen to events

    // Should I make this a class or a function?
    constructor(mouse) {

    }
}

export default function smartTool() {

    const states = { IDLE: 'IDLE', DRAWING: 'DRAWING', FILLING: 'FILLING', COLOR_PICKING: 'COLOR_PICKING', LOCKED: 'LOCKED' };
    const state = { current: states.IDLE };


    function executeCurrentState() {
        // console.log('executing ', state.current, Math.random().toFixed(4));
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
        // console.log(globals);
    }


    function executeState_IDLE() {
        if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            globals.undoManager.takeSnapshot(pixels);
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
            drawLine(prevPos, pos, globals.paletteToolbar.activeColor);
    }



    function executeState_FILLING() {
        if (mouse.button[0] || mouse.button[1]) {
            setState(states.LOCKED);
            return;
        }
        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            if (!isWithinBounds(pos.x, pos.y)) return;

            globals.undoManager.takeSnapshot(pixels);
            const floodedPixels = floodFill(pos.x, pos.y, globals.paletteToolbar.activeColor);
            render(floodedPixels);
            setState(states.IDLE);
            return;
        }
    }

    function executeState_COLOR_PICKING() {
        if (!mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {
            if (globals.paletteToolbar) {
                const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);

                globals.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
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


}