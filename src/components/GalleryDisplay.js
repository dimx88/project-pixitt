

// Styles
import './GalleryDisplay.css';

export default function GalleryDisplay({ documents }) {
    return (
        <div className="gallery-display">

            {documents.map((doc) => (
                <div className="gallery-item" key={doc.id}>
                    <h3>{doc.canvasTitle}</h3>
                    <img src={doc.canvasImgURL} alt={`${doc.canvasTitle} Image`} />
                    <p>By <strong>{doc.createdBy}</strong> </p>
                </div>
            ))}
        </div>
    );
}