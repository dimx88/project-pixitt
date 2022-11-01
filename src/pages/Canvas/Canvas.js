// Components
import CanvasDetails from '../../components/CanvasDetails';

// Hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';



export default function Canvas() {
    const { id: canvasID } = useParams();


    const { document, error } = useDocument('test', canvasID);
    const nav = useNavigate();

    if (error) nav('/gallery');

    return (
        <div className="canvas">
            <h1>Canvas ID: {canvasID}</h1>
        </div>
    );

}