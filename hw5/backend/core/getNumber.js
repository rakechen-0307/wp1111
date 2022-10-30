let number = 0

const getNumber = () => {
    return number
}

const genNumber = () => {
    let newNumber = Math.floor(Math.random()*99)+1
    number = newNumber
}

export {getNumber, genNumber}