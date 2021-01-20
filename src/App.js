import './App.css';
import React from 'react';
import { Login } from './Views/auth/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './_services/private-route';
import { AuthProvider } from './_services/auth-context';
import Home from './Views/dashboard/Home';
import RegisterUser from './Views/dashboard/RegisterUser';
import ViewUsers from './Views/dashboard/ViewUsers';
function App() {
	return (
		 <Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<Route path="/login" component={Login} />				
				</Switch>
			</AuthProvider>
		</Router> 

	/* 	<Router>
			<Home>
				<Switch>
					<Route exact path='/'>
						<Home/>
					</Route>
					<Route path='/registeruser'>
						<RegisterUser/>
					</Route>
					<Route path='/viewuser'>
						<ViewUsers/>
					</Route>
				</Switch>
			</Home>
		</Router>
 */

	);
}

export default App;
