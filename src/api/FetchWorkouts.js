import axios from 'axios';

const getAllWorkouts = async () => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.get('https://workout.tatyana-chuvakova.ru/workouts', {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		throw new Error('Error fetching workouts');
	}
};

const addWorkout = async (type, date, duration) => {
	try {
		const token = localStorage.getItem('token');
		await axios.post(
			'https://workout.tatyana-chuvakova.ru/workouts/saveWorkout',
			{ type, date, duration },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
	} catch (error) {
		throw new Error('Error adding workout');
	}
};

const editWorkout = async (workoutId, type, date, duration, setWorkout) => {
	try {
		const token = localStorage.getItem('token');
		await axios.post(
			'https://workout.tatyana-chuvakova.ru/workouts/editWorkout',
			{ type, date, duration, _id: workoutId },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		getAllWorkouts(setWorkout);
	} catch (error) {
		throw new Error('Error editing workout');
	}
};

const deleteWorkout = async (workoutId) => {
	try {
		const token = localStorage.getItem('token');
		await axios.delete('https://workout.tatyana-chuvakova.ru/workouts/deleteWorkout', {
			headers: { Authorization: `Bearer ${token}` },
			data: { _id: workoutId },
		});
	} catch (error) {
		throw new Error('Error deleting workout');
	}
};

export { getAllWorkouts, addWorkout, editWorkout, deleteWorkout };
