let socket = io();

const userName = localStorage.getItem('user');
const userImg = localStorage.getItem('image');

if (!userName) {
	window.location = '/login';
}

console.log('sasasa');

username.textContent = userName;
userImage.src = userImg;

sendBtn.onclick = () => {
	socket.emit('new-mesage', {
		message: textInput.value,
		from: { username: userName, image: userImg },
	});

	textInput.value = '';
};

socket.on('message-saved', data => {
	const div = document.createElement('div');
	div.className = 'msg-wrapper msg-from';
	div.innerHTML = `
											<img src="${data.image}" alt="profile-picture">
											<div class="msg-text">
													<p class="msg-author">${data.username}</p>
													<p class="msg">${data.message}</p>
													<p class="time">${data.writed_At.slice(0, 7)} PM</p>
											</div>
	
	`;

	chat.appendChild(div);
});

Logout.onclick = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('image');

	window.location = '/login';
};
