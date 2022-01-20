const API_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=8febd1bb90afee6a5a02a286e86cd96d&format=1";
const api_names = "/api/countrys.json"

let html = '';

const janela = window.matchMedia("(max-width: 600px)")

async function Main() {
    let moeda = document.querySelectorAll('select'); //pegando todos os selects
    let valor = document.querySelectorAll('input'); //pegando todos os inputs

    const response = await fetch(API_URL);                  //pegando a api com a cotação das moedas
    const responseNames = await fetch(api_names);          //pegando a api com o nome das moedas
    
    const data = await response.json();                   //atribuindo a reposta json da cotação
    const dataNames = await responseNames.json();        //atribuindo a resposta json do nome das moedas a variavel dataNames
    
    const arrayNames = Object.keys(dataNames.countrys); //enumerando os nomes dentro do objeto
    const arrayRates = Object.keys(data.rates);        // enumerando todas as moedas dentro do objeto 
    
    const rates = data.rates;                         //variável com apenas a cotação de cada moeda
    const names = dataNames.countrys;                //variável com apenas os nomes de cada moeda

    const namesSorted = [], priceSorted = [], pairSorted = []; //novos arrays para ordenar os nomes, cotações e pares

    arrayNames.forEach(name => namesSorted.push(names[name])) //adicionando os nomes no novo array

    sortFunction(namesSorted, names, arrayNames, arrayRates, rates, pairSorted, priceSorted);  //função para organizar os nomes em ordem alfabética e atribuir seus pares e cotações
    
    const newRates = {}; //JSON para alterar os valores da cotação para 2 números após a vírgula

    for(let i=0;i<169;i++){
        newRates[pairSorted[i+1]] = priceSorted[i] //adicionando pares e cotação ao JSON
    }

    insertHtml(pairSorted, namesSorted, moeda); //função para inserir o html editado na página
    
    isMoeda(0,1, moeda, valor);                              //função que verifica se o valor do select == Moeda

    converter(newRates, valor, moeda);                         //função do cálculo de conversão 

}

function isMoeda(i, j, moeda, valor){
    if(moeda[i].value == ''){
        valor[j].value = 'Insira uma moeda';
        return true;
    }else{
        return false;
    }
}

function sortFunction(namesSorted, names, arrayNames, arrayRates, rates, pairSorted, priceSorted){
    namesSorted.sort();       //nomes em ordem alfabética
    
    for(let i=0;i<168;i++){                                     //percorre o array 
        for(let j=0;j<168;j++){                                 //de nomes e nomes/pares.
            if(namesSorted[i]==names[arrayNames[j]]){           //Se os nomes forem iguais,
                for(let k=0;k<168;k++){                         //percorre o array de pares/cotações.
                if(arrayNames[j]==arrayRates[k]){               //Se os pares forem iguais,
                        pairSorted.push(arrayNames[j]);         //organizamos,em ordem de 
                        priceSorted.push(rates[arrayRates[k]]); //acordo com os nomes, os pares e as cotações.
                    }
                }
            }
        }
    }

    namesSorted.unshift('Moeda');   //adicionando o nome 'Moeda' no início do array de nomes
    pairSorted.unshift('');        //adicionando o valor '' = nulo no início do array de pares, evitando assim o conflito de informações
}

function insertHtml(pairSorted, namesSorted, moeda){
    pairSorted.map((pair,index) => {                //percorrendo os pares de moeda
        if(index==0){
            index++;
            return html += `<option value=${pair}>${namesSorted[0]}</option>`;
        }
        return html += `<option value=${pair}>${namesSorted[index]} - ${pair}</option>`; //retornando todas as moedas no campo select
    });
    
    for (let i = 0; i < moeda.length; i++) {
        moeda[i].innerHTML = html;      //inserindo todas as moedas no select do html
    }
}

function converter(newRates, valor, moeda){
    valor[0].addEventListener('keyup', () => calculate(1, 0, newRates, valor, moeda));
    //fazendo o cálculo da conversão no primeiro input = input[0] assim que digitamos
    
    moeda[0].addEventListener('change', () => calculate(1, 0, newRates, valor, moeda));
    //fazendo o cálculo da conversão automática assim que o select[0] é modificado
    
    moeda[1].addEventListener('change', () => calculate(1, 0, newRates, valor, moeda));
    //fazendo o cálculo da conversão automática assim que o select[1] é modificado
}

function calculate(i, j, newRates, valor, moeda) {
    if(isMoeda(0,1, moeda, valor)){
    }else if(isMoeda(1,1, moeda, valor)){
    }else{
        valor[i].value = valor[j].value * ((newRates[moeda[i].value] / newRates[moeda[j].value]).toFixed(2)); //cálculo da cotação
    }
}

myFunction(janela);

janela.addListener(myFunction);

function myFunction(janela) {
    let icon = document.getElementById("icon");

    let cel2 = document.getElementById("cel-2")
    let cel3 = document.getElementById("cel-3")
    let cel4 = document.getElementById("cel-4")

    let tr1 = document.getElementById("tr-1")
    let tr2 = document.getElementById("tr-2")
    let tr3 = document.createElement("tr")
    let tr4 = document.createElement("tr")

    tr3.setAttribute("id", "tr-3")
    tr4.setAttribute("id", "tr-4")

    let data2 = document.createElement("td")
    let data3 = document.createElement("td")
    let data4 = document.createElement("td")
    
    data2.setAttribute("id", "cel-2")
    data3.setAttribute("id", "cel-3")
    data4.setAttribute("id", "cel-4")
    
    let table = document.querySelector("tbody")

    let div1 = document.createElement("div")
    let div2 = document.createElement("div")

    div1.setAttribute("class", "select is-warning is-rounded")
    div2.setAttribute("class", "control")
    div2.setAttribute("id", "margint")

    let select = document.createElement("select")

    select.setAttribute("id", "margint")

    let input1 = document.createElement("input")
    let input2 = document.createElement("input")

    input1.setAttribute("class", "input is-warning is-rounded id-focused")
    input1.setAttribute("type", "number")

    input2.setAttribute("class", "input is-warning is-rounded")
    input2.setAttribute("type", "text")
    input2.setAttribute("readonly", true)

    if (janela.matches) {     
        icon.innerHTML = "<i class='fas fa-arrow-down'></i>"
        cel2.remove()
        cel3.remove()
        cel4.remove()
        tr2.appendChild(data2)
        table.appendChild(tr3)
        table.appendChild(tr4)
        tr3.appendChild(data3)
        tr4.appendChild(data4)
        data2.appendChild(div1)
        div1.appendChild(select)
        data3.appendChild(div2)
        div2.appendChild(input1)
        data4.appendChild(input2)   
        Main();

    }else{
        if(icon.childElementCount){ //verificando se tem ícone
            icon.innerHTML = '';   //se tiver, ele sai
        }
        if(table.childElementCount>2){
            data2.remove()
            document.getElementById("tr-4").remove()
            document.getElementById("tr-3").remove()
            document.getElementById("tr-2").remove()
            tr1.appendChild(data2)
            data2.appendChild(div2)
            div2.appendChild(input1)
            let tr2 = document.createElement("tr")
            table.appendChild(tr2)
            tr2.setAttribute("id", "tr-2")
            tr2.appendChild(data3)
            data3.appendChild(div1)
            div1.appendChild(select)
            tr2.appendChild(data4)
            data4.appendChild(input2)
            input2.setAttribute("value", "Insira uma moeda")

        }
        Main();
    }
}

