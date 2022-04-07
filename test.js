let conta = "112.2/2+2"
let foi;

do {
    let thereIsX = conta.indexOf("x")
    let thereIsDivided = conta.indexOf("/")
    let thereIsMinus = conta.indexOf("-")
    let thereIsPlus = conta.indexOf("+")

    if (thereIsX != -1 && (thereIsX < thereIsDivided || thereIsDivided === -1)) {
        let exp = conta.match(/[0-9]+x[0-9]/)
        let indexOfX = exp[0].indexOf("x")
        let numberOne = parseInt(exp[0].substring(0, indexOfX))
        let numberTwo = parseInt(exp[0].substring(++indexOfX, exp[0].length))
        let novaConta = conta.replace(exp, numberOne * numberTwo)
        conta = novaConta
    }

    if (thereIsDivided != -1) {
        exp = conta.match(/[0-9.]+\/[0-9.]+/)
        console.log(exp[0])
        indexOfX = exp[0].indexOf("/")
        numberOne = parseFloat(exp[0].substring(0, indexOfX))
        numberTwo = parseFloat(exp[0].substring(++indexOfX, exp[0].length))
        console.log("this" + numberOne, numberTwo)
        novaConta = conta.replace(exp, numberOne / numberTwo)
        conta = novaConta
    }

    if (thereIsMinus != -1 && (thereIsMinus < thereIsPlus || thereIsPlus === -1) && thereIsDivided === -1 && thereIsX === -1) {
        exp = conta.match(/[0-9]+-[0-9]+/)
        indexOfX = exp[0].indexOf("-")
        numberOne = parseInt(exp[0].substring(0, indexOfX))
        numberTwo = parseInt(exp[0].substring(++indexOfX, exp[0].length))
        novaConta = conta.replace(exp, numberOne - numberTwo)
        conta = novaConta
    }

    if (thereIsPlus != -1 && thereIsDivided === -1 && thereIsX === -1) {
        exp = conta.match(/[0-9]+\+[0-9]+/)
        indexOfX = exp[0].indexOf("+")
        numberOne = parseInt(exp[0].substring(0, indexOfX))
        numberTwo = parseInt(exp[0].substring(++indexOfX, exp[0].length))
        novaConta = conta.replace(exp, numberOne + numberTwo)
        conta = novaConta
    }

    thereIsX = conta.indexOf("x")
    thereIsDivided = conta.indexOf("/")
    thereIsMinus = conta.indexOf("-")
    thereIsPlus = conta.indexOf("+")

    if (thereIsX === -1 && thereIsDivided === -1 && thereIsDivided === -1 && thereIsPlus === -1) {
        foi = true
    }

    console.log(conta)

} while (foi != true)