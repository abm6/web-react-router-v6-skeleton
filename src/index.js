import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Link,
	Outlet,
	useParams,
	NavLink,
	useNavigate,
	useLocation,
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/myapps" element={<Navigate replace to="/learn" />} />
			<Route path="/learn" element={<Learn />}>
				<Route path="courses" element={<Courses />}>
					<Route path=":courseid" element={<CourseId />} />
				</Route>
				<Route path="bundle" element={<Bundles />}></Route>
			</Route>

			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	</Router>
);

function Home() {
	return (
		<div>
			<h1>Home Route</h1>
		</div>
	);
}

function Learn() {
	return (
		<div>
			<h1>Learn</h1>
			<h4>All Courses are listed here</h4>
			<Link className="btn btn-success mx-1" to="/learn/courses">
				Courses
			</Link>
			<Link className="btn btn-primary mx-1" to="/learn/bundle">
				Bundles
			</Link>

			<Outlet />
		</div>
	);
}

function Courses() {
	const courseList = ['React', 'Angular', 'Vue', 'NodeJs'];
	const randomCourseName =
		courseList[Math.floor(Math.random() * courseList.length)];

	return (
		<div>
			<h1>Courses List</h1>
			<h4>Courses Card</h4>

			<p>More Test </p>

			<NavLink
				style={({ isActive }) => {
					return {
						backgroundColor: isActive ? 'pink' : 'white',
					};
				}}
				to={`/learn/courses/${randomCourseName}`}>
				{randomCourseName}
			</NavLink>

			<NavLink className="btn btn-light" to={`/learn/courses/tests`}>
				Tests
			</NavLink>

			<Outlet />
		</div>
	);
}

function Bundles() {
	return (
		<div>
			<h1>Bundle List</h1>
			<h4>Bundle Card</h4>
		</div>
	);
}

function CourseId() {
	const navigate = useNavigate();
	const { courseid } = useParams();

	return (
		<div>
			<h1>URL Params is : {courseid}</h1>
			<button
				onClick={() => {
					navigate('/dashboard', {state: "400"});
				}}
				className="btn btn-warning">
				Modern Price
			</button>

      <Link to="/dashboard" state={"555"}> Legacy Price</Link>
		</div>
	);
}

function Dashboard() {
  const location = useLocation();
	return (
		<div>
			<h1>Info that I got here is {location.state}</h1>
		</div>
	);
}
