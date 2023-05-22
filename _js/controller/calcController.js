class Calculator {

    construdtor() {
        this._displayEl = document.querySelector('visor');
    }

    initialise() {

    }

    get display() {
        return this._displayEl;
    }
    set display(value) {
        this._displayEl = value;
    }
}