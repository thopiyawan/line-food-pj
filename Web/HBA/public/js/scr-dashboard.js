// var urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get('userId');
// const date = urlParams.get('date')
const date = moment().format('Do-MMMM-YYYY');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBFdWUGFqrb_Z8HIMnDC1EcZMt5XgUrjDk",
    authDomain: "hba-project-db81d.firebaseapp.com",
    databaseURL: "https://hba-project-db81d.firebaseio.com",
    projectId: "hba-project-db81d",
    storageBucket: "hba-project-db81d.appspot.com",
    messagingSenderId: "73692768531",
    appId: "1:73692768531:web:85b4b08a4ac6f723a7d2e6",
    measurementId: "G-29K1KNBJHK"
});
const db = firebase.firestore();

//----- table -----//
const table = document.getElementById('tb-user')


db.collection("users").orderBy("submit", "desc").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        //console.log(doc.id);
        var row = table.insertRow(-1);
        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        var col3 = row.insertCell(2);
        var col4 = row.insertCell(3);
        var col5 = row.insertCell(4);
        var col6 = row.insertCell(5);
        var col7 = row.insertCell(6);

        //Get data from userId
        var docRef = db.collection("users").doc(doc.id).collection("information").doc("profile");
        docRef.get().then(function (doc) {
            //console.log("Document data:", doc.data());
            col1.innerHTML = doc.data().fullname;
            col2.innerHTML = doc.data().lastname;
            col3.innerHTML = doc.data().gender;
            col4.innerHTML = doc.data().age;
            col5.innerHTML = doc.data().height;
            col6.innerHTML = doc.data().weight;
            col7.innerHTML = doc.data().bmi;
        })
    });
});
//alluser
db.collection("users").get().then(function (querySnapshot) {
    //console.log(querySnapshot.size);
    document.getElementById("allUser").innerHTML = querySnapshot.size;
});

//newuser
db.collection("users").where("date", "==", date).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        document.getElementById("newUser").innerHTML = querySnapshot.size;
    });

})