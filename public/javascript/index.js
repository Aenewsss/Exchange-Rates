let moeda = document.querySelectorAll('select'); //pegando todos os selects
let valor = document.querySelectorAll('input'); //pegando todos os inputs
const API_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=c303306cc8e44986ba5645c96dfa419b&format=1";
const api_names = "/api/countrys.json"

let html = '';

async function Main() {
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
    
    isMoeda(0,1);                              //função que verifica se o valor do select == Moeda

    converter(newRates);                         //função do cálculo de conversão 
}

function isMoeda(i, j){
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
                        priceSorted.push(rates[arrayRates[k]].toFixed(2)); //acordo com os nomes, os pares e as cotações.
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

function converter(newRates){
    valor[0].addEventListener('keyup', () => calculate(1, 0, newRates));
    //fazendo o cálculo da conversão no primeiro input = input[0] assim que digitamos
    
    moeda[0].addEventListener('change', () => calculate(1, 0, newRates));
    //fazendo o cálculo da conversão automática assim que o select[0] é modificado
    
    moeda[1].addEventListener('change', () => calculate(1, 0, newRates));
    //fazendo o cálculo da conversão automática assim que o select[1] é modificado
}

function calculate(i, j, newRates) {
    if(isMoeda(0,1)){
    }else if(isMoeda(1,1)){
    }else{
        valor[i].value = valor[j].value * ((newRates[moeda[i].value] / newRates[moeda[j].value]).toFixed(2)); //cálculo da cotação
    }
}

Main();