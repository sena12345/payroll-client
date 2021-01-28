import '../src/assets/css/App.css';
import React from 'react';
import { Login } from './Views/auth/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './_services/private-route';
import { AuthProvider } from './_services/auth-context';
import Home from './Views/dashboard/Home';
import RegisterUser from './Views/dashboard/RegisterUser';
import ViewUsers from './Views/dashboard/ViewUsers';
import UserDetails from './Views/dashboard/UserDetails';
import EditUserDetails from './Views/dashboard/EditUserDetails';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Departments from './Views/dashboard/departments';
import Designations from './Views/dashboard/designations';
import Allowances from './Views/dashboard/allowances';
function App() {
	// optional configuration
	const options = {
		// you can also just use 'bottom center'
		position   : positions.BOTTOM_LEFT,
		timeout    : 5000,
		offset     : '30px',
		// you can also just use 'scale'
		transition : transitions.SCALE
	};
	return (
		<Router>
			<AuthProvider>
				<AlertProvider template={AlertTemplate} {...options}>
					<Switch>
						<PrivateRoute exact path="/" component={Home} />

						<Route path="/registeruser">
							<Home page={<RegisterUser />} />
						</Route>
						<Route path="/viewusers">
							<Home page={<ViewUsers />} />
						</Route>
						<Route path="/edituserdetails">
							<Home page={<EditUserDetails />} />
						</Route>
						<Route path="/userdetails">
							<Home page={<UserDetails />} />
						</Route>
						<Route path="/department">
							<Home page={<Departments />} />
						</Route>
						<Route path="/designation">
							<Home page={<Designations />} />
						</Route>
						<Route path="/allowance">
							<Home page={<Allowances />} />
						</Route>
						<Route path="/login" component={Login} />
					</Switch>
				</AlertProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
