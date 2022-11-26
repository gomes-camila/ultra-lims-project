let tabela = document.getElementById("tabela");
let inputCEP = document.getElementById("inputCEP");
let buttonEnviar = document.getElementById("buttonEnviar");
let listaTabela = []
let storage = window.localStorage.getItem("CEPPesquisados")
let arrayDeCEPS = []

window.onload = function () {
    if (storage) {
        if (JSON.parse(storage).length > 0) {
            arrayDeCEPS = JSON.parse(storage)
            JSON.parse(storage).forEach(objetoDaVez => {
                randerizarTabela(objetoDaVez)
            });
        }
    }
}

function enviarDados() {
    let url = "https://viacep.com.br/ws/" + inputCEP.value + "/json/"
    fetch(url, {
        method: "GET"
    }).then((response) => {

        return response.text()
    }).then((text) => {
        arrayDeCEPS.push(text)
        window.localStorage.setItem("CEPPesquisados", JSON.stringify(arrayDeCEPS))
        console.log(JSON.parse(window.localStorage.getItem("CEPPesquisados")))
        randerizarTabela(text)
    })
}

function randerizarTabela(text) {
    let object = JSON.parse(text)
    let row = tabela.insertRow()
    let CEP = row.insertCell(0)
    CEP.innerHTML = object.cep
    let logradouro = row.insertCell(1)
    logradouro.innerHTML = object.logradouro
    let complemento = row.insertCell(2)
    complemento.innerHTML = object.complemento
    let bairro = row.insertCell(3)
    bairro.innerHTML = object.bairro
    let localidade = row.insertCell(4)
    localidade.innerHTML = object.localidade
    let uf = row.insertCell(5)
    uf.innerHTML = object.uf
    let ibge = row.insertCell(6)
    ibge.innerHTML = object.ibge
    let gia = row.insertCell(7)
    gia.innerHTML = object.gia
    let ddd = row.insertCell(8)
    ddd.innerHTML = object.ddd
    let siafi = row.insertCell(9)
    siafi.innerHTML = object.siafi
}
