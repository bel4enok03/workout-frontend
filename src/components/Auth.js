import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistration, setIsRegistration] = useState(false);
	const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const endpoint = isRegistration ? '/auth/register' : '/auth/login';
			const response = await axios.post(`http://localhost:8000${endpoint}`, {
				email,
				password,
			});

			console.log(response.data);

			if (!isRegistration) {
				localStorage.setItem('token', response.data.token);
				navigate('/workouts');
			} else {
				setIsRegistrationSuccessful(true);
				setIsRegistration(false);
			}
		} catch (error) {
			console.error('Error during authentication:', error);
		}
	};

	return (
		<div>
			<h1>{isRegistration ? 'Registration' : 'Login'}</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">{isRegistration ? 'Register' : 'Login'}</button>
			</form>
			<p>
				{isRegistration ? (
					<>
						Already have an account? <Link onClick={() => setIsRegistration(false)}>Login</Link>
					</>
				) : (
					<>
						Don't have an account? <Link onClick={() => setIsRegistration(true)}>Register</Link>
					</>
				)}
			</p>
			{isRegistrationSuccessful && <p>Registration successful!</p>}
		</div>
	);
}

export default Auth;
