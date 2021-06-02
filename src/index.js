import validator from './validator.js';

const popUpWindow = document.getElementById("pop_up_window");
const message=document.getElementById("message");
const close = document.getElementById("close");
const send = document.getElementById("send");
const check = document.getElementById("check");
const name = document.getElementById("name");
const cvc=document.getElementById("cvc");
const numberCard = document.getElementById("number");
const aboutPage=document.getElementById("aboutPage");
const buyProduct1=document.getElementById("buy1");
const buyProduct2=document.getElementById("buy2");
const buyDetails=document.getElementById("buydetails");
const wrapper=document.getElementById("wrapper");
const cancel=document.getElementById("cancel");
let shelf;
let state = "";
let cont = 0;


wrapper.style.display="none";
aboutPage.style.display="block";
buyDetails.style.display="none";

buyProduct1.addEventListener("click",buy);
buyProduct2.addEventListener("click",detailsBuy);
cancel.addEventListener("click",cancelled);

function buy(){
	wrapper.style.display="block";
	aboutPage.style.display="none";
}

function detailsBuy(){
  aboutPage.style.display="none";
  buyDetails.style.display="block";
}

function cancelled(){
	wrapper.style.display="none";
	aboutPage.style.display="block";
}

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
		popUpWindow.style.display = "block";
		numberCard.value ="";
		state = "";	
	}else{
    message.innerHTML="Su tarjeta es válida"
    popUpWindow.style.display= "block";
	numberCard.value = "";
	state = "";
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

close.addEventListener("click", closeWindow);

function closeWindow() {
	popUpWindow.style.display = "none";
	cvc.value = "";
	state = "";
	

}

