window.addEventListener("load", iniciarJuego)

//ELEMENTOS HTML
const sectionAtaques = document.getElementById("selecciona-ataque")
const sectionReinicio = document.getElementById("reinicio")
const botonSeleccionarMasc = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("reinicio-juego")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const sectionMascotas = document.getElementById("selecciona-mascota")
const spanMascotaEnemigo = document.getElementById("mascota-enemiga")

const spanVidasJugador = document.getElementById("vidas-jugador") 
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const sectionAtaqueJugador = document.getElementById("ataque-jugador")
const sectionAtaqueEnemigo = document.getElementById("ataque-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotonesAtaques = document.getElementById("contenedor-botones-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapaCanvas = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaJugador 
let botonesAtaques 
let botonFuego
let botonAgua
let botonTierra 
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let arrayAtaquesEnemigo 
let indexAtaqueJugador
let indexAtaqueEnemigo
let resultado
let resultadoFinal
let vidasEnemigo = 0
let vidasJugador = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mokemap = new Image()
mokemap.src = "./img-mokepon/mokemap.png"
let arrayMascJugador = []

//CLASS MOKEPONES
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id){
        this.id = id
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 60;
        this.alto = 60;
        this.x = numAleatorio(10, 790);
        this.y = numAleatorio(10, 540);
        this.velocidadX = 0
        this.velocidadY = 0
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
    }
    pintarPersonaje(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge💧", "./img-mokepon/hipodogeImg.png", 5, "./img-mokepon/hipodogeCabeza.png")
let capipepo = new Mokepon("Capipepo🌱", "./img-mokepon/capipepoImg.png", 5, "./img-mokepon/capipepoCabeza.png")
let ratigueya = new Mokepon("Ratigueya🔥", "./img-mokepon/ratigueyaImg.png", 5, "./img-mokepon/ratigueyaCabeza.png")

let hipodogeEnemigo = new Mokepon("Hipodoge💧", "./img-mokepon/hipodogeImg.png", 5, "./img-mokepon/hipodogeCabeza.png")
let capipepoEnemigo = new Mokepon("Capipepo🌱", "./img-mokepon/capipepoImg.png", 5, "./img-mokepon/capipepoCabeza.png")
let ratigueyaEnemigo = new Mokepon("Ratigueya🔥", "./img-mokepon/ratigueyaImg.png", 5, "./img-mokepon/ratigueyaCabeza.png")

mokepones.push(hipodoge, capipepo, ratigueya)

hipodoge.ataques.push(
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
)
hipodogeEnemigo.ataques.push(
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
)

capipepo.ataques.push(
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
)
capipepoEnemigo.ataques.push(
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Tierra🌱", id: "ataque-tierra"},
)

ratigueya.ataques.push(
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
)
ratigueyaEnemigo.ataques.push(
    {nombre: "Tierra🌱", id: "ataque-tierra"},
    {nombre: "Agua💧", id: "ataque-agua"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
    {nombre: "Fuego🔥" , id: "ataque-fuego"},
)

function iniciarJuego() {
    sectionVerMapa.style.display = "none"
    sectionAtaques.style.display = "none"
    sectionReinicio.style.display = "none"

    mokepones.forEach(mokepon =>{
        opcionDeMokepones = `
              <input type="radio" name="mascotas" id=${mokepon.nombre} />
             <label class="tarjeta-mokepon" for =${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src =${mokepon.foto} alt=${mokepon.nombre}>
              </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

         inputHipodoge = document.getElementById("Hipodoge💧")
         inputCapipepo = document.getElementById("Capipepo🌱")
         inputRatigueya = document.getElementById("Ratigueya🔥")
    })
    
    botonSeleccionarMasc.addEventListener("click", seleccionarMascJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
    .then(function (res) {
        if (res.ok){
            res.text()
            .then(function (respuesta){
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    }) 
}

function numAleatorio(min, max){
    return Math.floor(Math.random() * (max-min +1) + min)
}

//SELECCIONAR MASCOTAS
function seleccionarMascJugador() {
    sectionVerMapa.style.display = "flex"

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
       spanMascotaJugador.innerHTML = inputRatigueya.id
       mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota")
        reiniciarJuego()
    }
    iniciarMapa()
    extraerAtaques(mascotaJugador)
    seleccionarMascotaId(mascotaJugador)
}

function seleccionarMascotaId(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    mokepones.forEach(mokepon =>{
        if (mascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
            arrayMascJugador = mokepon
        }
    })
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach(ataque => {
        botonesAtaques = `
        <button class="boton-ataque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorBotonesAtaques.innerHTML += botonesAtaques
    })
    
  botonFuego = document.getElementById("ataque-fuego")
  botonAgua = document.getElementById("ataque-agua")
  botonTierra = document.getElementById("ataque-tierra")

  botones =  document.querySelectorAll(".boton-ataque")
}

function seleccionarMascEnemigo (enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    arrayAtaquesEnemigo = enemigo.ataques
    secuenciaAtaques()
}

//SELECCIONAR ATAQUES
function secuenciaAtaques(){
    botones.forEach(boton =>{
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Fuego🔥"){
                ataqueJugador.push("Fuego🔥")
                boton.disabled = true
                console.log(ataqueJugador)
            } else if (e.target.textContent === "Agua💧"){
                ataqueJugador.push("Agua💧")
                boton.disabled = true
                console.log(ataqueJugador)
            } else {
                ataqueJugador.push("Tierra🌱")
                boton.disabled = true
                console.log(ataqueJugador)
            }
            if (ataqueJugador.length === 5){
                enviarAtaques() }

            ataqueAleatorioEnemigo()
        }) 
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if (res.ok){
            res.json()
            .then(function({ataques}){
                if (ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = numAleatorio(0, arrayAtaquesEnemigo.length - 1)
    ataqueEnemigo.push(arrayAtaquesEnemigo[ataqueAleatorio].nombre)

     console.log(ataqueEnemigo)
     iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length === 5){
        combate()
    } 
}

function indexAtaquesMensaje(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//COMBATE
function combate(){
    clearInterval(intervalo)
    for (let i = 0; i < ataqueJugador.length; i++){
        if (ataqueJugador[i] == ataqueEnemigo[i]){
            indexAtaquesMensaje(i, i)
            resultado = "EMPATE"
        } else if (ataqueJugador[i] == "Fuego🔥" && ataqueEnemigo[i] == "Tierra🌱"){
            resultado = "GANASTE"
            indexAtaquesMensaje(i, i)
            vidasJugador++
            spanVidasJugador.innerHTML = vidasJugador
        } else if (ataqueJugador[i] == "Agua💧" && ataqueEnemigo[i] == "Fuego🔥"){
            resultado = "GANASTE"
            indexAtaquesMensaje(i, i)
            vidasJugador++
            spanVidasJugador.innerHTML = vidasJugador
        } else if (ataqueJugador[i] == "Tierra🌱" && ataqueEnemigo[i] == "Agua💧"){
            resultado = "GANASTE"
            indexAtaquesMensaje(i, i)
            vidasJugador++
            spanVidasJugador.innerHTML = vidasJugador
        } else {
            resultado = "PERDISTE"
            indexAtaquesMensaje(i, i)
             vidasEnemigo++
             spanVidasEnemigo.innerHTML = vidasEnemigo
        } 
        crearMensaje()
    }
    revisarVidas()
}

function revisarVidas(){
    if (vidasJugador == vidasEnemigo){
        resultadoFinal = "Esto fue un EMPATE"
        crearMensajeFinal()
    } else if (vidasJugador < vidasEnemigo) {
        resultadoFinal = "PERDISTE. Tú mascota no tiene más vidas ☹️"
        crearMensajeFinal()
    } else {
        resultadoFinal = "GANASTE. La mascota enemiga no tiene más vidas 🎊"
        crearMensajeFinal()
    }
}

//MENSAJE
function crearMensaje(){
    let parrafoAtaqueJugador = document.createElement("p")
    let parrafoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    parrafoAtaqueJugador.innerHTML = indexAtaqueJugador
    parrafoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    sectionAtaqueJugador.appendChild(parrafoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(parrafoAtaqueEnemigo)
}

function crearMensajeFinal(){
    sectionReinicio.style.display = "block"

    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}

//CANVAS
function iniciarMapa(){
    sectionMascotas.style.display = "none"

    mapa.width = 820
    mapa.height = 570
    intervalo = setInterval(pintarPersonaje, 50)
    window.addEventListener("keydown", eventoTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function pintarPersonaje(){
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mokemap,
        0,
        0,
        mapa.width,
        mapa.height,
    )
     arrayMascJugador.x = arrayMascJugador.x + arrayMascJugador.velocidadX
     arrayMascJugador.y = arrayMascJugador.y + arrayMascJugador.velocidadY
     enviarPosicion(arrayMascJugador.x, arrayMascJugador.y)
     arrayMascJugador.pintarPersonaje()    
     hipodogeEnemigo.pintarPersonaje()
     capipepoEnemigo.pintarPersonaje()
     ratigueyaEnemigo.pintarPersonaje()
     mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarPersonaje()
        revisarColision(mokepon)
     })

     if(arrayMascJugador.velocidadX !== 0 || arrayMascJugador.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
     }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
            .then(function({enemigos}){
                console.log(enemigos)
                mokeponesEnemigos = enemigos.map(function(enemigo){
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre
                    if (mokeponNombre === "Hipodoge💧"){
                        mokeponEnemigo = new Mokepon("Hipodoge💧", "./img-mokepon/hipodogeImg.png", 5, "./img-mokepon/hipodogeCabeza.png", enemigo.id)
                    } else if (mokeponNombre === "Capipepo🌱"){
                        mokeponEnemigo =  new Mokepon("Capipepo🌱", "./img-mokepon/capipepoImg.png", 5, "./img-mokepon/capipepoCabeza.png", enemigo.id)
                    } else if (mokeponNombre === "Ratigueya🔥"){
                        mokeponEnemigo = new Mokepon("Ratigueya🔥", "./img-mokepon/ratigueyaImg.png", 5, "./img-mokepon/ratigueyaCabeza.png", enemigo.id)
                    }
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    return mokeponEnemigo
                })
            })
        }
    })
}

function moverDerecha(){  
    arrayMascJugador.velocidadX = 5
 }
   

function moverIzquierda(){
    arrayMascJugador.velocidadX = - 5
    
}

function moverArriba(){
    arrayMascJugador.velocidadY = - 5
}

function moverAbajo(){
    arrayMascJugador.velocidadY = 5
     
}

function detenerMovimiento() {
    arrayMascJugador.velocidadY = 0
    arrayMascJugador.velocidadX = 0
      
}

function eventoTecla(event) {
    if (event.key === "ArrowRight"){
        moverDerecha()
    } else if (event.key === "ArrowLeft") {
        moverIzquierda()
    } else if (event.key === "ArrowUp") {
        moverArriba()
    } else if (event.key === "ArrowDown") {
        moverAbajo()
    }
}

function revisarColision(enemigo){
    const arribaMascota = arrayMascJugador.y
    const abajoMascota = arrayMascJugador.y + arrayMascJugador.alto
    const izquierdaMascota = arrayMascJugador.x
    const derechaMascota = arrayMascJugador.x + arrayMascJugador.ancho

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    if (
        izquierdaMascota > derechaEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo
    ){
        return
    } 
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionAtaques.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascEnemigo(enemigo)
}

//REINICIO
function reiniciarJuego(){
    location.reload()
}