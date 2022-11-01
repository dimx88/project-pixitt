// Components
import CanvasDetails from '../../components/CanvasDetails';

import { useParams } from 'react-router-dom';



export default function Canvas() {
    const {id:canvasID} = useParams();
    console.log(canvasID);
    return (
        <div className="canvas">
            <h1>Canvas ID: {canvasID}</h1>
        </div>
    );
}