// Elementos de la calculadora
const valorGuardado = document.getElementById("valor_guardado");
const valorIngresado = document.getElementById("valor_ingresado");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");
const botonIgual = document.querySelector(".operador_igual");
const botonLimpiar = document.querySelector(".limpiar");
const botonBorrar = document.querySelector(".back");
const punto = document.querySelector(".punto");
const toggleButton = document.getElementById("toggle");

let operador = "";
let valorActual = "";
let valorAnterior = null;
let operacionRealizada = false;

// funcion para cambiar de dia a noche
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleButton.classList.toggle("activado");
});

// Función para actualizar el valor mostrado en la calculadora
function actualizarDisplay() {
  valorIngresado.textContent = valorActual;
  valorGuardado.textContent =
    valorAnterior !== null ? `${valorAnterior} ${operador}` : "";
  limitPoint();
}

// Función para realizar la operaciónes
function realizarOperacion() {
  const anterior = parseFloat(valorAnterior);
  const actual = parseFloat(valorActual);

  if (isNaN(anterior) || isNaN(actual)) return;

  valorActual =
    operador === "+"
      ? anterior + actual
      : operador === "-"
      ? anterior - actual
      : operador === "x"
      ? anterior * actual
      : operador === "/"
      ? anterior / actual
      : valorActual;
  valorAnterior = null;
  operador = "";
  operacionRealizada = true;
}

// Evento click para los botones de números
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (operacionRealizada) {
      valorActual = boton.textContent;
      operacionRealizada = false;
    } else {
      valorActual += boton.textContent;
    }
    actualizarDisplay();
  });
});

// Evento click para los botones de operadores
botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (valorAnterior !== null) {
      realizarOperacion();
    }
    operador = boton.textContent;
    valorAnterior = valorActual;
    valorActual = "";
    actualizarDisplay();
  });
});

// Evento click para el botón de igual
botonIgual.addEventListener("click", () => {
  realizarOperacion();
  valorAnterior = null; // Eliminar valorAnterior después de la operación
  actualizarDisplay();
});

// Evento click para el botón de limpiar
botonLimpiar.addEventListener("click", () => {
  valorActual = "";
  valorAnterior = null;
  operador = "";
  actualizarDisplay();
});

// Evento click para el botón de borrar
botonBorrar.addEventListener("click", () => {
  valorActual = valorActual.slice(0, -1) || "";
  actualizarDisplay();
});

function limitPoint() {
  const valorActual = valorIngresado.textContent;

  if (punto && valorActual.includes(".")) {
    punto.disabled = true;
  } else {
    punto.disabled = false;
  }
}
