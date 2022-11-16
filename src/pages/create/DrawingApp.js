// Hooks

import { useGlobals } from '../../hooks/useGlobals';

// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';
import { useRef } from 'react';

import UndoManager from './undoManager';

// Styles
import './DrawingApp.css';



export default function DrawingApp() {

    console.log('created rendered');

    const undoManager = useRef();
    if (!undoManager.current) undoManager.current = new UndoManager();

    const { globals } = useGlobals({ paletteToolbar: null, canvasRef: null, tempCanvasRef: null, undoManager: undoManager.current })


    return (
        <div className="drawing-app">
            <Palette globals={globals} />

            <Canvas globals={globals} />
            <SaveDrawingForm globals={globals} />

        </div>
    );
}