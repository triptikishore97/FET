console.log("new to javascript")

//it won't through error due to hoisting proprtyy 
//variable hoisting
console.log(`userName :${userName}`);
console.log(`userAge :${userAge}`);


greetUser(userName); //function hoisting 

var userName='tom';
var userAge='18';

console.log(`userName :${userName}`);
console.log(`userAge :${userAge}`);

function greetUser(name){
    var greet='good morning';
    console.log(`hello ${name}, ${greet}`);
    var cureentYear= 2024;
    const year=cureentYear-userAge;
    return `Your birth year ${year}`;

}

var birthYear=greetUser(userName);
console.log(birthYear);

//scope in js

//global
//function(local)
//block

// var varNum = 10;
// let letNum =20;
// const constNum=30;

// function print(){
//     var varLocal = 10;
//     let letLocal = 20;
//     const constLocal=30;

//     console.log(varLocal, letLocal,constLocal)
//     console.log(`outside method`,varNum, letNum, constNum);
// }
// console.log(varLocal, letLocal,constLocal);
// console.log(varNum, letNum, constNum);
// print();

//scope chaininh

var a=10;
let b=20;
const c=30;
//outer scope lexical enironment 
function print1(){
    var a='ten';   //inner varriables will have precedence
    let b='twebty';

    console.log('***********INSIDE PRINT FUNCTION******');//if not find anything for c it will search in iuter scope(due to lexical scoping)
    console.log(a,b,c);  //output- ten twenty 30 
    console.log('****************');

    function innerPrint(){
        var a='inner10';
        console.log('***********INSIDE inner  PRINT FUNCTION******');
        console.log(a,b,c); //output- inner10 twenty 30

    }
    innerPrint();


}
console.log(a,b,c); //output 10 20 30
print1();


//CLOSURE


let a1='Gloabal';

function outerPrint(){
    let b='OuterPrint';

    return function innerPrintt(){
        let c='innerPrint';
        return `${a1}->${b}->${c}`;
    }
}
const show=outerPrint();
console.log(show);  //it will return function 
const printInner = show();
console.log(printInner);

//FUNCTION

function sum(a2,b2){
    return a2+b2;    //declaration
}
const resSum=sum(5,7);

console.log(resSum);

//function expression
const sum2 = function (a,b){
    return a+b;
}
console.log(sum2);
console.log(sum2(6734,3546));

//console.log(square(5));
var square=function(x){
    return x*x;
}
console.log(square(5));

//ARROW FUNCTION
var prod=(num1,num2)=>{
    return num1*num2;
}
console.log(prod(3,757));

const greet=name=> `Hello, ${name}!`;

console.log(greet('alice'));

//PURE FUNC

function calculate(num1,num2){
    return num1*num2;
}
console.log(calculate(4,6));

const discount =25;
function calcDiscount(price){
    return price-discount;
}



/**callback  */
//async js

function greett(wish){
    console.log(`${wish()}, welcome tyo the js`);
}
function sayHi(){
    return 'Hi...!!'
}
function goodMorning(){
    return 'Good Morning';
}

greett(goodMorning);
greett(sayHi);

/** Hogher Order Functions */

// function higherOrder(func){
//     return 
// }


const inputs = [3,5,3,2,4,11,5,8,6,4,1,12];

function squares(inputs){
    const squared=[];
    for(let num of inputs)
    {
        squared.push(num *num);
    }
    return squared;
}

function cubes(inputs){
    const cubed=[];
    for(let num of inputs)
    {
        cubed.push(num *num *num);
    }
    return cubed;
}

console.log(squares(inputs));
console.log(cubes(inputs));


//now using hof
function operation(inputs, fn){
    const output=[];
    for(let num of inputs){
        output.push(fn(num));
    }
    return output
}

function square(number){
       return number *number;
}

function cube(number1){
    return number1 *number1*number1;
}

console.log(operation(inputs,square));

console.log(operation(inputs,cube));


// function display(input) {
//     console.log("In display function!!");
//     input("cybage");
// }
// function msg(info) {
//     console.log(info);
// }
// // display(function msg(info:string):void{
// //     console.log(info);
// // })
// // display((info:string):void=>console.log(info))
// display("Krish");
// display(23);
// display(true);
// display(null);
// display(msg);