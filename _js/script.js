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