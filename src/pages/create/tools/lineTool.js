

export function lineTool(canvasFunctions, pixelsRef, mouse, globals) {
    console.log('Line tool created');

    let drawing = false;
    let startPoint = { x: null, y: null };
    let endPoint = { x: null, y: null };
    let line = [];

    let locked = false;

    const {
        screenToPixelCoords,
        // isWithinBounds,
        floodFill,
        drawLine,
        // setPixel,
        getPixel,
        getLineBetween,
        renderPixel,
        render
    } = canvasFunctions;

    function initialize() {
        startPoint = { x: null, y: null };
        endPoint = { x: null, y: null };
        line = [];
    }



    function onEvent(e) {
        if (!globals.get.tempCanvasRef) return;

        if (!mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            locked = false;
        }

        if (locked) return;

        const tempCtx = globals.get.tempCanvasRef.getContext('2d');

        if (!drawing) {
            if (mouse.button[2] && !mouse.button[0] && !mouse.button[1]) {  // Filling
                globals.get.undoManager.takeSnapshot(pixelsRef.current);
                const pos = screenToPixelCoords(mouse.pos);
                floodFill(pos.x, pos.y, globals.get.paletteToolbar.activeColor);
                render();
                locked = true;
                return;
            }

            if (mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {  //  Color picking
                const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
                globals.get.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
                locked = true;
                return;
            }

            if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) { // Started drawing
                globals.get.undoManager.takeSnapshot(pixelsRef.current);
                drawing = true;
                startPoint = screenToPixelCoords(mouse.pos);
            }
        }

        if (drawing) {
            if (mouse.button[1] || mouse.button[2]) {
                locked = true;
                drawing = false;
                tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);
                initialize();
                return;
            }

            if (!mouse.button[0]) {   // Stopped holding left mouse button
                drawing = false;

                tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);

                drawLine(startPoint, endPoint, globals.get.paletteToolbar.activeColor);

                initialize();
                return;
            }

            endPoint = screenToPixelCoords(mouse.pos);
            line = getLineBetween(startPoint, endPoint);

            tempCtx.clearRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);

            for (let point of line) {
                renderPixel(point.x, point.y, tempCtx, globals.get.paletteToolbar.activeColor);
            }


        }

    }


    return { onEvent };
}