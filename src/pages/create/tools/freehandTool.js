

export function freehandTool(canvasFunctions, mouse, globals) {
    console.log('Freehand tool created');

    let drawing = false;

    function onEvent(e) {
        if (mouse.button[0] && !mouse.button[1] && !mouse.button[2]) {
            drawing = true;
        }

        if (!mouse.button[0]) {
            drawing = false;
        }

        if (drawing) {
            console.log('freehandTool drawing');
            const pos = canvasFunctions.screenToPixelCoords(mouse.pos.x, mouse.pos.y);
            const prevPos = canvasFunctions.screenToPixelCoords(mouse.prevPos.x, mouse.prevPos.y);

            if (canvasFunctions.isWithinBounds(pos.x, pos.y) && canvasFunctions.isWithinBounds(prevPos.x, prevPos.y)) {
                canvasFunctions.drawLine(prevPos, pos, '#333333');
            }
        }

    }

    return { onEvent };
}