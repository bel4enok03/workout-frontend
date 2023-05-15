import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export const MyWorkouts = ({ type, date, duration, updatingInInput, deleteWorkout }) => {
	return (
		<div>
			<p>Type: {type}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Duration: {duration} minutes</p>
			<AiFillEdit onClick={updatingInInput}></AiFillEdit>
			<AiFillDelete onClick={deleteWorkout}></AiFillDelete>
		</div>
	);
};
