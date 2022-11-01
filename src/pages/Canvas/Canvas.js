// Components
import CanvasDetails from './CanvasDetails';

// Hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import AddCommentForm from './AddCommentForm';



export default function Canvas() {
    const { id: canvasID } = useParams();


    const { document, error } = useDocument('canvases', canvasID);
    const nav = useNavigate();

    if (error) nav('/gallery');

    return (
        <div className="canvas">
            <div className="container">
                {document && <CanvasDetails canvas={document} className="canvas-details" />}
                {document && <AddCommentForm canvasID={document.id}/>}
            </div>
        </div>
    );

}