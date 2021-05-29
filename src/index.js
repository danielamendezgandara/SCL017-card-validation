import validator from './validator.js';

const pop_up_window = document.getElementById("pop_up_window");
const message=document.getElementById("message");
const close = document.getElementById("close");
const send = document.getElementById("send");
const check = document.getElementById("check");
const name = document.getElementById("name");
const cvc=document.getElementById("cvc");
const numberCard = document.getElementById("number");
let shelf;
let state = "";
let cont = 0;

name.onkeypress = function (e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
	//let  especiales = "8-37-39-46";
	let nueva = "";
	let especiales = nueva >= 33 && nueva <= 47;

	let tecla_especial = false;
	for (var i in especiales) {
		if (key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}

	if (letras.indexOf(tecla) == -1 && !tecla_especial) {
		return false;
	}
}

numberCard.onkeypress = function (evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		location.reload();
		return false;
	} else {
		numberCard.onkeyup = function (e) {
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
		pop_up_window.style.display = "block";
	}else{
    message.innerHTML="Su tarjeta es válida"
    pop_up_window.style.display= "block";
  }
}

cvc.onkeypress = function (e) {
	var charCode = (e.which) ? e.which : e.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	} else {
		return true;
	}
}

send.onclick = function () {
	check.onsubmit = function () {
		validation();
		return false;
	}
}

close.addEventListener("click", cerrar);

function cerrar() {
	pop_up_window.style.display = "none";
    location.reload();
}