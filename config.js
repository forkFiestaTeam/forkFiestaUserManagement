const firebase = require("firebase");
// const admin = require("firebase-admin");

const firebaseConfig = {
    apiKey: "AIzaSyDEEUcWnyqGWmQEdoDbRRs9vK2eqzU-px8",
    authDomain: "forkfiesta-66bc3.firebaseapp.com",
    projectId: "forkfiesta-66bc3",
    storageBucket: "forkfiesta-66bc3.appspot.com",
    messagingSenderId: "972608960059",
    appId: "1:972608960059:web:a221a487e8392dbec7ce1e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const User = db.collection("user");
const Address = db.collection("address");

module.exports = { User, Address };