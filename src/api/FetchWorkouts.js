import axios from 'axios';

const getAllWorkouts = (setWorkout) => {
	const token = localStorage.getItem('token');
	axios.get('http://localhost:8000/workouts', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
		console.log(data);
		setWorkout(data);
	});
};

const addWorkout = (type, date, duration, setType, setDate, setDuration, setWorkout) => {
	const token = localStorage.getItem('token');
	axios
		.post(
			'http://localhost:8000/workouts/saveWorkout',
			{ type, date, duration },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		.then((data) => {
			console.log(data);
			setType('');
			setDate('');
			setDuration('');
			getAllWorkouts(setWorkout);
		});
};

const editWorkout = (workoutId, type, date, duration, setWorkout, setType, setDate, setDuration, setEditing) => {
	const token = localStorage.getItem('token');
	axios
		.post(
			'http://localhost:8000/workouts/editWorkout',
			{ type, date, duration, _id: workoutId },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		.then((data) => {
			console.log(data);
			setType('');
			setDate('');
			setDuration('');
			setEditing(false);
			getAllWorkouts(setWorkout);
		});
};

const deleteWorkout = (_id, setWorkout) => {
	const token = localStorage.getItem('token');
	axios
		.delete('http://localhost:8000/workouts/deleteWorkout', {
			headers: { Authorization: `Bearer ${token}` },
			data: { _id },
		})
		.then((data) => {
			console.log(data);
			getAllWorkouts(setWorkout);
		})
		.catch((error) => {
			console.error('Error deleting workout:', error);
		});
};

export { getAllWorkouts, addWorkout, editWorkout, deleteWorkout };
