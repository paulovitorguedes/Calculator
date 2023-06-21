class Calculator {

    constructor() {
        this._operations = new Array;
        this._result = '';
        this._displayEl = document.querySelector('#display');
        this._displaySideEl = document.querySelector('#displaySide');

        this.initialise();
    }

    initialise() {

        this.initBtnEvents();
        this.clearAll();
        this.display = this.lastOperation;
    }


    // A função deve receber os elementos html, os eventos separados por (" ") e a função 
    addEventListenerAll(element, event, fn) {

        event.split(" ").forEach(e => {
            element.addEventListener(e.trim(), fn)
        })
    }

    //Adiciona os eventos 'click drag' aos btn chamando a função addElements
    initBtnEvents() {

        let elements = document.querySelectorAll('.btn');
        elements.forEach(element => {
            this.addEventListenerAll(element, 'click drag', e => {
                this.execBtn(element.innerHTML);
            })
        })
    }


    execBtn(value) {

        switch (value) {
            case '.':
                this.addDot(value);
                break;
            case 'C':
                this.clearAll();
                break;
            case 'CE':
                this.cancelEntry();
                break;
            case 'x':
                this.addBtnOperation('*');
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
            case '%':
                this.addBtnOperation(value);
                break;
            default:
                this.addElements(value);
                break;
        }
    }


    addDot(dot) {

        if (this.isNum(this.lastOperation) && !this.searchInLastOperation(dot)) {

            this.lastOperation += dot;
            this.display = this.lastOperation;

        } else if (this.isOperation(this.lastOperation)) {

            this.newOperation = '0.';
            this.display = this.lastOperation;
        }
    }

    addBtnOperation(value) {

        if (this._operations.length <= 2) {

            if (this.isOperation(this.lastOperation)) {

                this.lastOperation = value;
                this.displaySide = this.firstOperation + this.lastOperation;

            } else {

                this.displaySide = this.lastOperation + value;
                this.newOperation = value;
            }


        } else {

            this._result = this.calc();
            this.displaySide = this._result.toString() + value;
            this._operations.pop()
            this.firstOperation = this._result;
            this.lastOperation = value;
            this.display = this._result;

        }
    }


    addElements(value) {

        if (parseFloat(this.lastOperation) == 0) {

            if (this.searchInLastOperation('.')) {

                this.lastOperation += value;
                this.display = this.lastOperation;

            } else {

                this.lastOperation = value;
                this.display = this.lastOperation;
            }

        } else if (this.isNum(this.lastOperation)) {

            this.lastOperation += value;
            this.display = this.lastOperation;


        } else if (this.isOperation(this.lastOperation)) {

            this.display = value;
            this.newOperation = value;
        }

    }


    calc() {

        try {
            return eval(this._operations.join(''));

        } catch (error) {

            this.display = 'ERROR';
            this.displaySide = '';
        }
    }



    isNum(value) {

        let num = true;
        if (isNaN(value)) {

            num = false;
        }
        return num;
    }

    isOperation(value) {

        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }

    searchInLastOperation(value) {

        return this.lastOperation.indexOf(value) > -1;
    }

    clearAll() {

        this._operations = ['0'];
        this.display = this.lastOperation;
        this.displaySide = '';
    }

    cancelEntry() {

        if (this.isNum(this.lastOperation)) {

            this._operations.pop();
            this.newOperation = '0';
            this.display = this.lastOperation;

        } else if (this.isOperation(this.lastOperation)) {

            this.display = '0';
        }
    }






    set newOperation(value) {

        this._operations.push(value);
    }

    set lastOperation(value) {
        this._operations[this._operations.length - 1] = value;
    }
    get lastOperation() {
        return this._operations[this._operations.length - 1];
    }

    set firstOperation(value) {
        this._operations[0] = value;
    }
    get firstOperation() {
        return this._operations[0];
    }

    get display() {
        return this._displayEl.value;
    }
    set display(value) {
        this._displayEl.value = value;
    }

    get displaySide() {
        return this._displaySideEl.value;
    }
    set displaySide(value) {
        this._displaySideEl.value = value;
    }

}