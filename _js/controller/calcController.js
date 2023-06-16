class Calculator {

    constructor() {
        this._operation = [0];
        this._displayEl = document.querySelector('#display');

        this.initialise();
    }

    initialise() {
        this.initBtnEvents();

        this._displayEl.value = this._operation[0];
    }


    // A função deve receber os elementos html, os eventos separados por (" ") e a função 
    addEventListenerAll(element, event, fn) {
        event.split(" ").forEach(e => {
            element.addEventListener(e.trim(), fn)
        })
    }

    //Adiciona os eventos 'click drag' aos btn chamando a função execBtn
    initBtnEvents() {
        let elements = document.querySelectorAll('.btn');
        elements.forEach(element => {
            this.addEventListenerAll(element, 'click drag', e => {
                this.execBtn(element.innerHTML);
            })
        })
    }

    




    execBtn(value) {
        console.log(value);
    }




    get display() {
        return this._displayEl;
    }
    set display(value) {
        this._displayEl = value;
    }
}