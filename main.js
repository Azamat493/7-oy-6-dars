// 1
/*
function maxMin(sonlar) {
    let max = sonlar[0];
    let min = sonlar[0];
    for (let i = 0; i < sonlar.length; i++) {
        if (sonlar[i] > max) max = sonlar[i];
        if (sonlar[i] < min) min = sonlar[i];
    }
    return [max, min];
}
console.log(maxMin([3, 7, 2, 9, 4]));
*/


// 2
/*
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}
console.log(isPrime(11));
console.log(isPrime(12));
*/

// 3
/*
function reversePrint(n) {
    for (let i = n; i >= 1; i--) {
        console.log(i);
    }
}
reversePrint(5);
*/

// 4
/*
function sumOfDigits(n) {
    let sum = 0;
    let str = n.toString();
    for (let i = 0; i < str.length; i++) {
        sum += parseInt(str[i]);
    }
    return sum;
}
console.log(sumOfDigits(1234));
*/