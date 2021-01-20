import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
	apiKey            : 'AIzaSyD_gR_Gj2KlBs4PfTBe5rBCdiTZ75KOkag',
	authDomain        : 'amalitech-26258.firebaseapp.com',
	projectId         : 'amalitech-26258',
	storageBucket     : 'amalitech-26258.appspot.com',
	messagingSenderId : '877882519598',
	appId             : '1:877882519598:web:d7987fe13a8d5805be6fbf',
	measurementId     : 'G-KMLP9E8199'
});

export const auth = app.auth();
export default app;
