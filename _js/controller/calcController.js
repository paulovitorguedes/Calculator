class Calculator {

    constructor() {
        // this._displayEl = document.querySelector('#visor');
        this.initEventListener();
    }

    initialise() {

    }

    initEventListener() {
        let btn = document.querySelectorAll('.btn');
        console.log(btn);
    }

    get display() {
        return this._displayEl;
    }
    set display(value) {
        this._displayEl = value;
    }
}