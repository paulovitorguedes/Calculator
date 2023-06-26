class Calculator {

    constructor() {
        this._operations = new Array;
        this._result = '';
        this._operationsLastResult = '';
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

        document.addEventListener('keyup', e => {
            this.execBtn(e.key);
            console.log(e.key);
        })

    }




    execBtn(value) {

        switch (value) {
            case '.':
            case ',':
                this.addDot(value);
                break;
            case 'C':
            case 'Escape':
                this.clearAll();
                break;
            case 'CE':
                this.cancelEntry();
                break;
            case 'Backspace':
                break;
            case '=':
            case 'Enter':
                this.addEqual();
                break;
            case 'x':
            case '*':
                this._operationsLastResult = 'multiplication';
                this.addBtnOperation('*');
                break;
            case '+':
                this._operationsLastResult = 'addition';
                this.addBtnOperation(value);
                break;
            case '-':
                this._operationsLastResult = 'subtraction';
                this.addBtnOperation(value);
                break;
            case '/':
                this._operationsLastResult = 'division';
                this.addBtnOperation(value);
                break;
            case '%':
                this.addPercent();
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addElements(value);
                break;
            case 'M+':
            case 'M1':
            case 'M2':
            case 'M3':
                this.memory();
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
            this.displaySide += ` ${percent}`;
            this.lastOperation = percent.toString();
            this.display = this.lastOperation;
            this._operationsLastResult = 'percent';
            this._result = '';
        }

    }

    //A função adiciona e trata a entrada do btn de OPERAÇÔES (+, -, *, /)
    addBtnOperation(operation) {

        if (this._operations.length <= 2) {

            if (this.isOperation(this.lastOperation)) {
                
                this.lastOperation = operation;
                this.displaySide = `${tthis.firstOperation} ${this.lastOperation}`;

            } else {
                
                this.displaySide = `${this.lastOperation} ${operation}`;
                this.newOperation = operation;
            }


        } else {

            this._result = this.calc();
            this.displaySide = `${this._result.toString()} ${operation}`;
            this._operations.pop()
            this.firstOperation = this._result;
            this.lastOperation = operation;
            this.display = this._result;

        }
    }

    //A função adiciona e trata a entrada do btn de ELEMENTOS (numeros)
    addElements(elenent) {

        if (parseFloat(this.lastOperation) == 0 || this._operationsLastResult === 'percent') {

            if (this.searchInLastOperation('.')) {

                this.lastOperation += elenent;
                this.display = this.lastOperation;

            } else {

                this.lastOperation = elenent;
                this.display = this.lastOperation;

                if (this._operationsLastResult == 'percent') {
                    this.displaySide = `${this.firstOperation} ${this.secondOperation}`;
                }
            }

        } else if (this.isNum(this.lastOperation)) {

            this.lastOperation += elenent;
            this.display = this.lastOperation;

        } else if (this.isOperation(this.lastOperation)) {

            this.display = elenent;
            this.newOperation = elenent;
        }

    }

    addEqual() {
        if (this._result == '') {
            
            this._result = this.calc();
            this.display = this._result;
            this.displaySide = `${this.firstOperation} ${this.secondOperation} ${this.lastOperation} =`
        
        } else {
            this.firstOperation = this._result;
            this._result = this.calc();
            this.display = this._result;
            this.displaySide = `${this.firstOperation} ${this.secondOperation} ${this.lastOperation} =`
        }
    }

    calc() {

        try {
            this._result = eval(this._operations.join(''));
            return this._result;

        } catch (error) {

            this.display = 'ERROR';
            this.displaySide = '';
            this._result = '0';
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
        this._result = '';
    }

    cancelEntry() {

        if (this.isNum(this.lastOperation)) {

            this._operations.pop();
            this.newOperation = '0';
            this.display = this.lastOperation;

        } else if (this.isOperation(this.lastOperation)) {

            this.display = '0';
            this._result = '';
        }
    }






    set newOperation(value) {

        this._operations.push(value);
    }

    set lastOperation(value) {
        this._result = '';
        this._operations[this._operations.length - 1] = value;
    }
    get lastOperation() {
        return this._operations[this._operations.length - 1];
    }

    set firstOperation(value) {
        this._result = '';
        this._operations[0] = value;
    }
    get firstOperation() {
        return this._operations[0];
    }

    set secondOperation(value) {
        this._result = '';
        this._operations[1] = value;
    }
    get secondOperation() {
        return this._operations[1];
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