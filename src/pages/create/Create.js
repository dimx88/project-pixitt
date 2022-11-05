// Hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';


// Componenets
import Canvas from './Canvas';


import { useNavigate } from 'react-router-dom';

// Styles
import './Create.css';
import { useUploadDrawing } from '../../hooks/useUploadDrawing';


//--------------------------
// THIS IS A TEST COMPONENT 




export default function Create() {

    const [drawingTitle, setDrawingTitle] = useState('');
    const [drawingInfo, setDrawingInfo] = useState('');
    const [canvasRef, setCanvasRef] = useState(null);

    const { user } = useAuthContext();
    const nav = useNavigate();

    const { uploadDrawing, isPending } = useUploadDrawing('drawings');


    const onSubmit = async (e) => {
        e.preventDefault();

        const drawingData = { drawingTitle, drawingInfo, thumbnailURL: '', uid: user.uid, createdBy: user.displayName };

        await uploadDrawing(drawingData, canvasRef);

        nav('/gallery');

    }
    

    return (
        <div className="create">
            <Canvas setCanvasRef={setCanvasRef} />
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1>Create Test</h1>
                    <label>
                        <span>Drawing Title</span>
                        <input type="text"
                            required
                            onChange={(e) => setDrawingTitle(e.target.value)}
                            value={drawingTitle}
                        />
                    </label>
                    <label>
                        <span>More Info</span>
                        <input type="text"
                            required
                            onChange={(e) => setDrawingInfo(e.target.value)}
                            value={drawingInfo}
                        />
                    </label>

                    {!isPending && <button className="btn" onClick={onSubmit}>Save Drawing</button>}
                    {isPending && <button className="btn" disabled>Saving...</button>}
                </form>
            </div>

        </div>
    );
}