import React from "react";

let x;
let y;

function Sum(x, y){
    return x + y;
};

function Sub(x, y){
    return x - y;
};

function Mul(x, y){
    return x * y;
};

function Div(x, y){
   if(y == 0){
    return "Can't divide by zero";
   }else{
    return x / y;
   }
};



//export default x;

export {Sum, Sub, Mul, Div};  