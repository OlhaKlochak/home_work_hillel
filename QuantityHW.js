/*Напишіть програму яка буде приймати два значення, перше це одиниця вимірювання (кілометри, години та кілограми), друге значення це кількість, а потім переводити ці значення:

Кілометри в метри
години в хвилини
Кілограми в грами
Зробити вивід отриманої інформації у вигляді - 10 км це 10000 м. 1 г це 60хв. 1 кг. це 1000 грм. */

let quantity = "години, кілометри, кілограми";

let quantityOne = 10;
let quantityTwo = 1;
let quantityThree=1; 

if (typeof quantityOne === "number", typeof quantityTwo === "number", typeof quantityThree === "number") {
    
switch (quantity) {
    case "кілометри":
        console.log(quantityOne+ "км це"+quantityOne * 1000 +" м.");
        break;
    case "години":
        console.log(quantityTwo+ "год. це"+ quantityTwo* 60 + " хв.");
        break;
    case "кілограми":
        console.log(quantityThree+"кг.це"+quantityThree * 1000 +" грм.");
        break;
    default: "Введена невірна одиниця вимірювання";
        
}

console.log(quantityOne+ " км це "+quantityOne * 1000 +" м, "+ quantityTwo+ " год це "+ quantityTwo* 60 + 
        " хв, "+quantityThree+" кг це "+quantityThree * 1000 +" грм");

}      
 else {
    console.log("Кількість слід вказати числом.");
}       