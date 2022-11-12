
// Utils
import { useEffect, useRef } from "react";
import PaletteToolbar from "../../utils/paletteToolbar";

// Styles
import './Palette.css';

export default function Palette({ globals, setGlobals }) {

    let paletteToolbar;
    const paletteCanvasRef = useRef(null);

    useEffect(() => {
        paletteToolbar = new PaletteToolbar(paletteCanvasRef.current, window);
        setGlobals({...globals, paletteToolbar});

        return () => {
            paletteToolbar.removeListeners();
        }
    }, [])

    return (
        <canvas className="palette" width="500px" height="180px" ref={paletteCanvasRef}>

        </canvas>
    );
}