// CHANGE THEME FUNCTION

import { firstTheme, secondTheme, thirdTheme } from "./themes.js";

const body = document.querySelector("body");
const calcText = body.querySelector(".calcTitle");
const themeText = body.querySelector(".themeText");
const themeSwitcherProfiles = body.querySelector(".themeSwitcherProfiles");
const calculatorDisplayInput = body.querySelector(".calculatorDisplayInput");
const calculatorDisplay = body.querySelector(".calculatorDisplay");
const themeSwitcherBar = body.querySelector(".themeSwitcherBar");
const buttonArea = body.querySelector(".calculatorButtonsArea");
const calculatorButtons = body.querySelectorAll(".calculatorButton");
const deleteButton = body.querySelector(".calculatorButtonDel");
const resetButton = body.querySelector(".calculatorButtonReset");
const equalButton = body.querySelector(".calculatorButtonEqual");

const themeProfiles = body.querySelectorAll(".themeProfile");

function changeTheme(themeArray) {
    body.style.backgroundColor = themeArray[0];
    calcText.style.color = themeArray[1];
    themeText.style.color = themeArray[1];
    themeSwitcherProfiles.style.color = themeArray[1];
    calculatorDisplayInput.style.color = themeArray[1];
    calculatorDisplay.style.backgroundColor = themeArray[2];
    themeSwitcherBar.style.backgroundColor = themeArray[3];
    buttonArea.style.backgroundColor = themeArray[3];
    calculatorButtons.forEach(button => button.style.backgroundColor = themeArray[4]);
    calculatorButtons.forEach(button => button.style.boxShadow = "0px 2.5px 1px 1px " + themeArray[5]);
    calculatorButtons.forEach(button => button.style.color = themeArray[6]);
    deleteButton.style.backgroundColor = themeArray[7];
    deleteButton.style.boxShadow = "0px 2.5px 1px 1px " + themeArray[8];
    deleteButton.style.color = themeArray[9];
    resetButton.style.backgroundColor = themeArray[7];
    resetButton.style.boxShadow = "0px 2.5px 1px 1px " + themeArray[8];
    resetButton.style.color = themeArray[9];
    equalButton.style.backgroundColor = themeArray[10];
    equalButton.style.boxShadow = "0px 2.5px 1px 1px " + themeArray[11];
    equalButton.style.color = themeArray[12];

    return themeArray[10];
}

themeProfiles.forEach(themeProfile => themeProfile.addEventListener("click", event => {
    let previusTheme = body.querySelector(".selectedTheme");
    previusTheme.style.backgroundColor = "transparent"
    previusTheme.classList.remove("selectedTheme")

    event.target.classList.add("selectedTheme")

    if(event.target.classList[0] === "firstTheme") {
        event.target.style.backgroundColor = changeTheme(firstTheme)
    } else if(event.target.classList[0] === "secondTheme") {
        event.target.style.backgroundColor = changeTheme(secondTheme)
    } else {
        event.target.style.backgroundColor = changeTheme(thirdTheme)
    } 
}))

// CALCULATE FUNCTIONS

calculatorButtons.forEach(button => button.addEventListener("click", (event) => {
    if(event.target.innerText != "DEL")
        calculatorDisplayInput.value += event.target.innerText
}))

window.addEventListener("keydown", (event) => {
    if(event.key === "9" || event.key === "8" || event.key === "7" || event.key === "6" || event.key === "5" || event.key ==="4" || event.key === "3" || event.key === "2" || event.key === "1" || event.key === "0" || event.key === "." || event.key === "+" || event.key === "-" || event.key === "x" || event.key === "/" || event.key === "=") {
        const pressedKey = Array.from(calculatorButtons).find(button => button.innerText === event.key)
        pressedKey.click()
    } else if (event.key === "Backspace") {
        deleteButton.click()
    }
})

//window.addEventListener("keydown", (event) => {
    //console.log(event.key)
//})

deleteButton.addEventListener("click", (event) => {
    calculatorDisplayInput.value = calculatorDisplayInput.value.substring(0, calculatorDisplayInput.value.length - 1)
})

resetButton.addEventListener("click", () => {
    calculatorDisplayInput.value = ""
})

equalButton.addEventListener("click", (event) => {
    let calculationCompleted;

    do {
        let thereIsX = calculatorDisplayInput.value.indexOf("x")
        let thereIsDivided = calculatorDisplayInput.value.indexOf("/")
        let thereIsMinus = calculatorDisplayInput.value.indexOf("-")
        let thereIsPlus = calculatorDisplayInput.value.indexOf("+")

        let exp;
        let indexOfOperator;
        let numberOne;
        let numberTwo;
        let newExpression;

        if (thereIsX != -1 && (thereIsX < thereIsDivided || thereIsDivided === -1)) {
            exp = calculatorDisplayInput.value.match(/[0-9.]+x[0-9.]/)
            console.log(exp)
            indexOfOperator = exp[0].indexOf("x")
            numberOne = parseFloat(exp[0].substring(0, indexOfOperator))
            numberTwo = parseFloat(exp[0].substring(++indexOfOperator, exp[0].length))
            newExpression = calculatorDisplayInput.value.replace(exp, numberOne * numberTwo)
            calculatorDisplayInput.value = newExpression
        }

        if (thereIsDivided != -1) {
            exp = calculatorDisplayInput.value.match(/[0-9.]+\/[0-9.]+/)
            indexOfOperator = exp[0].indexOf("/")
            numberOne = parseFloat(exp[0].substring(0, indexOfOperator))
            numberTwo = parseFloat(exp[0].substring(++indexOfOperator, exp[0].length))
            newExpression = calculatorDisplayInput.value.replace(exp, numberOne / numberTwo)
            calculatorDisplayInput.value = newExpression
        }

        if (thereIsMinus != -1 && (thereIsMinus < thereIsPlus || thereIsPlus === -1) && thereIsDivided === -1 && thereIsX === -1) {
            exp = calculatorDisplayInput.value.match(/[0-9.]+-[0-9.]+/)
            indexOfOperator = exp[0].indexOf("-")
            numberOne = parseFloat(exp[0].substring(0, indexOfOperator))
            numberTwo = parseFloat(exp[0].substring(++indexOfOperator, exp[0].length))
            newExpression = calculatorDisplayInput.value.replace(exp, numberOne - numberTwo)
            calculatorDisplayInput.value = newExpression
        }

        if (thereIsPlus != -1 && thereIsDivided === -1 && thereIsX === -1) {
            exp = calculatorDisplayInput.value.match(/[0-9.]+\+[0-9.]+/)
            indexOfOperator = exp[0].indexOf("+")
            numberOne = parseFloat(exp[0].substring(0, indexOfOperator))
            numberTwo = parseFloat(exp[0].substring(++indexOfOperator, exp[0].length))
            newExpression = calculatorDisplayInput.value.replace(exp, numberOne + numberTwo)
            calculatorDisplayInput.value = newExpression
        }

        thereIsX = calculatorDisplayInput.value.indexOf("x")
        thereIsDivided = calculatorDisplayInput.value.indexOf("/")
        thereIsMinus = calculatorDisplayInput.value.indexOf("-")
        thereIsPlus = calculatorDisplayInput.value.indexOf("+")

        if (thereIsX === -1 && thereIsDivided === -1 && thereIsDivided === -1 && thereIsPlus === -1) {
            calculationCompleted = true
        }


    } while (calculationCompleted != true)
})