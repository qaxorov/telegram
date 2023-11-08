let socket = io();

const userName = localStorage.getItem('user');

if (userName) {
	window.location = '/';
}

submitButton.onclick = async () => {
	socket.emit('new-user', {
		username: usernameInput.value,
		email: emailInput.value,
		password: passwordInput.value,
		avatar: uploadInput.files[0],
	});

	socket.on('exist-user', data => {
		eror.textContent = data.message;
	});

	socket.on('added-user', user => {
		localStorage.setItem('user', user.username);
		localStorage.setItem('image', user.image);

		window.location = '/';
	});
};
