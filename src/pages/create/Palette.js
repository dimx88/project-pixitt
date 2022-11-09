
// Utils
import { useEffect, useRef } from "react";
import PaletteToolbar from "../../utils/paletteToolbar";

// Styles
import './Palette.css';

export default function Palette({ drawingAppShared, setPaletteRef }) {

    let paletteToolbar;
    const paletteCanvasRef = useRef(null);

    useEffect(() => {
        paletteToolbar = new PaletteToolbar(paletteCanvasRef.current, window);
        drawingAppShared.paletteToolbar = paletteToolbar;
        setPaletteRef(paletteToolbar);
    }, [])

    return (
        <canvas className="palette" width="500px" height="180px" ref={paletteCanvasRef}>

        </canvas>
    );
}