import './ToolsPanel.css';

export default function ToolsPanel({ globals }) {

    console.log('tools rendered');
    console.log('active tool = ', globals.get.activeTool);
    return (
        <div className="tools-panel">
            <button className={`btn ${globals.get.activeTool === 'freehandTool' ? 'active' : ''}`} onClick={() => globals.get.setActiveTool('freehandTool')}>Freehand</button>
            <button className={`btn ${globals.get.activeTool === 'lineTool' ? 'active' : ''}`} onClick={() => globals.get.setActiveTool('lineTool')}>Line</button>
            <button className="btn undo" onClick={() => globals.get.undo()}>Undo</button>
        </div>
    );
}