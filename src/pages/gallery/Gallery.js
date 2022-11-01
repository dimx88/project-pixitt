import GalleryDisplay from '../../components/GalleryDisplay';

// Styles
import './Gallery.css';


export default function Gallery() {
    return (
        <div className="gallery">
            <div className="container">
                <h1 className="title">Gallery</h1>
                <GalleryDisplay />
            </div>
        </div>
    );
}