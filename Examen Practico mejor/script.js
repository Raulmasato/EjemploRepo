// Referencias a elementos del DOM
const caudalseleccion = document.getElementById('caudal');
const CaudalG = document.getElementById('CaudalGeneral');
const CaudalC = document.getElementById('CaudalCircular');
const CaudalR = document.getElementById('CaudalRectangular');
const resultadoDiv = document.getElementById('resultado');
const valorSpan = document.getElementById('valor');
const resultadoDetalle = document.getElementById('resultadoDetalle');
const btnCalcular = document.getElementById('btnCalcular');
const validationSummary = document.getElementById('validationSummary');
const errorList = document.getElementById('errorList');

// Configuración de validaciones por campo
const validationRules = {
    V1: { name: 'Velocidad', min: 0, max: 100, required: true },
    S1: { name: 'Área de la sección', min: 0, max: 1000, required: true },
    V2: { name: 'Velocidad', min: 0, max: 100, required: true },
    D1: { name: 'Diámetro', min: 0, max: 10, required: true },
    V3: { name: 'Velocidad', min: 0, max: 100, required: true },
    A1: { name: 'Lado A', min: 0, max: 10, required: true },
    B1: { name: 'Lado B', min: 0, max: 10, required: true }
};

// Función para validar un campo individual
function validateField(fieldId, value) {
    const rules = validationRules[fieldId];
    const errors = [];
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + '-error');

    // Limpiar estados anteriores
    field.classList.remove('error', 'valid');
    errorSpan.textContent = '';

    if (rules.required && (value === '' || value === null || value === undefined)) {
        errors.push(`${rules.name} es obligatorio`);
    } else if (value !== '' && value !== null && value !== undefined) {
        const numValue = parseFloat(value);
        
        if (isNaN(numValue)) {
            errors.push(`${rules.name} debe ser un número válido`);
        } else {
            if (numValue < rules.min) {
                errors.push(`${rules.name} debe ser mayor o igual a ${rules.min}`);
            }
            if (numValue > rules.max) {
                errors.push(`${rules.name} debe ser menor o igual a ${rules.max}`);
            }
            if (numValue === 0 && fieldId !== 'V1' && fieldId !== 'V2' && fieldId !== 'V3') {
                errors.push(`${rules.name} debe ser mayor que 0`);
            }
            // Validación especial para velocidades
            if ((fieldId === 'V1' || fieldId === 'V2' || fieldId === 'V3') && numValue <= 0) {
                errors.push(`${rules.name} debe ser mayor que 0`);
            }
        }
    }

    // Aplicar estilos visuales
    if (errors.length > 0) {
        field.classList.add('error');
        errorSpan.textContent = errors[0]; // Mostrar solo el primer error
    } else if (value !== '' && value !== null && value !== undefined) {
        field.classList.add('valid');
    }

    return errors;
}

// Función para validar todos los campos activos
function validateActiveFields() {
    const activeFieldset = getActiveFieldset();
    if (!activeFieldset) return ['Debe seleccionar un tipo de cálculo'];

    let allErrors = [];
    const inputs = activeFieldset.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        const errors = validateField(input.id, input.value);
        allErrors = allErrors.concat(errors);
    });

    // Mostrar resumen de errores
    if (allErrors.length > 0) {
        errorList.innerHTML = allErrors.map(error => `<li>${error}</li>`).join('');
        validationSummary.classList.remove('hidden');
        btnCalcular.disabled = true;
    } else {
        validationSummary.classList.add('hidden');
        btnCalcular.disabled = false;
    }

    return allErrors;
}

// Función para obtener el fieldset activo
function getActiveFieldset() {
    switch (caudalseleccion.value) {
        case '1': return CaudalG;
        case '2': return CaudalC;
        case '3': return CaudalR;
        default: return null;
    }
}

// Event listener para cambio de selección
caudalseleccion.addEventListener('change', () => {
    // Ocultar todos los fieldsets
    CaudalG.style.display = 'none';
    CaudalC.style.display = 'none';
    CaudalR.style.display = 'none';
    resultadoDiv.style.display = 'none';
    validationSummary.classList.add('hidden');

    // Mostrar el fieldset seleccionado
    if (caudalseleccion.value === '1') {
        CaudalG.style.display = 'block';
    } else if (caudalseleccion.value === '2') {
        CaudalC.style.display = 'block';
    } else if (caudalseleccion.value === '3') {
        CaudalR.style.display = 'block';
    }

    // Limpiar todos los campos y validaciones
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
        input.classList.remove('error', 'valid');
    });
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
    });

    btnCalcular.disabled = caudalseleccion.value === '';
});

// Event listeners para validación en tiempo real
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', () => {
        validateField(input.id, input.value);
        setTimeout(validateActiveFields, 100); // Pequeño delay para mejor UX
    });

    input.addEventListener('blur', () => {
        validateActiveFields();
    });
});

// Event listener para el botón calcular
btnCalcular.addEventListener('click', () => {
    const errors = validateActiveFields();
    if (errors.length > 0) {
        return; // No calcular si hay errores
    }

    let caudalResultado;
    let detalleCalculo = '';

    try {
        switch (caudalseleccion.value) {
            case '1': {
                const V1 = parseFloat(document.getElementById('V1').value);
                const S1 = parseFloat(document.getElementById('S1').value);
                caudalResultado = V1 * S1;
                detalleCalculo = `Q = ${V1} m/s × ${S1} m² = ${caudalResultado.toFixed(6)} m³/s`;
                break;
            }
            case '2': {
                const V2 = parseFloat(document.getElementById('V2').value);
                const D1 = parseFloat(document.getElementById('D1').value);
                const area = (Math.PI * Math.pow(D1, 2)) / 4;
                caudalResultado = V2 * area;
                detalleCalculo = `Q = ${V2} m/s × π × (${D1} m)²/4 = ${V2} × ${area.toFixed(6)} = ${caudalResultado.toFixed(6)} m³/s`;
                break;
            }
            case '3': {
                const V3 = parseFloat(document.getElementById('V3').value);
                const A1 = parseFloat(document.getElementById('A1').value);
                const B1 = parseFloat(document.getElementById('B1').value);
                caudalResultado = V3 * A1 * B1;
                detalleCalculo = `Q = ${V3} m/s × ${A1} m × ${B1} m = ${caudalResultado.toFixed(6)} m³/s`;
                break;
            }
            default:
                throw new Error('Debe seleccionar un tipo de cálculo');
        }

        // Validaciones adicionales del resultado
        if (caudalResultado < 0) {
            throw new Error('El resultado no puede ser negativo');
        }
        if (!isFinite(caudalResultado)) {
            throw new Error('El resultado no es un número válido');
        }
        if (caudalResultado > 1000) {
            alert('⚠️ Advertencia: El caudal calculado es muy alto. Verifique los valores ingresados.');
        }

        valorSpan.textContent = caudalResultado.toFixed(6);
        resultadoDetalle.textContent = detalleCalculo;
        resultadoDiv.style.display = 'block';

    } catch (error) {
        alert('Error en el cálculo: ' + error.message);
    }
});

// Inicialización
btnCalcular.disabled = true;