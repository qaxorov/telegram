let socket = io();

const userName = localStorage.getItem('user');

if (userName) {
	window.location = '/';
}

submitButton.onclick = () => {
	socket.emit('login-user', { username: usernameInput.value, password: passwordInput.value });
};

socket.on('logged-user', user => {
	localStorage.setItem('user', user.username);
	localStorage.setItem('image', user.image);

	window.location = '/';
});

socket.on('fail-user', message => {
	err.textContent = message.message
})
