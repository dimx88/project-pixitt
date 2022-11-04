export default class Mouse {

    constructor(element = null, preventDefault = false) {
        this.pos = { x: 0, y: 0 };
        this.prevPos = { x: 0, y: 0 };
        this.button = { left: false, middle: false, right: false, '0': false, '1': false, '2': false };
        this.leftElementBounds = false;
        this.preventDefault = preventDefault;

        this.element = element && this.follow(element);


        // Commit listener bindings here so that it's possible to remove them later via removeEventListener
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onMouseEnter = this.onMouseEnter.bind(this);
        this._onMouseLeave = this.onMouseLeave.bind(this);
        this._onContextMenu = this.onContextMenu.bind(this);

    }


    follow(element) {
        // if same element return, no need to re-follow
        if (this.element === element) return;

        // Unfollow existing element if one exists
        if (this.element) this.unfollow();

        element.addEventListener('mousedown', this._onMouseDown);
        element.addEventListener('mouseup', this._onMouseUp);
        element.addEventListener('mousemove', this._onMouseMove);
        element.addEventListener('mouseenter', this._onMouseEnter);
        element.addEventListener('mouseleave', this._onMouseLeave);
        element.addEventListener('contextmenu', this._onContextMenu);
        this.element = element;

        // console.log('mouse following ' + element.id)
        return element;
    }

    unfollow() {
        const element = this.element;
        element.removeEventListener('mousedown', this._onMouseDown);
        element.removeEventListener('mouseup', this._onMouseUp);
        element.removeEventListener('mousemove', this._onMouseMove);
        element.removeEventListener('contextmenu', this._onContextMenu);
        this.resetButtons();
        // console.log('mouse unfollowed');
    }

    resetButtons() {
        for (let b in this.button) this.button[b] = false;
    }



    onContextMenu(e) {
        if (this.preventDefault) e.preventDefault()
    }

    onMouseDown(e) {
        if (this.preventDefault) e.preventDefault();

        this.setButtonState(e.button, true);
    }

    onMouseUp(e) {
        this.setButtonState(e.button, false);
    }

    onMouseMove(e) {
        const offset = this.element.getBoundingClientRect();
        this.prevPos = { x: this.pos.x, y: this.pos.y };
        this.pos.x = e.clientX - offset.left;
        this.pos.y = e.clientY - offset.top;

        this.resetPosIfLeftElementBounds()

        if (e.target !== this.element) console.log('left canvas')
    }

    resetPosIfLeftElementBounds() {
        if (this.leftElementBounds) {
            this.prevPos = { x: this.pos.x, y: this.pos.y };
            this.leftElementBounds = false;
        }
    }

    onMouseLeave(e) {
        this.leftElementBounds = true;
        // console.log('mouse left element');
        // this.prevPos = {x: this.pos.x, y: this.pos.y};
        // console.log('prev');
        // console.log(this.prevPos);
        // console.log('pos');
        // console.log(this.pos);
        // this.prevPos = {x: 0, y: 0};
    }

    onMouseEnter(e) {
        // this.prevPos = {x: this.pos.x, y: this.pos.y};
        // console.log('prev');
        // console.log(this.prevPos);
        // console.log('pos');
        // console.log(this.pos);
        // this.prevPos = {x: 0, y: 0};
    }

    setButtonState(button, isDown) {
        this.button.left = (button === 0 && isDown) || (this.button.left && button !== 0);
        this.button.middle = (button === 1 && isDown) || (this.button.middle && button !== 1);
        this.button.right = (button === 2 && isDown) || (this.button.right && button !== 2);
        this.button[button] = isDown;

        //console.log(this.button);
    }
}