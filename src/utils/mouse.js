export default class Mouse {

    constructor(element = null, preventDefault = false) {
        this.pos = { x: 0, y: 0 };
        this.prevPos = { x: 0, y: 0 };
        this.button = { left: false, middle: false, right: false, '0': false, '1': false, '2': false };
        this.leftElementBounds = false;
        this.preventDefault = preventDefault;

        this.element = element;


        // Commit listener bindings here so that it's possible to remove them later via removeEventListener
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onContextMenu = this.onContextMenu.bind(this);

        this.registerListeners();

    }

    registerListeners() {
        document.addEventListener('mousedown', this._onMouseDown);
        document.addEventListener('mouseup', this._onMouseUp);
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('contextmenu', this._onContextMenu);
    }


    follow(element) {
        this.element = element;
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
    }

    onMouseUp(e) {
        this.setButtonState(e.button, false);
    }

    onMouseMove(e) {
        const offset = this.element ? this.element.getBoundingClientRect() : { x: 0, y: 0 };

        this.prevPos = { x: this.pos.x, y: this.pos.y };
        this.pos.x = e.clientX - offset.left;
        this.pos.y = e.clientY - offset.top;
    }


    setButtonState(button, isDown) {
        this.button.left = (button === 0 && isDown) || (this.button.left && button !== 0);
        this.button.middle = (button === 1 && isDown) || (this.button.middle && button !== 1);
        this.button.right = (button === 2 && isDown) || (this.button.right && button !== 2);
        this.button[button] = isDown;

    }
}