
// Utils
import { useEffect, useRef } from "react";
import PaletteGen from "../../utils/paletteGen";

// Styles
import './Palette.css';

export default function Palette() {
    let palette;
    const paletteCanvasRef = useRef(null);

    useEffect(() => {
        palette = new PaletteGen(paletteCanvasRef.current, window);
    }, [])

    return (
        <canvas className="palette" width="500px" height="180px" ref={paletteCanvasRef}>

        </canvas>
    );
}