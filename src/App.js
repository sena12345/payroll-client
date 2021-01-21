import '../src/assets/css/App.css';
import React from 'react';
import { Login } from './Views/auth/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './_services/private-route';
import { AuthProvider } from './_services/auth-context';
import Home from './Views/dashboard/Home';
import RegisterUser from './Views/dashboard/RegisterUser';
import ViewUsers from './Views/dashboard/ViewUsers';
import FieldsConfiguration from './Views/dashboard/FieldsConfiguration';
function App() {
	return (
	 	
		<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path="/" component={Home} />

					<Route path='/registeruser'>						
						<Home page={<RegisterUser/> }></Home>
					</Route>

					<Route path='/viewusers'>
						<Home page={<ViewUsers/> }></Home>
					</Route>\

					<Route path='/configuration'>
						<Home page={<FieldsConfiguration/> }></Home>
					</Route>

					<Route path="/login" component={Login} />				
				</Switch>
			</AuthProvider>
		</Router>

	);
}

export default App;
