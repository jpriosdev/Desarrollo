// Variables para almacenar el estado del contador
let contadorIntervalo;
let tiempoInicio;
let tiempoTranscurrido = 0;
let pausado = false;

// Elementos del DOM
const btnExecutePlan = document.getElementById("executePlan");
const btnPause = document.getElementById("pauseCounter");
const btnReset = document.getElementById("resetCounter");
const contador = document.getElementById("contador");

const displayHoras = document.getElementById("horas");
const displayMinutos = document.getElementById("minutos");
const displaySegundos = document.getElementById("segundos");

// Función para actualizar el contador
function actualizarContador() {
    tiempoTranscurrido = Date.now() - tiempoInicio;

    const totalSegundos = Math.floor(tiempoTranscurrido / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    displayHoras.innerText = horas.toString().padStart(2, '0');
    displayMinutos.innerText = minutos.toString().padStart(2, '0');
    displaySegundos.innerText = segundos.toString().padStart(2, '0');
}

// Función para iniciar el contador
function iniciarContador() {
    if (!pausado) {
        tiempoInicio = Date.now();
    } else {
        tiempoInicio = Date.now() - tiempoTranscurrido;
        pausado = false;
    }

    contadorIntervalo = setInterval(actualizarContador, 1000);
}

// Función para pausar el contador
function pausarContador() {
    clearInterval(contadorIntervalo);
    pausado = true;

    // Cambiar el botón "Pausar" a "Reanudar"
    btnPause.innerText = "Reanudar";
}

// Función para reiniciar el contador
function reiniciarContador() {
    clearInterval(contadorIntervalo);
    tiempoTranscurrido = 0;
    displayHoras.innerText = "00";
    displayMinutos.innerText = "00";
    displaySegundos.innerText = "00";
    pausado = false;

    // Restaurar el botón "Reanudar" a "Pausar"
    btnPause.innerText = "Pausar";

    // Habilitar el botón "Execute Plan" nuevamente
    btnExecutePlan.disabled = false;
    btnExecutePlan.style.cursor = "pointer";
    btnExecutePlan.style.opacity = "1";

    // Ocultar los botones "Pausar" y "Reiniciar"
    btnPause.style.display = "none";
    btnReset.style.display = "none";
}

// Event Listener para el botón "Execute Plan"
btnExecutePlan.addEventListener("click", () => {
    // Mostrar el contador si está oculto
    if (contador.classList.contains("oculto")) {
        contador.classList.remove("oculto");
    }

    // Iniciar el contador
    iniciarContador();

    // Deshabilitar el botón "Execute Plan"
    btnExecutePlan.disabled = true;
    btnExecutePlan.style.cursor = "not-allowed";
    btnExecutePlan.style.opacity = "0.6";

    // Mostrar los botones "Pausar" y "Reiniciar"
    btnPause.style.display = "inline-block";
    btnReset.style.display = "inline-block";
});

// Event Listener para el botón "Pausar/Reanudar"
btnPause.addEventListener("click", () => {
    if (!pausado) {
        pausarContador();
    } else {
        iniciarContador();
        btnPause.innerText = "Pausar";
    }
});

// Event Listener para el botón "Reiniciar"
btnReset.addEventListener("click", reiniciarContador);
