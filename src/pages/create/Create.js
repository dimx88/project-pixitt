// Hooks
import { useState, useRef } from 'react';



// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';

// Styles
import './Create.css';


export default function Create() {

    console.log('created rendered');

    const [canvasRef, setCanvasRef] = useState(null);

    const [paletteRef, setPaletteRef] = useState(null);

    const [appGlobals, setAppGlobals] = useState({paletteToolbar: null, canvasRef: null, undoManager: null});

    const drawingAppShared = useRef({paletteToolbar: null});





    return (
        <div className="drawing-app">
            <Palette drawingAppShared={drawingAppShared.current} setPaletteRef={setPaletteRef} appGlobals={appGlobals} setAppGlobals={setAppGlobals} />
            <div className="canvas-saveform">
                <Canvas setCanvasRef={setCanvasRef} drawingAppShared={drawingAppShared.current} paletteRef={paletteRef} appGlobals={appGlobals} setAppGlobals={setAppGlobals}/>
                <SaveDrawingForm canvasRef={canvasRef} drawingAppShared={drawingAppShared.current} appGlobals={appGlobals} setAppGlobals={setAppGlobals} />

            </div>
        </div>
    );
}