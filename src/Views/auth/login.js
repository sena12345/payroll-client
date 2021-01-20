import React from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import background from '../../assets/images/body-bg.jpg';
import google_image from '../../assets/google_logo.svg';
import { useAuth } from '../../_services/auth-context';

export function Login() {
	const { signupWithPop } = useAuth();
	const history = useHistory();
	async function handleLogin(e) {
		e.preventDefault();
		try {
			await signupWithPop();
			history.push('/');
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<div className="main" style={{ backgroundImage: `url(${background})` }}>
			<div className="container">
				<div className="signin-content">
					<form className="signin-form">
						<h2>Sign In </h2>
						<p className="desc" />
						<div className="form-group">
							<input type="email" className="form-input" name="email" id="email" placeholder="Email" />
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-input"
								name="password"
								id="password"
								placeholder="Password"
							/>
						</div>

						<div className="form-group">
							<input type="submit" id="submit" className="submit-link submit" value="Sign In" />
						</div>
						<h2>OR</h2>
						<br />
						<div className="google-div">
							<a onClick={handleLogin} className=" google-btn btn btn-block btn-social btn-google">
								<img style={{ margin: `0.5rem` }} src={google_image} width="20rem" alt="" />
								<span className="btn-text">Sign in with Google</span>
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
