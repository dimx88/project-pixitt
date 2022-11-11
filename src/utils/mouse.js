export default class Mouse {

    constructor(element = null, preventDefault = false) {
        // Button supports both numeric and named reference
        this.button = { left: false, middle: false, right: false, '0': false, '1': false, '2': false };

        this._pos = { x: null, y: null };
        this._prevPos = { x: null, y: null };

        this.preventDefault = preventDefault;
        this.element = element;


        // Commit listener bindings here so that it's possible to remove them later via removeEventListener
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onContextMenu = this.onContextMenu.bind(this);

    }

    follow(element) {
        this.registerListeners();
        this.element = element;
    }

    registerListeners() {
        document.addEventListener('mousedown', this._onMouseDown);
        document.addEventListener('mouseup', this._onMouseUp);
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('contextmenu', this._onContextMenu);
    }

    removeListeners() {
        document.removeEventListener('mousedown', this._onMouseDown);
        document.removeEventListener('mouseup', this._onMouseUp);
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('contextmenu', this._onContextMenu);
    }

    resetButtons() {
        for (let b in this.button) this.button[b] = false;
    }

    onContextMenu(e) {
        if (this.preventDefault && e.target === this.element) e.preventDefault();
        // if (this.preventDefault) e.preventDefault();
    }

    onMouseDown(e) {
        if (this.preventDefault && e.target === this.element) e.preventDefault();
        if (e.target !== this.element) return;

        this.setButtonState(e.button, true);

        // If pos has not been set yet (mouse clicked before moving first), set both prev and current position to the mouse position
        if (this._pos.x === null)  this._pos = this._prevPos = this.getMousePosition(e); 
    }

    onMouseUp(e) {
        this.setButtonState(e.button, false);
    }

    onMouseMove(e) {
        this.updatePosition(e);
    }

    getMousePosition(e) {
        const offset = this.element ? this.element.getBoundingClientRect() : { left: 0, top: 0 };
        const x = e.clientX - offset.left;
        const y = e.clientY - offset.top;

        return { x, y };
    }

    updatePosition(e) {
        const { x, y } = this.getMousePosition(e);

        this._prevPos = { x: this._pos.x, y: this._pos.y };

        this._pos.x = x;
        this._pos.y = y;
    }


    setButtonState(button, isDown) {
        this.button.left = (button === 0 && isDown) || (this.button.left && button !== 0);
        this.button.middle = (button === 1 && isDown) || (this.button.middle && button !== 1);
        this.button.right = (button === 2 && isDown) || (this.button.right && button !== 2);
        this.button[button] = isDown;

    }

    get pos() {
        return this._pos;
    }

    get prevPos() {
        return this._prevPos;
    }
}