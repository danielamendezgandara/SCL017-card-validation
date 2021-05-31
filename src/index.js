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
	let computerKey = String.fromCharCode(key).toLowerCase();
	let letters= " áéíóúabcdefghijklmnñopqrstuvwxyz";
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

numberCard.onkeypress = function (evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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
		numberCard.value="";	
	}else{
    message.innerHTML="Su tarjeta es válida"
    pop_up_window.style.display= "block";
	numberCard.value="";
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
}