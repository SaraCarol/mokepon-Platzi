window.addEventListener("load", iniciarJuego)

let ataqueJugador 
let ataqueEnemigo
let resultado
let resultadoFinal
let vidasEnemigo = 3
let vidasJugador = 3

function iniciarJuego() {
    let sectionAtaques = document.getElementById("selecciona-ataque")
    sectionAtaques.style.display = "none"
    let sectionReinicio = document.getElementById("reinicio")
    sectionReinicio.style.display = "none"

    let botonSeleccionarMasc = document.getElementById("boton-mascota")
    botonSeleccionarMasc.addEventListener("click", seleccionarMascJugador)

    let botonFuego = document.getElementById("ataque-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("ataque-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("ataque-tierra")
    botonTierra.addEventListener("click", ataqueTierra)

    let botonReiniciar = document.getElementById("reinicio-juego")
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function numAleatorio(min, max){
    return Math.floor(Math.random() * (max-min +1) + min)
}
//SELECCIONAR MASCOTAS

function seleccionarMascJugador() {
    let sectionAtaques = document.getElementById("selecciona-ataque")
    sectionAtaques.style.display = "flex"

    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")
    
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked){
       spanMascotaJugador.innerHTML = "Ratigueya"
    } else {
        alert("Selecciona una mascota")
        reiniciarJuego()
    }

    seleccionarMascEnemigo()
}

function seleccionarMascEnemigo (){
    let sectionMascotas = document.getElementById("selecciona-mascota")
    sectionMascotas.style.display = "none"

    let mascotaAleatoria = numAleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemiga")

    if (mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if (mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else {
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
}

//SELECCIONAR ATAQUES

function ataqueFuego(){
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = numAleatorio(1,3)

     if (ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO"
     } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "AGUA"
     } else {
        ataqueEnemigo = "TIERRA"
     }

     combate()
}

//COMBATE
function combate(){
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")

    if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultado = "GANASTE"
        vidasEnemigo = vidasEnemigo - 1
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultado = "GANASTE"
        vidasEnemigo = vidasEnemigo - 1
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultado = "GANASTE"
        vidasEnemigo = vidasEnemigo - 1
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = "PERDISTE"
        vidasJugador = vidasJugador - 1
        spanVidasJugador.innerHTML = vidasJugador
    }
    crearMensaje() 
    revisarVidas()
}

function revisarVidas(){
    if (vidasJugador == 0){
        resultadoFinal = "PERDISTE. Tú mascota no tiene más vidas ☹️"
        crearMensajeFinal()
    } else if (vidasEnemigo == 0){
        resultadoFinal = "GANASTE. La mascota enemiga no tiene más vidas 🎊"
        crearMensajeFinal()
    }
}

//MENSAJE
function crearMensaje(){
    let sectionMensajes = document.getElementById("resultado")
    let sectionAtaqueJugador = document.getElementById("ataque-jugador")
    let sectionAtaqueEnemigo = document.getElementById("ataque-enemigo")

    let parrafoAtaqueJugador = document.createElement("p")
    let parrafoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    parrafoAtaqueJugador.innerHTML = ataqueJugador
    parrafoAtaqueEnemigo.innerHTML = ataqueEnemigo

    sectionAtaqueJugador.appendChild(parrafoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(parrafoAtaqueEnemigo)
}

function crearMensajeFinal(){
    let sectionReinicio = document.getElementById("reinicio")
    sectionReinicio.style.display = "block"

    let sectionMensajes = document.getElementById("resultado")

    sectionMensajes.innerHTML = resultadoFinal

    let botonFuego = document.getElementById("ataque-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("ataque-agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("ataque-tierra")
    botonTierra.disabled = true
}

//REINICIO
function reiniciarJuego(){
    location.reload()
}