// alert("it works");
/*
multi line comment
*/

// variables
// "use strict" // add to top of script for stricter rules

// Primitives

var variableName = 23; // javascript statement
variableName = "redeclare"; // redeclare variable
variableName = false; // redeclare variable (boolean)

var a = "john";
var banana = 43 // global declaration


// console.log(isNaN(variableName * a)); // print variable/s in console for debugging

// var b = isNaN(variableName * a); // is b not a number
var b = !isNaN(variableName * a); // is b not a not a number, is b a number?

console.log(b);

// Complex

// Array
var array = [1, 5, "hello"];
// array[2] // to print the third value in the array, javascript is zero-based (first value is 0, so hello in the example above is 2)
// array[array.length-1] // last item in the array

// Objects
var obj = {
    color: 'red',
    height: 150
}

// Functions
// function greeting() {} // syntax
// function greeting() {
//     console.log("hello world");
// } 

function greeting(name) {

    var a = 42;
    banana = "banana" // local declaration

    if (name === undefined) {
        console.log("hello world!");

    } else {
        console.log("hello " + name);
    }

}

greeting();
greeting("john");


function peter(one, two) {

    if (one === undefined || two === undefined) {
        console.log("Nothing to multiply!");

    } else {
        console.log(one * two);
    }
}

peter();
peter(3, 4);


sum(3, 4)

function sum(a, b) {
    console.log(a + b);
}

// document.body.bgColor = "#000;";
// document.body.style.backgroundColor = "pink";


// // Random Background Color

// function randomColor() {

//     var red = Math.round(Math.random()*255);
//     var blue = Math.round(Math.random()*255);
//     var green = Math.round(Math.random()*255);
//     return `rgb(${red},${green},${blue})`;
// }

// randomColor();
// document.body.style.backgroundColor = randomColor ();


// Event Listeners

document.body.style.height = "100vh"; // Add 100vh style to body element

// Create variable called button and assign button with ID 'btn' to it.
// var button = document.getElementById("btn"); // old school

// Not limited to IDs, you can use querySelector to target classes.
// var button = document.querySelector(".button");

// Can also target child elements e.g. only target elements with the class of button that are children of body
// var button = document.querySelector("body .button");

// Can use an array with querySelectorAll for example select the first element with the class of button
var button = document.querySelectorAll(".button")[0];


document.body.addEventListener("click", randomColorEvent);
//button.addEventListener("click", randomColorEvent);

function randomColorEvent() {
    var red = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    document.body.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

// Anonymous Functions - inline functions added to the event.

button.addEventListener("click", function () {
    alert("Hello");
});