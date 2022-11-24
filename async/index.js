const { callbackify } = require("util");

console.log("Start here");

function sayHello() {
    console.log("hello");
}



setTimeout(sayHello, 3000);

console.log("End here");