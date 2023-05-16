var memo = Array();

function calcular(botao) {
    console.log(botao);
    if (botao === "=") {
        var valor_campo = eval(document.getElementById('visor').value);
        document.getElementById('visor').value = valor_campo;

    } else {
        if (botao === "c") {
            document.getElementById('visor').value = '';

        } else {
            if (botao === "m1") {
                botao = document.getElementById('m1').innerHTML;
                document.getElementById('visor').value += botao;

            } else {
                if (botao === "m2") {
                    botao = document.getElementById('m2').innerHTML;
                    document.getElementById('visor').value += botao;

                } else {
                    if (botao === "m3") {
                        botao = document.getElementById('m3').innerHTML;
                        document.getElementById('visor').value += botao;

                    } else {
                        document.getElementById('visor').value += botao;
                    }
                }
            }
        }
    }
}


function adicionarMemoria() {
    var p = memo.length;
    var valor_campo = eval(document.getElementById('visor').value);
    switch (p) {
        case 0:
            memo.push(valor_campo);
            document.getElementById('m1').innerHTML = valor_campo;
            break;
        case 1:
            memo.unshift(valor_campo);
            document.getElementById('m1').innerHTML = valor_campo;
            document.getElementById('m2').innerHTML = memo[1];
            break;
        case 2:
            memo.unshift(valor_campo);
            document.getElementById('m1').innerHTML = valor_campo;
            document.getElementById('m2').innerHTML = memo[1];
            document.getElementById('m3').innerHTML = memo[2];
            break;
        default:
            memo.unshift(valor_campo);
            memo.splice(3, 1);
            document.getElementById('m1').innerHTML = valor_campo;
            document.getElementById('m2').innerHTML = memo[1];
            document.getElementById('m3').innerHTML = memo[2];
            break;
    }
}


function apagar() {
    let visor = document.getElementById('visor').value;
    if (visor != '') {
        visor = visor.substring(0, (visor.length - 1));
        document.getElementById('visor').value = visor;
    }
}