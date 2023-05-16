import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { getAllWorkouts, addWorkout, editWorkout, deleteWorkout } from '../api/FetchWorkouts';
import { MyWorkouts } from './MyWorkouts';
import image from '../gifCat.gif';

function Workouts() {
	const [myWorkout, setMyWorkout] = useState([]);
	const [type, setType] = useState('');
	const [date, setDate] = useState('');
	const [duration, setDuration] = useState('');
	const [editing, setEditing] = useState(false);
	const [workoutId, setWorkoutId] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetchWorkouts();
	}, []);

	const fetchWorkouts = async () => {
		try {
			const workouts = await getAllWorkouts();
			setMyWorkout(workouts);
		} catch (error) {
			console.error('Error fetching workouts:', error);
		}
	};

	const updatingInInput = (id, type, date, duration) => {
		setEditing(true);
		setType(type);
		setDate(date);
		setDuration(duration);
		setWorkoutId(id);
	};

	const handleAddWorkout = async () => {
		try {
			await addWorkout(type, date, duration);
			setType('');
			setDate('');
			setDuration('');
			fetchWorkouts();
		} catch (error) {
			console.error('Error adding workout:', error);
		}
	};

	const handleEditWorkout = async () => {
		try {
			await editWorkout(workoutId, type, date, duration);
			setType('');
			setDate('');
			setDuration('');
			setEditing(false);
			fetchWorkouts();
		} catch (error) {
			console.error('Error editing workout:', error);
		}
	};

	const handleDeleteWorkout = async (id) => {
		try {
			await deleteWorkout(id);
			fetchWorkouts();
		} catch (error) {
			console.error('Error deleting workout:', error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div>
			<Typography variant="h2" sx={{ textAlign: 'center' }}>
				Workout plan
			</Typography>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
				<img src={image} alt="Workout" style={{ maxWidth: '100px', height: 'auto' }} />
			</div>
			<Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: '16px' }}>
				<Grid item xs={12} sm={4}>
					<TextField
						type="text"
						label="Add a workout type"
						value={type || ''}
						onChange={(e) => setType(e.target.value)}
						variant="outlined"
						fullWidth
						sx={{ height: '100%' }}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						type="date"
						value={date || ''}
						onChange={(e) => setDate(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						type="number"
						label="Duration in minutes"
						value={duration || ''}
						onChange={(e) => setDuration(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} justifyContent="center" sx={{ marginTop: '16px' }}>
				<Grid item>
					<Button
						onClick={editing ? handleEditWorkout : handleAddWorkout}
						variant="contained"
						color="primary"
					>
						{editing ? 'Edit' : 'Add'}
					</Button>
				</Grid>
			</Grid>
			<div>
				{myWorkout.map((workout) => (
					<MyWorkouts
						type={workout.type}
						date={workout.date}
						duration={workout.duration}
						key={workout._id}
						updatingInInput={() =>
							updatingInInput(workout._id, workout.type, workout.date, workout.duration)
						}
						deleteWorkout={() => handleDeleteWorkout(workout._id)}
					/>
				))}
			</div>

			<Grid container spacing={2} justifyContent="center" sx={{ marginTop: '16px' }}>
				<Grid item>
					<Button onClick={handleLogout} variant="contained" color="primary">
					Log out
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default Workouts;
