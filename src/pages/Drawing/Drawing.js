// Components
import DrawingDetails from './DrawingDetails';

// Hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import AddCommentForm from './AddCommentForm';
import DisplayComments from './DisplayComments';
import { useAuthContext } from '../../hooks/useAuthContext';

import { useFirestore } from '../../hooks/useFirestore';    /////////////// 


// Styles
import './Drawing.css';

export default function Drawing() {

    const { user } = useAuthContext();
    const { id: drawingID } = useParams();


    const { document, error } = useDocument('drawings', drawingID);
    const nav = useNavigate();

    if (error) nav('/gallery');

    return (
        <div className="drawing">
            <div className="container">

                {document && <DrawingDetails drawing={document} className="drawing-details" />}
                {user && document && <AddCommentForm drawingID={document.id} />}
                {document && <DisplayComments drawingID={document.id} />}

            </div>
        </div>
    );

}