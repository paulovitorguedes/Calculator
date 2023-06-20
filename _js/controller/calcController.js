class Calculator {

    constructor() {
        this._operations = new Array;
        this._operationsSide = '';
        this._displayEl = document.querySelector('#display');
        this._displaySideEl = document.querySelector('#displaySide');

        this.initialise();
    }

    initialise() {
        this.initBtnEvents();
        this.addNewOperation('0');
        this.display = this.lastOperation;
    }


    // A função deve receber os elementos html, os eventos separados por (" ") e a função 
    addEventListenerAll(element, event, fn) {
        event.split(" ").forEach(e => {
            element.addEventListener(e.trim(), fn)
        })
    }

    //Adiciona os eventos 'click drag' aos btn chamando a função addOperations
    initBtnEvents() {
        let elements = document.querySelectorAll('.btn');
        elements.forEach(element => {
            this.addEventListenerAll(element, 'click drag', e => {
                this.addOperations(element.innerHTML);
            })
        })
    }

    addOperations(value) {
        console.log(`entrada: ${value} ultima op ${this.lastOperation}`);
        if (parseFloat(this.lastOperation) == 0) {

            if (this.isNum(value)) {
                this.lastOperation = value;
                this.display = this.lastOperation;

            } else if (this.isOperation(value)) {
                this.displaySide = this.lastOperation + value;
                this.addNewOperation(value);

            }
        
        } else if (this.isNum(this.lastOperation)) {

            if (this.isNum(value)) {
                this.lastOperation += value;
                this.display = this.lastOperation;

            } else if (this.isOperation(value)) {
                this.displaySide = this.lastOperation + value;
                this.addNewOperation(value);

            }

        } else if (this.isOperation(this.lastOperation)) {

            if (this.isNum(value)) {     
                this.display = value;
                this.addNewOperation(value);

            } else if (this.isOperation(value)) {
                this.displaySide = this.firstOperation + value;
                this.lastOperation = value

            }
            
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
        return ['+', '-', 'x', '/', '%'].indexOf(value) > -1;
    }




    addNewOperation(value) {
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