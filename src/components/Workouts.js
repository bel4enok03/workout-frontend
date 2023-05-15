import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllWorkouts, addWorkout, editWorkout, deleteWorkout } from '../api/FetchWorkouts';
import { MyWorkouts } from './MyWorkouts';

function Workouts() {
	const [myWorkout, setWorkout] = useState([]);
	const [type, setType] = useState('');
	const [date, setDate] = useState('');
	const [duration, setDuration] = useState('');
	const [editing, setEditing] = useState(false);
	const [workoutId, setWorkoutId] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getAllWorkouts(setWorkout);
	}, []);

	const updatingInInput = (_id, type, date, duration) => {
		setEditing(true);
		setType(type);
		setDate(date);
		setDuration(duration);
		setWorkoutId(_id);
	};

	const handleAddWorkout = () => {
		addWorkout(type, date, duration, setType, setDate, setDuration, setWorkout);
	};

	const handleEditWorkout = () => {
		editWorkout(workoutId, type, date, duration, setWorkout, setType, setDate, setDuration, setEditing);
	};

	const handleDeleteWorkout = (_id) => {
		deleteWorkout(_id, setWorkout);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div>
			<h1>Workout plan</h1>
			<input
				type="text"
				placeholder="Add a workout type"
				value={type}
				onChange={(e) => setType(e.target.value)}
			></input>
			<input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
			<input
				type="number"
				placeholder="Duration in minutes"
				value={duration}
				onChange={(e) => setDuration(e.target.value)}
			></input>
			<button onClick={editing ? handleEditWorkout : handleAddWorkout}>{editing ? 'Edit' : 'Add'}</button>
			{myWorkout.map((workout) => (
				<MyWorkouts
					type={workout.type}
					date={workout.date}
					duration={workout.duration}
					key={workout._id}
					updatingInInput={() => updatingInInput(workout._id, workout.type, workout.date, workout.duration)}
					deleteWorkout={() => handleDeleteWorkout(workout._id)}
				/>
			))}
			<button onClick={handleLogout}>Выйти</button>
		</div>
	);
}

export default Workouts;
