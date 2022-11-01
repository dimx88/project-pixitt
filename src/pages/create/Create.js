// Hooks
import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';


import { useNavigate } from 'react-router-dom';


// Styles
import './Create.css';


export default function Create() {
    const { addDocument, response } = useFirestore('canvases');

    const [canvasTitle, setCanvasTitle] = useState('');
    const [canvasInfo, setCanvasInfo] = useState('');
    const [canvasImgURL, setCanvasImgURL] = useState('');

    const { user } = useAuthContext();

    const nav = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        await addDocument({canvasTitle, canvasInfo, canvasImgURL, uid:user.uid, createdBy:user.displayName});
        nav('/gallery');
    };

    return (
        <div className="create">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1>Create Test</h1>
                    <label>
                        <span>Canvas Title</span>
                        <input type="text"
                            required
                            onChange={(e) => setCanvasTitle(e.target.value)}
                            value={canvasTitle}
                        />
                    </label>
                    <label>
                        <span>Canvas Info</span>
                        <input type="text"
                            required
                            onChange={(e) => setCanvasInfo(e.target.value)}
                            value={canvasInfo}
                        />
                    </label>
                    <label>
                        <span>(Canvas Image URL)</span>
                        <input type="text"
                            required
                            onChange={(e) => setCanvasImgURL(e.target.value)}
                            value={canvasImgURL}
                        />
                    </label>

                    {!response.isPending && <button className="btn" onClick={onSubmit}>Save Canvas</button>}
                    {response.isPending && <button className="btn" disabled>Saving...</button>}
                </form>
            </div>

        </div>
    );
}