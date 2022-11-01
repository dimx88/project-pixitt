// Components
import GalleryDisplay from '../../components/GalleryDisplay';

// Hooks
import { useCollection } from '../../hooks/useCollection';

// Styles
import './Gallery.css';


export default function Gallery() {
    
    const {documents, error} = useCollection(['canvases']);

    return (
        <div className="gallery">
            <div className="container">
                <h1 className="title">Gallery</h1>
                {documents && <GalleryDisplay documents={documents}/>}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}