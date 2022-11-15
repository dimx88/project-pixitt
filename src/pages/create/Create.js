// Hooks
import { useState } from 'react';

import { useGlobals } from '../../hooks/useGlobals';

// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';
import { useRef } from 'react';

import UndoManager from './undoManager';

// Styles
import './Create.css';



export default function Create() {

    console.log('created rendered');

    // const [globals, setGlobals] = useState({paletteToolbar: null, canvasRef: null, undoManager: null});

    // const globals = useRef({paletteToolbar: null, canvasRef: null, undoManager: null});
    const undoManager = useRef();
    if (!undoManager.current) undoManager.current = new UndoManager();

    const { globals } = useGlobals({ paletteToolbar: null, canvasRef: null, undoManager: undoManager.current })


    return (
        <div className="drawing-app">
            <Palette globals={globals} />
            <div className="canvas-saveform">
                <Canvas globals={globals} />
                <SaveDrawingForm globals={globals} />

            </div>
        </div>
    );
}