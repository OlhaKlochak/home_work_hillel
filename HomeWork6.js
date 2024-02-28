//Task 1
function drawTriangle(height, star) {
    for (let i = 1; i <= height; i++) {
        let space = '';
        for (let j = 1; j <= i; j++) {
            space += star;
        }
        console.log(space);
    }
}

drawTriangle(5, '*');

function drawTriangleWhile(height, star) {
    let space = '';
    while (space.length < height) {
        space += star;
        console.log(space);
    }
}

drawTriangleWhile(5, '*');

//Task 2
let sum = 0;
for (let i = 1; i <= 100; i++) {
    if (i % 3 !== 0) {
        sum += i;
    }
}
console.log(sum);

//Task 3
function pow(x, y) {
    if (y === 0) return 1; 
    let result = 1;
    for (let i = 0; i < y; i++) {
        result *= x;
    }
    return result;
}

console.log(pow(2, 3)); 