// Hooks

import { useGlobals } from '../../hooks/useGlobals';
import { useRef } from 'react';

// Componenets
import Canvas from './Canvas';
import SaveDrawingForm from './SaveDrawingForm';
import Palette from './Palette';
import ToolsPanel from './ToolsPanel';

import UndoManager from './undoManager';

// Styles
import './DrawingApp.css';



export default function DrawingApp() {

    console.log('created rendered');

    const undoManager = useRef();
    if (!undoManager.current) undoManager.current = new UndoManager();

    const { globals } = useGlobals({ 
        paletteToolbar: null, 
        canvasRef: null, 
        tempCanvasRef: null, 
        undoManager: undoManager.current,
        activeTool: null,
        setActiveTool: null
    });


    return (
        <div className="drawing-app">
            <Palette globals={globals} />
            <div className="tools-canvas-panel">
                <ToolsPanel globals={globals} />
                <Canvas globals={globals} />
            </div>
            <SaveDrawingForm globals={globals} />

        </div>
    );
}