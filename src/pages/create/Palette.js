
// Utils
import { useEffect, useRef } from "react";
import PaletteToolbar from "../../utils/paletteToolbar";

// Styles
import './Palette.css';

// Method 1: declare variable outside component scope. creates a variable with a global scope in relation to all instances of this component\
// Method 2 : useRef
// Both methods seem to get the same result, but Method 1 just results in cleaner code
const paletteToolbar = new PaletteToolbar(); // Method 1


export default function Palette({ globals, setGlobals }) {

    const paletteCanvasRef = useRef(null);


    // const paletteToolbarRef = useRef(); // Method 2
    // if (!paletteToolbarRef.current)
    //     paletteToolbarRef.current = new PaletteToolbar();


    useEffect(() => {
        
        paletteToolbar.setCanvasAndRun(paletteCanvasRef.current);  // Method 1
        // paletteToolbarRef.current.setCanvasAndRun(paletteCanvasRef.current); // Method 2

        setGlobals((prev) => ({ ...prev, paletteToolbar}));  // Method 1
        // setGlobals((prev) => ({ ...prev, paletteToolbar: paletteToolbarRef.current }));  // Method 2



        // Cleanup
        return () => {
            paletteToolbar.removeListeners();  // Method 1
            // paletteToolbarRef.current.removeListeners(); // Method 2
        }
    }, [setGlobals]);

    return (
        <canvas className="palette" width="500px" height="180px" ref={paletteCanvasRef}>

        </canvas>
    );
}