import * as firebase from 'firebase'


const firebaseConfig = {
	apiKey: "AIzaSyBZQL3Uihec7F-2ajy0y68jHsn6nMetUeQ",
    authDomain: "rolls-980d0.firebaseapp.com",
    databaseURL: "https://rolls-980d0.firebaseio.com",
    
    projectId: "rolls-980d0",
    storageBucket: "rolls-980d0.appspot.com",
    messagingSenderId: "529668499684",
    appId: "1:529668499684:web:7c9cc871fc2035b4f9a4f1",
    measurementId: "G-HR09M8RQ5E"
}

firebase.initializeApp(firebaseConfig)

export default firebase