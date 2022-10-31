
// Styles
import './Home.css';


export default function Home() {
    return (
        <div className="home">
            <h1>Pixley</h1>
            <div className="section">
                <div className="container">
                <div className="title-container">
                        <h2>Create</h2>
                    </div>
                    <p>Express yourself on a fixed sized canvas, <br /> with an intuitive, minimalistic tool set</p>
                </div>
            </div>
            <div className="section">
                <div className="container">
                <div className="title-container">
                        <h2>Share</h2>
                    </div>
                    <p>Share your creations with the world</p>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="title-container">
                        <h2>Discover</h2>
                    </div>
                    <p>Watch other's art and get ispired</p>
                </div>
            </div>
        </div>
    );
}