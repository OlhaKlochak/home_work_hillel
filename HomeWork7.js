//Task 1
function whereNun(maybeNan){
    return maybeNan!==maybeNan &&  maybeNan!==maybeNan/1;
    }
    console.log(whereNun(NaN));
    console.log(whereNun('123'));
    console.log(whereNun("anv"/0));
    console.log(whereNun('abc'/123));
    

    
    
//Task 2
function pad(text, simbol, quantity,beginadd){
    
    let padEndpadStart = simbol.repeat(quantity-text.length);
    if (beginadd) {
        return padEndpadStart + text;
    } else {
        return text + padEndpadStart;
    }
}
console.log(pad('qwerty', '+', 10, true)); 
console.log(pad('qwerty', '+', 10, false)); 
console.log(pad('qwerty', '+', 10, false)); 


//Task 3

function checkProbabilityTheory(count) {
    let even = 0;
    let odd = 0;

    for (let i = 0; i < count; i++) {
        let random = Math.round(Math.random() * (1000 - 100 + 1)) + 100;
    //  console.log(random);
        if (random % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }

    let percentEven = (even / count)*100;
    let percentOdd = (odd / count)*100;

    console.log("Кількість згенерованих чисел: " + count);
    console.log("Парних чисел: " + even);
    console.log("Непарних чисел: " + odd);
    console.log("Відсоток парних до непарних: " + Math.round(percentEven) + "% : " + Math.round(percentOdd) + "%");
}

checkProbabilityTheory(30);



