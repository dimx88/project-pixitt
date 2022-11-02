// Components
import CanvasDetails from './CanvasDetails';

// Hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import AddCommentForm from './AddCommentForm';
import DisplayComments from './DisplayComments';
import { useAuthContext } from '../../hooks/useAuthContext';

import { useFirestore } from '../../hooks/useFirestore';    /////////////// 


// Styles
import './Canvas.css';

export default function Canvas() {

    const { user } = useAuthContext();
    const { id: canvasID } = useParams();


    const { document, error } = useDocument('canvases', canvasID);
    const nav = useNavigate();

    if (error) nav('/gallery');

    return (
        <div className="canvas">
            <div className="container">

                {document && <CanvasDetails canvas={document} className="canvas-details" />}
                {user && document && <AddCommentForm canvasID={document.id} />}
                {document && <DisplayComments canvasID={document.id} />}

            </div>
        </div>
    );

}