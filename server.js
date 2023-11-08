import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { writeFileSync } from 'fs';
import http from 'http';
import moment from 'moment';
import { resolve } from 'path';
import { Server } from 'socket.io';
import { read, write } from './utils/model.js';
import UserModel from './database/model.js';



const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(fileUpload());
app.use(express.static(resolve('public')));

app.get('/register', (req, res, next) => {
	res.render('register', { title: 'Register-page' });
});
app.get('/', (req, res, next) => {
	const users = read('users');

	const messages = read('messages');

	messages.map(message => {
		message.writed_At = moment(message.writed_At).format('LT');
		return message;
	});

	res.render('index', { title: 'Index-page', users, messages });
});

app.get('/login', (req, res, next) => {
	res.render('login', { title: 'Login-page' });
});

io.on('connection', client => {
	client.on('new-user', ({ username, email, password, avatar }) => {
		const users = read('users');

		const fileName = Date.now();
		const existUser = users.find(user => user.username == username);
		if (existUser) {
			return io.emit('exist-user', { message: 'user already exist' });
		}

		const newUSer = {
			userId: (users.at(-1)?.userId + 1) | 1,
			username,
			email,
			password,
			image: '/uploads/' + `${fileName}.png`,
		};

		users.push(newUSer);

		write('users', users);
		writeFileSync(resolve('public', 'uploads', `${fileName}.png`), avatar);

		io.emit('added-user', newUSer);
	});

	client.on('new-mesage', ({ message, from }) => {
		const messagess = read('messages');

		const newMessage = {
			messageId: (messagess?.at(-1)?.messageId + 1) | 1,
			username: from.username,
			image: from.image,
			message: message,
			writed_At: new Date(),
		};

		messagess.push(newMessage);

		write('messages', messagess);

		io.emit('message-saved', newMessage);
	});

	client.on('login-user', ({ username, password }) => {
		const users = read('users');

		const user = users.find(user => user.username == username && user.password == password);

		if (user) {
			return io.emit('logged-user', user);
		} else {
			return io.emit('fail-user', { message: 'username or password wrong' });
		}
	});

	client.on('disconnect', () => {
		/* … */
	});
});

// app.post('/register', (req, res, next) => {
// 	console.log(req.body, req.files);
// });

server.listen(4000, () => console.log('run..'));
