import React from 'react';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const MyWorkouts = ({ type, date, duration, updatingInInput, deleteWorkout }) => {
	return (
		<div style={{ textAlign: 'center', marginTop: '16px' }}>
			<Typography variant="body1">Type: {type}</Typography>
			<Typography variant="body1">Date: {new Date(date).toLocaleDateString()}</Typography>
			<Typography variant="body1">Duration: {duration} minutes</Typography>
			<IconButton onClick={updatingInInput}>
				<EditIcon />
			</IconButton>
			<IconButton onClick={deleteWorkout}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
};
