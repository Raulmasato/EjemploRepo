// Pregunta 17
let random = Math.random();
if (random >= 0.5) {
  alert("Mayor que 0.5");
} else {
  alert("menor que 0.5");
}

// Pregunta 18
let age = 65;
if (age < 2) {
  alert("Bebe");
} else if (age <= 12) {
  alert("Niño");
} else if (age <= 19) {
  alert("Adolescente");
} else if (age <= 30) {
  alert("Joven");
} else if (age <= 60) {
  alert("Adulto");
} else if (age <= 75) {
  alert("Adulto mayor");
} else {
  alert("Anciano");
}
