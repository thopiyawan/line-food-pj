var urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const date = urlParams.get('date');
console.log(date, userId)

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
const table = document.getElementById('tb-date')


//Get data from userId

db.collection("users").doc(userId).collection("diary").orderBy("date", "asc").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());



        var row = table.insertRow(-1);
        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        var col3 = row.insertCell(2);
        var col4 = row.insertCell(3);
        var col5 = row.insertCell(4);
        var col6 = row.insertCell(5);
        var col7 = row.insertCell(6);
        var col8 = row.insertCell(7);
        var col9 = row.insertCell(8);
        var col10 = row.insertCell(9);

        col1.innerHTML = doc.id;

        // ratio button
        let btn = document.createElement('button');
        btn.textContent = 'ดูรายละเอียด'
        col10.appendChild(btn);
        btn.setAttribute('class', 'btn btn-secondary btn-sm');
        // keep id
        btn.setAttribute('data-id', doc.id);
        col10.appendChild(btn);

        // ratio btn
        btn.addEventListener("click", (e) => {
            let id = e.target.getAttribute('data-id');
            db.collection("users").doc(id).get();

            window.open(`./record.html?userId=${userId}&date=${id}`);

            console.log(e.target.getAttribute('data-id'));
        });
        //======================================================//

    });


});


