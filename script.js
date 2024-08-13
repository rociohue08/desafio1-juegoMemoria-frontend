
const tarjetas = document.querySelectorAll('.tarjeta-memoria');
const cantidadTotalDeTarjetas = tarjetas.length; 

let tarjetaVolteada = false; 
let tableroBloqueado = false; 
let primeraTarjeta, segundaTarjeta; 


function voltearTarjeta() {
    if (tableroBloqueado) return;
    if (this === primeraTarjeta) return; 

    this.classList.add('volteada'); 

    if (!tarjetaVolteada) {
        tarjetaVolteada = true;
        primeraTarjeta = this;
        return;
    }

    // Segundo clic
    segundaTarjeta = this;
    comprobarPar(); 
}

// Verifica si las cartas forman un par
function comprobarPar() {
    const sonIguales = primeraTarjeta.querySelector('.cara-frontal').src === segundaTarjeta.querySelector('.cara-frontal').src;

    if (sonIguales) {
        desactivarTarjetas(); 
    } else {
        desvoltearTarjetas(); 
    }
    verificarVictoria(); 
}

// Desactiva las cartas si son un par
function desactivarTarjetas() {
    primeraTarjeta.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);

    resetearTablero(); // Prepara el tablero para la siguiente jugada
}

// Da vuelta las cartas si no forman un par
function desvoltearTarjetas() {
    tableroBloqueado = true; // Bloquea el tablero para no permitir más clics

    setTimeout(() => {
        primeraTarjeta.classList.remove('volteada');
        segundaTarjeta.classList.remove('volteada');

        resetearTablero(); 
    }, 500); 
}

// Reinicia las variables para el próximo turno
function resetearTablero() {
    tarjetaVolteada = false;
    tableroBloqueado = false;
    primeraTarjeta = null;
    segundaTarjeta = null;
}

// Mezcla las cartas al azar
(function mezclarTarjetas() {
    tarjetas.forEach(tarjeta => {
        const posicionAleatoria = Math.floor(Math.random() * tarjetas.length);
        tarjeta.style.order = posicionAleatoria;
    });
})();

tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));


