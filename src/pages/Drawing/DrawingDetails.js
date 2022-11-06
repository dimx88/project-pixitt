// Hooks
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';

// Styles
import './DrawingDetails.css';

export default function DrawingDetails({ drawing, uid }) {
    // if (!drawing) return (<div className="error">...</div>);
    const nav = useNavigate();
    const { deleteDocument } = useFirestore('drawings');

    const onPressDelete = (e) => {
        deleteDocument(drawing.id);
        nav('/gallery');
    }

    return (
        <div className="drawing-details">
            {uid === drawing.uid && <button className="btn" onClick={onPressDelete}>(delete)</button>}
            <h1>{drawing.drawingTitle}</h1>
            <p className="created-by">By {drawing.createdBy}</p>
            <img src={drawing.thumbnailURL} className="image" alt={`${drawing.drawingTitle}`} />
            <p className="created-at">Created at {drawing.createdAt.toDate().toDateString()}</p>
            <p className="description-title"><strong>description:</strong></p>
            <p className="description">{drawing.drawingInfo}</p>
        </div>
    );
}