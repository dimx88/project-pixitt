// Hooks
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore'; ////////////////////

// Styles
import './DisplayComments.css';

export default function DisplayComments({ drawingID }) {

    const {deleteDocument, updateDocument} = useFirestore(`drawings/${drawingID}/comments`); /////////////////
    
    // const { documents: comments, error } = useCollection(['drawings', drawingID, 'comments']);
    const { documents: comments, error } = useCollection(`drawings/${drawingID}/comments`);

    if (!comments) return <div>Loading comments...</div>;

    return (
        <div className="display-comments">
            <h3 className="title">Comments</h3>
            {comments.length < 1 && <p>No comments yet</p>}
            {comments.map(comment => (
                <div key={comment.id} className="comment">

                    <p className="author">By {comment.displayName}</p>
                    {comment.createdAt && <p className="date">{comment.createdAt.toDate().toDateString()}</p>}

                    <p>{comment.comment}</p>

                    {/* <button className="btn" onClick={() => deleteDocument(comment.id)}>delete</button> */}
                </div>
            ))}
        </div>
    );

}