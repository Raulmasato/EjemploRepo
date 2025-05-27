// Pregunta 4
let texto = "Ejemplo de string UpperCase";
console.log(texto.toUpperCase());

// Pregunta 5
let corto = texto.substring(0, 5);
console.log(corto);

// Pregunta 6
let ultimos = texto.substring(texto.length - 3);
console.log(ultimos);

// Pregunta 7
let Mayus = texto[0].toUpperCase() + texto.substring(1).toLowerCase();
console.log(Mayus);

// Pregunta 8
let espacio = texto.indexOf(" ");
console.log('Posición del primer espacio:', espacio);

// Pregunta 9
let palabras = "Ejemplo funcionando";
let espacioIndex = palabras.indexOf(" ");
let palabra1 = palabras.substring(0, espacioIndex);
let palabra2 = palabras.substring(espacioIndex + 1);
let formateado = palabra1[0].toUpperCase() + palabra1.slice(1).toLowerCase() + " " +
                 palabra2[0].toUpperCase() + palabra2.slice(1).toLowerCase();
console.log(formateado);
