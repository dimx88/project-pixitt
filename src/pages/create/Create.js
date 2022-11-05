// Hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';

// Styles
import './Create.css';
import { useUploadDrawing } from '../../hooks/useUploadDrawing';


export default function Create() {

    const [canvasRef, setCanvasRef] = useState(null);
    const { user } = useAuthContext();



    return (
        <div className="drawing-app">
            <Palette />
            <div className="canvas-saveform">
                <Canvas setCanvasRef={setCanvasRef} />
                <SaveDrawingForm canvasRef={canvasRef} />

            </div>
        </div>
    );
}