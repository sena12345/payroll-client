import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../assets/css/Home.css';
import '../../assets/js/Home.js';
import { SidebarData } from './SideBarData';
import { useAuth } from '../../_services/auth-context';
import { useAlert } from 'react-alert';
import { showConfirmAlert } from '../my-alerts';

function Home({ page }) {
	const { logout, resetPassword, currentUser } = useAuth();
	const [ sidebar, setSidebar ] = useState(false);
	const alert = useAlert();
	const history = useHistory();
	const showSidebar = () => setSidebar(!sidebar);

	const handleConfirm = (title, message, action) => {
		showConfirmAlert({
			title   : title,
			message : message,
			buttons : [
				{
					label   : 'No',
					onClick : () => {
						console.log('cancel');
					}
				},
				{
					label   : 'Yes',
					onClick : () => action()
				}
			]
		});
	};

	const handleSignOut = async () => {
		try {
			await logout();
		} catch (error) {
			console.log(error.message);
		}
	};

	const handlePasswordReset = async () => {
		try {
			await resetPassword(currentUser.email);
			alert.success(`Reset link sent to your ${currentUser.email}`);
		} catch (error) {
			alert.error(error.message);
		}
	};

	return (
		<div className="container-fluid">
			<div className="overlay-scrollbar">
				<div className="navbar">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="#" className="nav-link" onClick={showSidebar}>
								<div className="orange">
									<i className="fas fa-bars" />
								</div>
							</Link>
						</li>
					</ul>

					<form className="navbar-search">
						<input type="search" className="navbar-search-input" placeholder="Search..." />
						<i className="fas fa-search" />
					</form>
					<div className="nav-link">
						<span>
							<b>xxxxxx</b>
						</span>
					</div>

					<ul className="navbar-nav nav-right">
						<li className="nav-item mode">
							<Link className="nav-link" to="#">
								ss
							</Link>
						</li>

						<li className="nav-item avt-wrapper">
							<div className="avt dropdown">
								<img src="img/usr.png" className="dropdown-toggle" data-toggle="user-menu" alt="" />
								<ul id="user-menu" className="dropdown-menu">
									<li className="dropdown-menu-item">
										<Link to="#" className="dropdown-menu-link">
											<div>
												<i className="fas fa-user-tie" />
											</div>
											<span>Profile</span>
										</Link>
									</li>
									<li className="dropdown-menu-item">
										<a
											className="dropdown-menu-link"
											onClick={() =>
												handleConfirm(
													'Confirm',
													'continue to reset password?',
													handlePasswordReset
												)}
										>
											<div>
												<i className="far fa-check-circle" />
											</div>
											<span>Change Password</span>
										</a>
									</li>

									<li className="dropdown-menu-item">
										<a
											onClick={() =>
												handleConfirm('Confirm', 'Continue to signout?', handleSignOut)}
											className="dropdown-menu-link"
										>
											<div>
												<i className="fas fa-sign-out-alt" />
											</div>
											<span>Logout</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>

				<div className="sidebar">
					<ul className="sidebar-nav">
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path} className="sidebar-nav-link">
										<div>
											<i className={item.icon} />
										</div>
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="wrapper">{page ? page : history.push('/viewusers')}</div>
		</div>
	);
}

export default Home;
