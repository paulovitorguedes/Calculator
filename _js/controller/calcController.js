class Calculator {

    constructor() {
        this._operations = new Array;
        this._displayEl = document.querySelector('#display');

        this.initialise();
    }

    initialise() {
        this.initBtnEvents();
        this.addNewOperaion('0');
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
        if (this.lastOperation == 0) {

            if (this.isNum(value)) {
                this.lastOperation = value;
                this.display = this.lastOperation;

            } else if (this.isOperation()) {


            } else if (ponto) {

            }
        }
        this.display = value;
    }

    isNum(value) {
        let num = true;
        if (isNaN(value)) {
            num = false;
        }
        return num;
    }





    addNewOperaion(value) {
        this._operations.push(value);
    }



    set lastOperation(value) {
        this._operations[this._operations.length - 1] = value;
    }
    get lastOperation() {
        return this._operations[this._operations.length - 1];
    }


    get display() {
        return this._displayEl;
    }
    set display(value) {
        this._displayEl.value = value;
    }

}