// Hooks
import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';


import { useNavigate } from 'react-router-dom';


// Styles
import './AddCommentForm.css';


export default function AddCommentForm({ canvasID }) {

    const { user } = useAuthContext();
    const [comment, setComment] = useState('');

    const { addDocument, response } = useFirestore('canvases', canvasID, 'comments');


    const onSubmit = (e) => {
        e.preventDefault();
   
        const commentData = { comment, uid: user.uid, displayName: user.displayName };
        addDocument({commentData});

    };

    return (
        // <div className="add-comment">
        <form onSubmit={onSubmit} className="add-comment">
            <label>
                <span>Post a comment</span>
                <textarea
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                ></textarea>
            </label>
            {!response.isPending && <button className="btn" onClick={onSubmit}>Submit</button>}
            {response.isPending && <button className="btn" disabled>Sending..</button>}
        </form>
        // </div>
    );
}