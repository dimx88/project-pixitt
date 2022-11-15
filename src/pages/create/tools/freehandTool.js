

export function freehandTool(canvasFunctions, pixelsRef, mouse, globals) {
    console.log('Freehand tool created');

    let drawing = false;

    function onEvent(e) {

        if (!drawing) {
            if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
                globals.get.undoManager.takeSnapshot(pixelsRef.current);
                drawing = true;
            }
        }

        if (drawing) {
            if (!mouse.button[0] || mouse.button[1] || mouse.button[2]) {
                drawing = false;
                return;
            }

            const pos = canvasFunctions.screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            const prevPos = canvasFunctions.screenToPixelCoords(mouse.prevPos.x, mouse.prevPos.y);

            if (canvasFunctions.isWithinBounds(pos.x, pos.y) && canvasFunctions.isWithinBounds(prevPos.x, prevPos.y)) {
                canvasFunctions.drawLine(prevPos, pos, globals.get.paletteToolbar.activeColor);
            }
        }

    }

    return { onEvent };
}