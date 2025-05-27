// Pregunta 23
function suma(a, b) {
  return a + b;
}
let resultado = suma(4, 5);
console.log(resultado);

// Pregunta 24
function sumaValida(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    alert("Parametros con error");
    return NaN;
  }
  return a + b;
}

// Pregunta 25
function validateInteger(num) {
  return Number.isInteger(num);
}

// Pregunta 26
function sumaConEnteros(a, b) {
  if (!validateInteger(a)) {
    alert("Primer número no es entero, se redondea");
    a = Math.round(a);
  }
  if (!validateInteger(b)) {
    alert("Segundo número no es entero, se redondea");
    b = Math.round(b);
  }
  return a + b;
}

// Pregunta 27
function validarYRedondear(num) {
  if (!validateInteger(num)) {
    alert("Decimal detectado por lo que se redondea");
    return Math.round(num);
  }
  return num;
}

function sumaFinal(a, b) {
  a = validarYRedondear(a);
  b = validarYRedondear(b);
  return a + b;
}
