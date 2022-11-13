// Hooks
import { useState } from 'react';



// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';

// Styles
import './Create.css';



export default function Create() {

    console.log('created rendered');

    // const [globals, setGlobals] = useState({paletteToolbar: null, canvasRef: null, undoManager: null});

    // const globals = useRef({paletteToolbar: null, canvasRef: null, undoManager: null});
    const [globals, setGlobals] = useState({paletteToolbar: null, canvasRef: null, undoManager: null});


    return (
        <div className="drawing-app">
            <Palette globals={globals} setGlobals={setGlobals}/>
            <div className="canvas-saveform">
                <Canvas  globals={globals} setGlobals={setGlobals}/>
                <SaveDrawingForm  globals={globals} setGlobals={setGlobals}/>

            </div>
        </div>
    );
}