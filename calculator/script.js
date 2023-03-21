let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');
// function buttonClick принимает текст и, в зависимости от результата (символ или цифра), вызывает
// функцию handleSymbol или handleNumber
function buttonClick(value){
    if(isNaN(value)){ // Определяет, является ли передаваемое значение NaN и возвращает логическое значение
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    // innerText показывает все текстовое содержимое, которое не относится к синтаксису HTML.
    // т.е. любой текст, заключенный между открывающими и закрывающими тегами
    // элемента будет записан в innerText
    screen.innerText = buffer; 
}
// function handleSymbol принимает символ, и в зависимости от результата
// производит разные действия с ранее объявленными переменными и 
// вызывает функцию flushOperation или handleMath
function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}
// Принимает текст(один из символом +,-,/ и *), производит разные действия
// с ранее объявленными переменными, и в зависимости от результата, 
// вызывает функцию flushOperation
function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
// parseInt читает число из строки. Если в процесс чтения возникает ошибка, он
// возвращает полученное до ошибки число. parseInt возвращает целое число, а 
// parseFloat возвращает число с плавающей точкой
    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}
//  function flushOperation принимает цифру и, в зависимости от того, какой оператор находится
// в переменной previousOperator, производит математические действия
// с переменной runningTotal
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×') {
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}
// function handleNumber Принимает текст (число), и в зависимости от того, какое значение
// находится в переменной buffer, или устанавливает в buffer новое
// значение, или производит конкатенацию buffer с переданной строкой
function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}
// Установка обработчика click на кнопку.
// В теле обработчика вызывается функция buttonClick
// которой передается текст из элемента, по которому кликнули
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })

}

init();