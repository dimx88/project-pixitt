

export function freehandTool(canvasFunctions, pixelsRef, mouse, globals) {
    console.log('Freehand tool created');

    const {
        screenToPixelCoords,
        isWithinBounds,
        floodFill,
        drawLine,
        // setPixel,
        getPixel,
        // getLineBetween,
        // renderPixel,
        render
    } = canvasFunctions;


    let drawing = false;

    function onEvent(e) {

        if (!drawing) {
            if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {  // Start drawing
                globals.get.undoManager.takeSnapshot(pixelsRef.current);
                drawing = true;
            }

            if (mouse.button[1] && !mouse.button[0] && !mouse.button[2]) {  // Color picking
                const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
                globals.get.paletteToolbar.getCellByColor(getPixel(pos.x, pos.y));
                // locked = true;
                return;
            }

            if (mouse.button[2] && !mouse.button[0] && !mouse.button[1]) {  // Filling
                globals.get.undoManager.takeSnapshot(pixelsRef.current);
                const pos = screenToPixelCoords(mouse.pos);
                floodFill(pos.x, pos.y, globals.get.paletteToolbar.activeColor);
                render();
                // locked = true;
                return;
            }
        }

        if (drawing) {
            if (!mouse.button[0] || mouse.button[1] || mouse.button[2]) {
                drawing = false;
                return;
            }

            const pos = screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            const prevPos = screenToPixelCoords(mouse.prevPos.x, mouse.prevPos.y);

            if (isWithinBounds(pos.x, pos.y) && isWithinBounds(prevPos.x, prevPos.y)) {
                drawLine(prevPos, pos, globals.get.paletteToolbar.activeColor);
            }
        }

    }

    return { onEvent };
}