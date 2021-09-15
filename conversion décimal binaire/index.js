const conversion = "octal"

const décimal = 20

const binaire = 10100

var result

//conversion décimal binaire
if (conversion == "binaire") {

    result = décimal.toString(2); //converti le nombre décimal en binaire

    console.log(result)

}
//conversion binaire décimal
else if (conversion == "décimal") {

    result = binaire.toString(10); //converti le nombre binaire en décimal

    console.log(result)

}
else if (conversion == "hexadécimal") {

    result = décimal.toString(16); //converti le nombre décimal en hexadécimal

    console.log(result)

}




