let attempt = 3; // Broj pokusaja
function validate() {
	let username = document.getElementById('email').value;
	let password = document.getElementById('password1').value;
	if (username == 'user' && password == 'user') {
		alert('Login successfully');
		window.location = 'home.html';
		return false;
	} else {
		attempt--;
		alert('You have left ' + attempt + ' attempt;');
		//Zatamni polja i submit ako promasimo user i pass 3 puta
		if (attempt == 0) {
			document.getElementById('email').disabled = true;
			document.getElementById('password1').disabled = true;
			document.getElementById('submit').disabled = true;
			return false;
		}
	}
}
