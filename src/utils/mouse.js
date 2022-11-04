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

        // Add Listener
        window.addEventListener('mousedown', this._onMouseDown);
        window.addEventListener('mouseup', this._onMouseUp);
        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('contextmenu', this._onContextMenu);
    }


    follow(element) {
        // Unfollow existing element if one exists
        if (this.element) this.unfollow();

        this.element = element;
    }

    unfollow() {
        window.removeEventListener('mousedown', this._onMouseDown);
        window.removeEventListener('mouseup', this._onMouseUp);
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('contextmenu', this._onContextMenu);
        this.resetButtons();
        // console.log('mouse unfollowed');
    }

    resetButtons() {
        for (let b in this.button) this.button[b] = false;
    }



    onContextMenu(e) {
        if (!this.element) {
            this.unfollow();
            return;
        }
        
        // if (this.preventDefault && e.target == this.element) e.preventDefault();
        if (this.preventDefault) e.preventDefault()
    }

    onMouseDown(e) {
        if (!this.element) {
            this.unfollow();
            return;
        }
        
        if (this.preventDefault && e.target == this.element) e.preventDefault();

        this.setButtonState(e.button, true);
    }

    onMouseUp(e) {
        if (!this.element) {
            this.unfollow();
            return;
        }

        this.setButtonState(e.button, false);
    }

    onMouseMove(e) {
        if (!this.element) {
            this.unfollow();
            return;
        }

        const offset = this.element.getBoundingClientRect();
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