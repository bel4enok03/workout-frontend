import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Workouts from './components/Workouts';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Registration />} />
			<Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} /> {/* Добавленный маршрут */}
			<Route path="/workouts" element={<Workouts />} />
		</Routes>
	);
}

export default App;


