import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Workouts from './components/Workouts';



function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/workouts" element={<Workouts />} />
		</Routes>
	);
}

export default App;
