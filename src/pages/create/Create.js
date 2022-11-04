// Hooks
import { useEffect, useRef, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

import { storage } from '../../firebase/config';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';

// Componenets
import Canvas from './Canvas';


import { useNavigate } from 'react-router-dom';

// Utils
import { createThumbnailCanvas } from '../../utils/downloadCanvas';


// Styles
import './Create.css';

//-------------------------




// THIS IS A TEST COMPONENT 



//--------------------------


export default function Create() {
    const { addDocument, updateDocument, response } = useFirestore('drawings');

    const [drawingTitle, setDrawingTitle] = useState('');
    const [drawingInfo, setDrawingInfo] = useState('');

    const { user } = useAuthContext();

    const nav = useNavigate();

    const [canvasRef, setCanvasRef] = useState(null);



    const onSubmit = async (e) => {
        e.preventDefault();
        // Upload the doc and get it's unique ID
        const docID = await submitDoc();

        // Create thumbnail image
        const thumbCanvas = createThumbnailCanvas(canvasRef, 0.2);
        thumbCanvas.toBlob((blob) => upload(blob));

        // Upload thumbnail image
        const upload = async (blob) => {
            const uploadPath = `thumbnails/${user.uid}/thumb_${docID}.png`;
            const storageRef = ref(storage, uploadPath);
            const uploaded = await uploadBytes(storageRef, blob);
            console.log(uploaded);
            const imgURL = await getDownloadURL(storageRef);
            console.log(imgURL);

            thumbCanvas.remove();

            // Update the image link in the doc
            await updateDocument(docID, { thumbnailURL: imgURL })
            console.log('updated image url');
            // Return to gallery
            nav('/gallery');

        }
    };

    const submitDoc = async () => {
        const addedDocument = await addDocument({ drawingTitle, drawingInfo, thumbnailURL: '', uid: user.uid, createdBy: user.displayName });
        console.log('added document. id = ' + addedDocument.id);
        return addedDocument.id;
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

                    {!response.isPending && <button className="btn" onClick={onSubmit}>Save Drawing</button>}
                    {response.isPending && <button className="btn" disabled>Saving...</button>}
                </form>
            </div>

        </div>
    );
}