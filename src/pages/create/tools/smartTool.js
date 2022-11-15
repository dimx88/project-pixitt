export default class smartTool {
    // What data am I going to need?
    // mouse, canvas, listen to events

    // Should I make this a class or a function?
    constructor(mouse) {

    }
}

export default function smartTool() {

    const states = { IDLE: 'IDLE', DRAWING: 'DRAWING', FILLING: 'FILLING', COLOR_PICKING: 'COLOR_PICKING', LOCKED: 'LOCKED' };
    const state = { current: states.IDLE };

}