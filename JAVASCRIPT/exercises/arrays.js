let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
             "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Pregunta 10
console.log(meses[4], meses[10]);

// Pregunta 11
console.log(meses.sort());

// Pregunta 12
meses.unshift("Primer Mes");
meses.push("Ultimo Mes");
console.log(meses);

// Pregunta 13
meses.shift();
meses.pop();
console.log(meses);

// Pregunta 14
console.log(meses.reverse());

// Pregunta 15
console.log(meses.join('-'));

// Pregunta 16
let copia = meses.slice(4, 11);
console.log(copia);
