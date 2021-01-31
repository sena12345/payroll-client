import React, { useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const history = useHistory();
	const [ currentUser, setCurrentUser ] = useState();
	const [ loading, setLoading ] = useState(true);

	function signupWithPop() {
		const provider = new firebase.auth.GoogleAuthProvider();
		return auth.signInWithPopup(provider);
	}

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email, { url: 'https://amalitech-payroll.web.app/' });
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
			if (!user) history.push('/');
		});

		return unsubscribe;
	});

	const value = {
		currentUser,
		loading,
		login,
		signup,
		signupWithPop,
		logout,
		resetPassword,
		updateEmail,
		updatePassword
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
