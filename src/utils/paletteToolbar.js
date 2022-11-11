import ColorCycler from "./colorCycler";

// Alert! Very old and messy code

export default class PaletteToolbar {
    constructor(canvasRef, global = window) {

        this.canvas = canvasRef;
        this.global = global;
        this.ctx = this.canvas.getContext('2d');

        this.colorCycler = new ColorCycler(0, 100, 50, -14, 0, 0);
        this.colorCyclerGrayscale = new ColorCycler(0, 0, 0, 0, 0, 1.3);

        this.palette_array = null;
        this.rows = 16;
        this.columns = 30;

        this.palette_number = 1;
        this.number_of_palettes = 3;

        this.cell_width = this.canvas.width / this.columns;
        this.cell_height = this.canvas.height / this.rows;

        this.selected_col = 25;
        this.selected_row = 0;

        this.outer_border_color = '#000000';
        this.outer_border_width = 1;

        this.mouse_down_left = false;
        this.mouse_down_middle = false;
        this.mouse_down_right = false;
        this.mouse_x = 0;
        this.mouse_y = 0;

        this.selected_line_width = 3;
        this.selected_line_color = '#ffffff';


        // Make local bindings so we can remove them later

        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onContextMenu = this.onContextMenu.bind(this);
        // this._onMouseWheel = this.onMouseWheel.bind(this);
        this.addListeners();


        this.initialize();
        this.updateDisplay();

    }

    // --------------------------------------------------------------
    initialize() {
        this.palette_array = [...new Array(this.columns)].map(() => [...new Array(this.rows)]);

        this['fillPalette' + this.palette_number]();
        this.fillPaletteGreyScale();

        this.global.setActiveColor = (color) => {
            this.global.activeColor = color;
        }

        this.global.setActiveColor(this.getColorAt(this.selected_col, this.selected_row));

 
    }

    //------------------------------------------------------------
    addListeners() {
        window.addEventListener('mousedown', this._onMouseDown);
        window.addEventListener('mouseup', this._onMouseUp);
        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('contextmenu', this._onContextMenu);
        // window.addEventListener('mousewheel', this._onMouseWheel);
    }
    //------------------------------------------------------------
    removeListeners() {
        window.removeEventListener('mousedown', this._onMouseDown);
        window.removeEventListener('mouseup', this._onMouseUp);
        window.removeEventListener('mousemove', this._onMouseMove);
        // window.removeEventListener('mousewheel', this._onMouseWheel);
    }

    onContextMenu(e) {
        if (e.target === this.canvas) e.preventDefault();
    }

    onMouseMove(e) {
        this.updateMousePosition(e);

        if (this.mouse_down_left) {
            this.selectColorAtCursor();
            this.updateDisplay();
        }
    }

    updateMousePosition(e) {
        // if (this.canvas !== e.target) return;
        this.mouse_x = e.clientX - this.canvas.getBoundingClientRect().left;
        this.mouse_y = e.clientY - this.canvas.getBoundingClientRect().top;
    }

    onMouseDown(e) {
        if (this.canvas !== e.target) return;

        this.updateMousePosition(e);

        if (e.button === 0) {
            this.mouse_down_left = true;
            this.selectColorAtCursor();
            this.updateDisplay();
        }
        if (e.button === 1) {
            this.mouse_down_middle = true;
        }
        if (e.button === 2) {
            this.mouse_down_right = true;
            this.switchPalette();

        }

    }
    //-------------------------------------------------------------
    onMouseUp(e) {
        if (e.button === 0) {
            this.mouse_down_left = false;
        }
        if (e.button === 1) {
            this.mouse_down_middle = false;
        }
        if (e.button === 2) {
            this.mouse_down_right = false;
        }

    }
    //--------------------------------------------------------------
    // onMouseWheel(e) {
    //     if (e.target.id === 'reference' || e.target.id === 'undo') return; //make sure active only on palette & drawing board

    //     if (e.deltaY < 0) {           // Scroll up
    //         this.selected_row = this.selected_row > 0 ? this.selected_row - 1 : 0;
    //         this.global.setActiveColor(this.getColorAt(this.selected_col, this.selected_row));
    //         this.updateDisplay();
    //     }
    //     if (e.deltaY > 0) {           // Scroll down
    //         this.selected_row = this.selected_row < this.rows - 1 ? this.selected_row + 1 : this.rows - 1;
    //         this.global.setActiveColor(this.getColorAt(this.selected_col, this.selected_row));
    //         this.updateDisplay();
    //     }
    // }

