

export function downloadThumbnail(srcCanvas, scale = 0.1) {
    const thumbCanvas = createThumbnailCanvas(srcCanvas, scale);
    downloadCanvas(thumbCanvas);
    thumbCanvas.remove();
}

export function downloadCanvas(srcCanvas) {
    const link = document.createElement('a');
    link.setAttribute('id', 'link');
    link.setAttribute('download', 'canvasSnapshot.png');
    // link.setAttribute('href', srcCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));  // Seems to work the same without replace
    link.setAttribute('href', srcCanvas.toDataURL("image/png"));
    link.click();
    link.remove();
}

export function createThumbnailCanvas(srcCanvas, scale) {
    const width = srcCanvas.width * scale;
    const height = srcCanvas.height * scale;

    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.setAttribute('width', width);
    thumbCanvas.setAttribute('height', height);
    const thumbCtx = thumbCanvas.getContext('2d');
    thumbCtx.drawImage(srcCanvas, 0, 0, width, height);
    return thumbCanvas;
}