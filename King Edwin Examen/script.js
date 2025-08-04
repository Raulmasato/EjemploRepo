const caudalseleccion = document.getElementById('caudal');
const CaudalC = document.getElementById('CaudalCircular');
const CaudalR = document.getElementById('CaudalRectangular');
const CaudalS = document.getElementById('CaudalSeccion');
const resultadoDiv = document.getElementById('resultado');
const valorSpan = document.getElementById('valor');

  caudalseleccion.addEventListener('change', () => {
            if (caudalseleccion.value === '1') {
                CaudalC.style.display = '';
                CaudalR.style.display = 'none';
                CaudalS.style.display = 'none';
            } else if(caudalseleccion.value === '2'){
                CaudalC.style.display = 'none';
                CaudalR.style.display = '';
                CaudalS.style.display = 'none';
            }
            else if(caudalseleccion.value === '3') {
                CaudalC.style.display = 'none';
                CaudalR.style.display = 'none';
                CaudalS.style.display = '';
            }
            resultadoDiv.style.display = 'none';
        });

document.getElementById('btnCalcular').addEventListener('click', () => {
  let caudalResultado;
  switch (caudalseleccion.value) {
    case '1': {
      const V1 = parseFloat(document.getElementById('V1').value);
      const S1 = parseFloat(document.getElementById('S1').value);
      if (isNaN(V1) || isNaN(S1)) {
        alert('Completar los valores');
        return;
      }
      caudalResultado = V1 * S1;
      break;
    }
    case '2': {
      const V2 = parseFloat(document.getElementById('V2').value);
      const D1 = parseFloat(document.getElementById('D1').value);
      if (isNaN(V2) || isNaN(D1)) {
        alert('Completar los valores');
        return;
      }
      caudalResultado = V2 * (Math.PI * Math.pow(D1, 2)) / 4;
      break;
    }
    case '3': {
      const V3 = parseFloat(document.getElementById('V3').value);
      const A1 = parseFloat(document.getElementById('A1').value);
      const B1 = parseFloat(document.getElementById('B1').value);
      if (isNaN(V3) || isNaN(A1) || isNaN(B1)) {
        alert('Completar los valores');
        return;
      }
      caudalResultado = V3 * A1 * B1;
      break;
    }
    default:
      alert('Seleccione un tipo de caudal');
      return;
  }

  valorSpan.textContent = caudalResultado.toFixed(6);
  resultadoDiv.style.display = '';
});