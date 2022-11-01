

// Styles
import './CanvasDetails.css';

export default function CanvasDetails({ canvas }) {
    // if (!canvas) return (<div className="error">...</div>);

    return (
        <div className="canvas-details">
                <h1>{canvas.canvasTitle}</h1>
                <p className="created-by">By {canvas.createdBy}</p>
                <img src={canvas.canvasImgURL} className="image" alt={`${canvas.canvasTitle} image`} />
        </div>
    );
}