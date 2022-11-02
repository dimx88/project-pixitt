import { Link, useNavigate } from 'react-router-dom';

// Styles
import './GalleryDisplay.css';

export default function GalleryDisplay({ documents }) {

    const nav = useNavigate();

    return (
        <div className="gallery-display">


            {documents.map((doc) => (
                <div className="gallery-item" key={doc.id}>
                    
                    <h3>{doc.drawingTitle}</h3>

                    <img src={doc.drawingImgURL}
                        className="image"
                        alt={`${doc.drawingTitle} Image`}
                        onClick={() => nav(`/drawing/${doc.id}`)}
                    />

                    <p>By <strong><Link>{doc.createdBy}</Link></strong> </p>

                </div>
            ))}
        </div>
    );
}