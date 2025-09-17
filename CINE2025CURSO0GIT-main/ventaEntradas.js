var aPelis = ["Que bello es vivir", "Solo en casa", "Cuento de Navidad", "Gladiator 2"];
var aLoc   = [50, 120, 60, 120];
var aSalas = ["1", "2", "3", "2"];

var aVendidas1 = [];
var aVendidas2 = [];
var aVendidas3 = [];

var vendidas   = [];
var asientos   = [];

var numButacas = 0;
var sala       = 0;
var butacaSel  = 0;
var peli       = "";
const precio   = 5;

function seleccionarPeli() {
    var indice = this.event.target.id.substring(4);
    sala       = aSalas[indice - 1];
    peli       = aPelis[indice - 1];
    numButacas = aLoc[indice - 1];
    butacaSel  = 0;

    switch (indice) {
        case "1":
            vendidas = aVendidas1.slice();
            break;
        case "2":
            vendidas = aVendidas2.slice();
            break;
        case "3":
            vendidas = aVendidas3.slice();
            break;
        case "4":
            vendidas = aVendidas2.slice();
            break;
    }
    pintarButacas();
}

function pintarButacas() {
    contenedor.innerHTML  = "<br>";
    contenedor.innerHTML += "<h3>SALA DE CINE</h3>";

    for (let i = 1; i <= numButacas; i++) {
        if (vendidas.includes(i)) {
            contenedor.innerHTML += "<button id='butaca" + i + "' class='ocupado'>" + i + "</button> ";
        } else {
            contenedor.innerHTML += "<button id='butaca" + i + "' class='libre' onclick='seleccionar();' title='Seleccionar asiento'>" + i + "</button> ";
        }
        if (i % 15 === 0) contenedor.innerHTML += "<br>";
    }

    if (numButacas === vendidas.length) {
        contenedor.innerHTML += "<br><img src='img/soldout.png' alt='Sin localidades' title='Localidades agotadas. Seleccione otra película.'>";
    } else {
        contenedor.innerHTML += "<br><br><button id='btnConfirm' onclick='confirmarVenta();' title='Comprar entradas'>Comprar</button>";
    }

    if (vendidas.length > numButacas / 2) {
        contenedor.innerHTML += "<div style='margin-top:20px; color:red; font-weight:bold;'>⚠️ WARNING: Ocupación mayor al 50%, date prisa con la reserva</div>";
    }
}

function seleccionar() {
    var butacaId = this.event.target.id;
    butacaId = parseInt(butacaId.substring(6));

    if (this.event.target.className === "libre") {
        vendidas.push(butacaId);
        asientos.push(butacaId);
        this.event.target.className = "seleccionado";
        butacaSel++;
    } else if (this.event.target.className === "seleccionado") {
        var idxVend = vendidas.indexOf(butacaId);
        if (idxVend !== -1) vendidas.splice(idxVend, 1);

        var idxAs = asientos.indexOf(butacaId);
        if (idxAs !== -1) asientos.splice(idxAs, 1);

        this.event.target.className = "libre";
        butacaSel--;
    }
}

function confirmarVenta() {
    if (butacaSel > 0) {
        switch (sala) {
            case "1":
                aVendidas1 = vendidas.slice();
                break;
            case "2":
                aVendidas2 = vendidas.slice();
                break;
            case "3":
                aVendidas3 = vendidas.slice();
                break;
        }

        imprimirTicket();

        switch (sala) {
            case "1":
                vendidas = aVendidas1.slice();
                break;
            case "2":
                vendidas = aVendidas2.slice();
                break;
            case "3":
                vendidas = aVendidas3.slice();
                break;
        }
        butacaSel = 0;
        pintarButacas();
    } else {
        alert("No ha seleccionado ninguna localidad");
    }
}

function imprimirTicket() {
    var importe = precio * asientos.length;
    var params  = "top=200,left=500,width=500,height=300,resizable=false";

    localStorage.setItem("pelicula", peli);
    localStorage.setItem("asientos", asientos);
    localStorage.setItem("importe", importe);

    alert("Asientos comprados: " + asientos.join(", "));

    asientos = [];

    window.open("ticket.html", "Ticket", params);
}
