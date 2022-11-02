

// Styles
import './DrawingDetails.css';

export default function DrawingDetails({ drawing }) {
    // if (!drawing) return (<div className="error">...</div>);

    return (
        <div className="drawing-details">
                <h1>{drawing.drawingTitle}</h1>
                <p className="created-by">By {drawing.createdBy}</p>
                <img src={drawing.drawingImgURL} className="image" alt={`${drawing.drawingTitle}`} />
                <p className="created-at">Created at {drawing.createdAt.toDate().toDateString()}</p>
                <p className="description-title"><strong>description:</strong></p>
                <p className="description">{drawing.drawingInfo}</p>
        </div>
    );
}