import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8000/auth/register', {
				email,
				password,
			});

			console.log(response.data);

			setIsRegistrationSuccessful(true);

			navigate('/login');
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};

	return (
		<div>
			<h1>Registration</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
			{isRegistrationSuccessful && <p>Registration successful!</p>}
		</div>
	);
}

export default Registration;