    //--------------------------------------------------------------
    selectColorAtCursor() {
        this.selected_col = ~~(this.mouse_x / this.cell_width);
        this.selected_row = ~~(this.mouse_y / this.cell_height);
        this.global.setActiveColor(this.getColorAt(this.selected_col, this.selected_row));

    }
    //-------------------------------------------------------------
    updateDisplay() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();
        this.highlightSelectedColor();
        this.drawBorder();
    }
    //-------------------------------------------------------------
    render() {
        this.ctx.save();

        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (this.palette_array[i][j] === null) continue;

                this.ctx.fillStyle = this.palette_array[i][j];
                this.ctx.fillRect(i * this.cell_width, j * this.cell_height, this.cell_width + 1, this.cell_height + 1);
            }
        }


        this.ctx.restore();



    }
    //-------------------------------------------------------------
    highlightSelectedColor() {

        this.ctx.save();
        this.ctx.lineWidth = this.selected_line_width;

        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.selected_col * this.cell_width, this.selected_row * this.cell_height,
            this.cell_width, this.cell_height);

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.selected_col * this.cell_width - 2, this.selected_row * this.cell_height - 2,
            this.cell_width + 4, this.cell_height + 4);
        this.ctx.restore();
    }

    //-----------------------------------------------------------

    fillPalette1() { //cycles only lightness
        for (var i = 0; i < this.rows; i++) {
            this.colorCycler.reset();
            this.colorCycler.setLightness(((i + 1) / this.rows) * 80 + 15);
            //this.colorCycler.setSaturation(((i+1)/this.rows)*80  +15);
            for (var j = 0; j < this.columns - 5; j++) {
                this.palette_array[j][i] = this.colorCycler.getNextColor();
            }
        }
    }
    //--------------------------------------------------------------

    fillPalette2() { //muddy palette
        for (var i = 0; i < this.rows; i++) {
            this.colorCycler.reset();
            this.colorCycler.setLightness(((i + 1) / this.rows) * 60 + 15);
            this.colorCycler.setSaturation(30);
            for (var j = 0; j < this.columns - 5; j++) {
                this.palette_array[j][i] = this.colorCycler.getNextColor();
            }
        }
    }
    //--------------------------------------------------------------
    fillPalette3() { //muddier palette
        for (var i = 0; i < this.rows; i++) {
            this.colorCycler.reset();
            this.colorCycler.setLightness(((i + 1) / this.rows) * 60 + 15);
            this.colorCycler.setSaturation(10);
            for (var j = 0; j < this.columns - 5; j++) {
                this.palette_array[j][i] = this.colorCycler.getNextColor();
            }
        }
    }
    //-------------------------------------------------------------

    fillPaletteGreyScale() {
        this.colorCyclerGrayscale.reset();
        for (var i = this.columns - 5; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.palette_array[i][j] = this.colorCyclerGrayscale.getNextColor();
            }
        }
    }
    //-------------------------------------------------------------
    drawBorder() {
        this.ctx.save();
        this.ctx.lineWidth = this.outer_border_width;
        this.ctx.strokeStyle = this.outer_border_color;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //-------------------------------------------------------
    switchPalette() {
        this.palette_number = ++this.palette_number > this.number_of_palettes ? 1 : this.palette_number;
        this.initialize();
        this.updateDisplay();
    }

    //-------------------------------------------------------------
    getColorAt(col, row) {
        return this.palette_array[col][row];
    }
    //-------------------------------------------------------------
    getCellByColor(color) {
        for (let n = 0; n < this.number_of_palettes; n++) {

            // Iterate through entire palette
            for (var i = 0; i < this.columns; i++) {
                for (var j = 0; j < this.rows; j++) {
                    if (this.palette_array[i][j] === color) {
                        this.selected_col = i;
                        this.selected_row = j;
                        this.global.setActiveColor(this.palette_array[i][j]);
                        this.updateDisplay();
                        return;
                    }
                }
            }

            this.switchPalette();

        }
        console.log('Color not found inside palette');
    }
    //-------------------------------------------------------------
    getInvertedRGB(color) {
        if (!color) return '#000000';

        let r = 255 - parseInt((color[1] + color[2]), 16);
        let g = 255 - parseInt((color[3] + color[4]), 16);
        let b = 255 - parseInt((color[5] + color[6]), 16);
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        if (r.length < 2) r = '0' + r;
        if (g.length < 2) g = '0' + g;
        if (b.length < 2) b = '0' + b;

        return '#' + r + g + b;;
    }
}  