export default class Mouse {
   
    constructor(element) {
        this.pos = { x: 0, y: 0 };
        // this.button = [false, false, false];
        this.button = { left: false, middle: false, right: false };
        this.element = element;

        element.addEventListener('mousedown', this.onMouseDown.bind(this));
        element.addEventListener('mouseup', this.onMouseUp.bind(this));
        element.addEventListener('mousemove', this.onMouseMove.bind(this));
        // window.addEventListener('mouseenter', this.onMouseEnter);
        // window.addEventListener('mouseleave', this.onMouseLeave);
    }

    onMouseDown(e) {
        // this.button[e.button] = true;
        this.setButtonState(e.button, true);

    }

    onMouseUp(e) {
        // this.button[e.button] = false;  
        this.setButtonState(e.button, false);

    }

    onMouseMove(e) {
        const offset = this.element.getBoundingClientRect();
        this.pos.x = e.clientX - offset.left;
        this.pos.y = e.clientY - offset.top;
    }
    
    setButtonState(button, isDown) {
        if (button === 0) this.button.left = isDown;
        if (button === 1) this.button.middle = isDown;
        if (button === 2) this.button.right = isDown;
    }
}