import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistration, setIsRegistration] = useState(false);
	const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

    const appDescription = "Welcome to Your Fitness App! This app helps you track and manage your workouts. Login or register to get started.";

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const endpoint = isRegistration ? '/auth/register' : '/auth/login';
			const response = await axios.post(`https://workout-backend-xrs2.onrender.com${endpoint}`, {
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
			setError('Invalid email or password');
		}
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Grid container spacing={2} direction="column" alignItems="center">
				<Grid item>
					<Typography variant="h2">{isRegistration ? 'Registration' : 'Login'}</Typography>
				</Grid>
                <Grid item xs={12}>
					<Typography variant="body1">{appDescription}</Typography>
				</Grid>
				<Grid item xs={12}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2} direction="column" alignItems="center">
							<Grid item xs={12}>
								<TextField
									type="email"
									label="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									variant="outlined"
									fullWidth
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									type="password"
									label="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									variant="outlined"
									fullWidth
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button type="submit" variant="contained" color="primary" fullWidth>
									{isRegistration ? 'Register' : 'Login'}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{isRegistration ? (
							<>
								Already have an account? <Link onClick={() => setIsRegistration(false)}>Login</Link>
							</>
						) : (
							<>
								Don't have an account? <Link onClick={() => setIsRegistration(true)}>Register</Link>
							</>
						)}
					</Typography>
				</Grid>
				{error && (
					<Grid item xs={12}>
						<Typography variant="body1" color="error">
							{error}
						</Typography>
					</Grid>
				)}
				{isRegistrationSuccessful && (
					<Grid item xs={12}>
						<Typography variant="body1">Registration successful!</Typography>
					</Grid>
				)}
			</Grid>
		</div>
	);
}

export default Auth;
