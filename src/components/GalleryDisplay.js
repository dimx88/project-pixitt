import { Link, useNavigate } from 'react-router-dom';

// Styles
import './GalleryDisplay.css';

export default function GalleryDisplay({ documents }) {

    const nav = useNavigate();

    return (
        <div className="gallery-display">


            {documents.map((doc) => (
                <div className="gallery-item" key={doc.id}>
                    
                    <h3>{doc.canvasTitle}</h3>

                    <img src={doc.canvasImgURL}
                        className="image"
                        alt={`${doc.canvasTitle} Image`}
                        onClick={() => nav(`/canvas/${doc.id}`)}
                    />

                    <p>By <strong><Link>{doc.createdBy}</Link></strong> </p>

                </div>
            ))}
        </div>
    );
}