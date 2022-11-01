// Hooks
import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';


import { useNavigate } from 'react-router-dom';


// Styles
import './AddCommentForm.css';


export default function AddCommentForm() {
    const [comment, setComment] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        // <div className="add-comment">
                <form onSubmit={onSubmit} className="add-comment">
                    <label>
                        <span>Post a comment</span>
                        <textarea
                        // required
                        // onChange={(e) => setComment(e.target.value)}
                        // value={comment}
                        ></textarea>
                    </label>
                    <button className="btn" onClick={onSubmit}>Submit</button>
                </form>
        // </div>
    );
}