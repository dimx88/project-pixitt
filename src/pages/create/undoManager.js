export default class UndoManager {
    static instance = null;

    constructor() {
        this.maxUndoSteps = 50;
        this.history = [];
        console.log('undo manager created');
    }

    takeSnapshot(state) {
        // If undo memory is maxed out, remove the oldest history slot 
        if (this.history.length >= this.maxUndoSteps) {
            this.history.shift();
        }

        // Copy the new array and add it to history
        const stateCopy = state.slice();
        this.history.push(stateCopy);

        console.log('snapshot taken');

    }

    undo(current) {
        if (this.history.length > 0) {
            console.log('Undone');
            return this.history.pop();
        } else {
            console.log('No undo states')
            return current;
        }
    }

    canUndo() {
        return this.history.length > 0;
    }
}