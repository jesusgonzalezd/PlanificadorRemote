var firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyCf6czF2GO0tlml2fIWHaLfJiuJ1VD1PW4",
    authDomain: "planificadordatabase.firebaseapp.com",
    databaseURL: "https://planificadordatabase-default-rtdb.firebaseio.com",
    projectId: "planificadordatabase",
    storageBucket: "planificadordatabase.appspot.com",
    messagingSenderId: "480217596214",
    appId: "1:480217596214:web:9196170f9b12953736b397"
});

const db = firebase.database();

module.exports = db;