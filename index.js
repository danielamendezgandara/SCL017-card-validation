import validator from './validator.js';

/*Declaración de constantes*/
const popUpWindow = document.getElementById("pop_up_window");
const message = document.getElementById("message");
const close = document.getElementById("close");
const send = document.getElementById("send");
const check = document.getElementById("check");
const name = document.getElementById("name");
const cvc = document.getElementById("cvc");
const numberCard = document.getElementById("number");
const aboutPage = document.getElementById("aboutPage");
const buyProduct1 = document.getElementById("buy1");
const buyDetails = document.getElementById("buydetails");
const wrapper = document.getElementById("wrapper");
const cancel = document.getElementById("cancel");
const quantity = document.getElementById("value");
const total = document.getElementById("total");
const follow = document.getElementById("continue");
const init = document.getElementById("init");
const checkPay = document.getElementById("block");
const purchaseTicket = document.getElementById("purchaseTicket");
const ocult = document.getElementById("ocult");
const totalPay = document.getElementById("invisible");
const totalPayProducts = document.getElementById("totalPayProducts");
const unit = document.getElementById("unit");
const namePay = document.getElementById("namePay");
const acount = document.getElementById("acount");
const finish = document.getElementById("finish");
/*Declaración de variables*/
let shelf;
let sum;
let state = "";
let cont = 0;

/*Definición del estado inicial de las pantallas creadas(ocultadas o no ocultadas)*/
wrapper.style.display = "none";
aboutPage.style.display = "block";
buyDetails.style.display = "none";
purchaseTicket.style.display = "none";
ocult.style.display = "none";

/*Declaración de eventos asociados a algunas constantes descritas anteriormente*/
buyProduct1.addEventListener("click", detailsBuy);
cancel.addEventListener("click", cancelled);
follow.addEventListener("click", buy);
init.addEventListener("click", begin);
totalPay.addEventListener("click", totalCancel);
finish.addEventListener("click", finishPay);

/*Funciones asociadas a los eventos declarados anteriormente*/
function buy() {
    wrapper.style.display = "block";
    aboutPage.style.display = "none";
    buyDetails.style.display = "none";
}

function detailsBuy() {
    aboutPage.style.display = "none";
    buyDetails.style.display = "block";
}

function cancelled() {
    wrapper.style.display = "none";
    numberCard.value = "";
    aboutPage.style.display = "block";
    location.reload();
}

function begin() {
    aboutPage.style.display = "block";
    buyDetails.style.display = "none";
    location.reload();
}

function totalCancel() {
    wrapper.style.display = "none";
    unit.innerHTML = "Unidades : " + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + quantity.value;
    totalPayProducts.innerHTML = "Monto :" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;" + "$" + sum;
    namePay.innerHTML = "Nombre :" + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + name.value.toUpperCase();
    acount.innerHTML = "Cuenta : " + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + numberCard.value;
    purchaseTicket.style.display = "block";
}

function finishPay() {
    purchaseTicket.style.display = "none";
    aboutPage.style.display = "block";
    location.reload();
}

quantity.onchange = function() {
    sum = (quantity.value) * 1000;
    total.innerHTML = "$" + sum;
}

/*El evento desencadena que se evite ingresar números a la casilla de nombre en la pantalla de medio de pago*/
name.onkeypress = function(e) {
    let key = e.keyCode || e.which;
    let computerKey = String.fromCharCode(key).toLowerCase();
    let letters = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    let character = "";
    let especials = character >= 33 && character <= 47;

    let especialKey = false;
    for (let i in especials) {
        if (key == especials[i]) {
            especialKey = true;
            break;
        }
    }

    if (letters.indexOf(computerKey) == -1 && !especialKey) {
        return false;
    }

}

/*El evento desencadena que se evite ingresar letras a la casilla de númerode tarjeta en la pantalla de medio de pago*/
numberCard.onkeypress = function(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        numberCard.onkeyup = function(e) {
            shelf = e.currentTarget.value;
            state = state + shelf.charAt(cont);
            numberCard.value = validator.maskify(numberCard.value);
            cont = cont + 1;
        }
        return true;
    }
}

function validation() {
    let cardNumber = state;
    let text = validator.isValid(cardNumber);
    if (text == false) {
        popUpWindow.style.display = "block";
        numberCard.value = "";
        state = "";
    } else {
        message.innerHTML = "Su tarjeta es válida. Puede continuar con su compra."
        checkPay.className = "fas fa-check-circle fa-3x";
        checkPay.style.color = "lightblue";
        ocult.style.display = "block";
        popUpWindow.style.display = "block";
        state = "";
    }
}

/*El evento desencadena que se evite ingresar letras a la casilla CVC en la pantalla de medio de pago*/
cvc.onkeypress = function(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}

send.onclick = function() {
    check.onsubmit = function() {
        validation();
        return false;
    }
}

close.addEventListener("click", closeWindow);

function closeWindow() {
    popUpWindow.style.display = "none";
    cvc.value = "";
    state = "";
}