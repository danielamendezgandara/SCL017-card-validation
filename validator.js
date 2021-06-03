const validator = {
	isValid: function (creditCardNumber) {
		// La función isValid recibe el parámetro creditCardNumber y se almacena en la variable creditNumber
		let creditNumber = creditCardNumber;
		// Se crea una variable de tipo array llamada box en donde se traspasará la cadena de caracteres
		// contenida en creditNumber
		let box = Array.from(creditNumber);
		// Luego se almacenará el arreglo de de forma invertida mediante el método reverse()
		let reversed = box.reverse();
		// La variable score se inicia en cero y almacenará la suma de los dígitos 
		let score = 0;
		// Con un ciclo for se convertirá cada elemento en un número entero mediante parseInt
		for (let i = 0; i < reversed.length; i++) {
			reversed[i] = parseInt(reversed[i]);
		}
		// Algoritmo de Luhn: Se recorre el array reversed ( que es el array box creado inicialmente pero con el orden) 
		// de atrás hacia adelante
		for (let i = 0; i < reversed.length; i++) {
			// Si la posición no es divisible por 2 (no da resto 0) el valor contenido en la posición indicada
			// se multiplicará por 2 y se almacenará en la posición actual
			if ((i + 1) % 2 === 0) {
				reversed[i]*= 2;
				// En el caso que el valor de mayor a nueve,al resultado se le resta 9,lo que da la suma de los dos
				//dígitos
				if (reversed[i] > 9) {
					reversed[i] -=9;
				}
			}
			// Cada vez que se hace una iteración se va sumando los valores contenidos en cada posición
			// del arreglo esto se almacena en score 
			score = score + reversed[i];
		}
		// Se comprueba con if si score (que tiene la suma de los dígitos de la tarjeta) es 
		// divisible por 10(queda resto cero), si es así,la tarjeta es válida
		// por lo que retorna true , sino retorna false
		if (score % 10 == 0) {
			return true;
		} else {
			return false;
		}
	},
	maskify: function (creditCardNumber) {
		// Se almacena la cadena de texto en la variable creditNumber
		let creditNumber = creditCardNumber;
		//La variable cardNumber transforma la cadena de texto en un array 
		let cardNumber = Array.from(creditNumber);
		//Se crea una variable hideNum de tipo array para almacenar los caracteres,inicialmente vacía
		let hideNum = [];
        //Con el ciclo for se almacenerá el caracter  en hideNum en la posición correspondiente
		for (let i = 0; i < cardNumber.length; i++) {
			// En el caso de que i sea menor a la longitud menos 4 de la cadena de texto almacenada en creditNumber
			if (i < cardNumber.length - 4) {
			// Se le añadirá a hideNum un símbolo para enmascarar el dígito de la tarjeta
				hideNum.push("#");
			// De lo contrario se almacenará en hideNum el dígito de la tarjeta en la posición actual
			} else {
				hideNum.push(cardNumber[i]);
			}
		}
		//Una vez que ha culminado el ciclo se devuelve todos los caracteres del array hideNum como cadena de texto
		//mediante join
		return hideNum.join("");
	}
};

export default validator;