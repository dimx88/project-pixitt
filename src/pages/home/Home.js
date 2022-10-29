
// Styles
import './Home.css';


export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to Pixitt</h1>
            <div className="section">
                <div className="container">
                    <h2>Create</h2>
                    <p>Express yourself with fixed sized pixel drawings, using Pixitt's clean minimalistic interface</p>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <h2>Share</h2>
                    <p>Share your creations with the world</p>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <h2>Discover</h2>
                    <p>Watch and get inspired by other people's creations</p>
                </div>
            </div>
        </div>
    );
}