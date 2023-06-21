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
                this.addBtnOperation(value);
                break;
            case '%':
                this.addPercent();
                break
            default:
                this.addElements(value);
                break;
        }
    }

    //A função adiciona e trata a entrada do btn PONTO (.)
    addDot(dot) {

        if (this.isNum(this.lastOperation) && !this.searchInLastOperation(dot)) {
            //Último elemento é um número e não contém ponto

            this.lastOperation += dot;
            this.display = this.lastOperation;

        } else if (this.isOperation(this.lastOperation)) {
            //O Último elemento é um btn de operação

            this.newOperation = '0.';
            this.display = this.lastOperation;
        }
    }

    //A função adiciona e trata a entrada do btn PORCENTO (%)
    addPercent() {

        let percent = 0;

        if (this.isOperation(this.lastOperation)) {
            //O Último elemento é um btn de operação

            if (this.lastOperation == '+' || this.lastOperation == '-') {
                //O btn de operação é + ou -
                percent = Math.pow(this.firstOperation, 2) / 100;

            } else {
                //O btn de operação é * ou /
                percent = this.firstOperation / 100;
            }



        } else if (this._operations.length > 2) {
            // O último elemento é um número e já possui 3 elementos no Array

            if (this._operations[1] == '+' || this._operations[1] == '-') {
                //O btn de operação é + ou -
                percent = this.lastOperation * this.firstOperation / 100;

            } else {
                //O btn de operação é * ou /
                percent = this.lastOperation / 100;

            }

        }

        if (percent != 0) {
            this.displaySide += percent;
            this.lastOperation = percent.toString();
            this.display = this.lastOperation;
        }

    }

    //A função adiciona e trata a entrada do btn de OPERAÇÔES (+, -, *, /)
    addBtnOperation(operation) {

        if (this._operations.length <= 2) {

            if (this.isOperation(this.lastOperation)) {

                this.lastOperation = operation;
                this.displaySide = this.firstOperation + this.lastOperation;

            } else {

                this.displaySide = this.lastOperation + operation;
                this.newOperation = operation;
            }


        } else {

            this._result = this.calc();
            this.displaySide = this._result.toString() + operation;
            this._operations.pop()
            this.firstOperation = this._result;
            this.lastOperation = operation;
            this.display = this._result;

        }
    }

    //A função adiciona e trata a entrada do btn de ELEMENTOS (numeros)
    addElements(elenent) {

        if (parseFloat(this.lastOperation) == 0) {

            if (this.searchInLastOperation('.')) {

                this.lastOperation += elenent;
                this.display = this.lastOperation;

            } else {

                this.lastOperation = elenent;
                this.display = this.lastOperation;
            }

        } else if (this.isNum(this.lastOperation)) {

            this.lastOperation += elenent;
            this.display = this.lastOperation;


        } else if (this.isOperation(this.lastOperation)) {

            this.display = elenent;
            this.newOperation = elenent;
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

        return ['+', '-', '*', '/'].indexOf(value) > -1;
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