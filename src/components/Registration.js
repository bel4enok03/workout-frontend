import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Отправляем данные регистрации на сервер
			const response = await axios.post('http://localhost:8000/auth/register', {
				username,
				password,
			});

			console.log(response.data); // Распечатываем ответ от сервера

			// Регистрация успешна, перенаправляем на страницу входа
			navigate('/login');
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};

	return (
		<div>
			<h1>Registration</h1>
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
				<button type="submit">Register</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
}

export default Registration;
