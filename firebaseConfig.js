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

var db = firebase.database().ref("/user_data");

db.push({
    id:29,
    name:"Jane Doe",
    email:"jane@doe.com",
    website:"https://jane.foo.bar"
});