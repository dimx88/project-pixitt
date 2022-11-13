// Hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUploadDrawing } from '../../hooks/useUploadDrawing';
import { useNavigate } from 'react-router-dom';


// Utils
import { downloadCanvas } from '../../utils/downloadCanvas';

// Styles
import './SaveDrawingForm.css';





export default function SaveDrawingForm({ globals, setGlobals }) {

    const [drawingTitle, setDrawingTitle] = useState('');
    const [drawingInfo, setDrawingInfo] = useState('');


    const { user } = useAuthContext();
    
    const nav = useNavigate();

    const { uploadDrawing, isPending } = useUploadDrawing('drawings');




    const onSubmit = async (e) => {
        e.preventDefault();

        const drawingData = { drawingTitle, drawingInfo, thumbnailURL: '', uid: user.uid, createdBy: user.displayName };

        await uploadDrawing(drawingData, globals.canvasRef, 1);

        nav('/gallery');

    }

    const loseFocus = (el) => {
        document.activeElement.blur();
    }


    if (!globals.canvasRef) return (<h1>Creating Canvas...</h1>);
    return (
        <div className="save-drawing" onMouseLeave={loseFocus}>
            <div className="cover">
                <h2>Save&#10140;</h2>    
            </div>   
            <form onSubmit={onSubmit}>
                <h2>Save your Drawing</h2>
                <label>
                    <span>Title</span>
                    <input type="text"
                        required
                        placeholder="Drawing title"
                        onChange={(e) => setDrawingTitle(e.target.value)}
                        value={drawingTitle}
                    />
                </label>
                <label>
                    <span>Description</span>
                    <input type="text"
                        required
                        placeholder="About this drawing"
                        onChange={(e) => setDrawingInfo(e.target.value)}
                        value={drawingInfo}
                    />
                </label>

                {!isPending && <button className="btn" onClick={onSubmit}>Save to Gallery</button>}
                {isPending && <button className="btn" disabled>Saving...</button>}
                {<button className="btn" onClick={() => downloadCanvas(globals.canvasRef)}>Download Image</button>}
            </form>

        </div>
    );
}