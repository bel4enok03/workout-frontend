import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Отправляем данные аутентификации на сервер
			const response = await axios.post('http://localhost:8000/auth/login', {
				username,
				password,
			});

			console.log(response.data); // Распечатываем ответ от сервера

			// Сохраняем токен аутентификации в localStorage
			localStorage.setItem('token', response.data.token);

			// Аутентификация успешна, перенаправляем на страницу тренировок
			navigate('/workouts');
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}

export default Login;
