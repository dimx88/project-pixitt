// Hooks
import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';


import { useNavigate } from 'react-router-dom';


// Styles
import './Create.css';

//-------------------------




// THIS IS A TEST COMPONENT 



//--------------------------


export default function Create() {
    const { addDocument, response } = useFirestore('drawings');

    const [drawingTitle, setDrawingTitle] = useState('');
    const [drawingInfo, setDrawingInfo] = useState('');
    const [drawingImgURL, setDrawingImgURL] = useState('');

    const { user } = useAuthContext();

    const nav = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        await addDocument({drawingTitle, drawingInfo, drawingImgURL, uid:user.uid, createdBy:user.displayName});
        nav('/gallery');
    };


    return (
        <div className="create">
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
                        <span>Drawing Info</span>
                        <input type="text"
                            required
                            onChange={(e) => setDrawingInfo(e.target.value)}
                            value={drawingInfo}
                        />
                    </label>
                    <label>
                        <span>(Drawing Image URL)</span>
                        <input type="text"
                            required
                            onChange={(e) => setDrawingImgURL(e.target.value)}
                            value={drawingImgURL}
                        />
                    </label>

                    {!response.isPending && <button className="btn" onClick={onSubmit}>Save Drawing</button>}
                    {response.isPending && <button className="btn" disabled>Saving...</button>}
                </form>
            </div>

        </div>
    );
}