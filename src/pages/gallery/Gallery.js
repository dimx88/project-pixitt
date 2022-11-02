// Components
import GalleryDisplay from './GalleryDisplay';

// Hooks
import { useCollection } from '../../hooks/useCollection';

// Styles
import './Gallery.css';


export default function Gallery() {
    
    const {documents, error} = useCollection('drawings');

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