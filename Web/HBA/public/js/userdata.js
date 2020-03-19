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
const date = moment().format('Do-MMMM-YYYY');


//----- table -----//
const table = document.getElementById('tb-userdata')

db.collection("users").orderBy("submit", "desc").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id);
        var row = table.insertRow(-1);
        var col1 = row.insertCell(0);
        var col2 = row.insertCell(1);
        var col3 = row.insertCell(2);
        var col4 = row.insertCell(3);
        var col5 = row.insertCell(4);
        var col6 = row.insertCell(5);
        var col7 = row.insertCell(6);
        var col8 = row.insertCell(7);
        // var col9 = row.insertCell(8);

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


        // ratio button1
        let btn = document.createElement('button');
        btn.textContent = 'สัดส่วนอาหารล่าสุด';
        col8.appendChild(btn);
        btn.setAttribute('class', 'btn btn-secondary btn-sm');
        btn.setAttribute('style', 'margin:15px');

        // keep id
        btn.setAttribute('data-id', doc.id);
        col8.appendChild(btn);

        // ratio btn
        btn.addEventListener("click", (e) => {
            let id = e.target.getAttribute('data-id');
            db.collection("users").doc(id).get();

            window.open(`./ratio.html?userId=${id}&date=${date}`);

            console.log(e.target.getAttribute('data-id'));
        });
        //======================================================//



        // ratio button2
        let btn2 = document.createElement('button');
        btn2.textContent = '   โปรไฟล์';
        col8.appendChild(btn2);
        btn2.setAttribute('class', 'btn btn-primary btn-sm');
       
        // keep id
        btn2.setAttribute('data-id', doc.id);
        col8.appendChild(btn2);
        btn2.setAttribute('style', 'margin:15px');

        // ratio btn
        btn2.addEventListener("click", (e) => {
            let id = e.target.getAttribute('data-id');
            db.collection("users").doc(id).get();

            window.open(`./date.html?userId=${id}`);

            console.log(e.target.getAttribute('data-id'));
        });
        //======================================================//




    });
});






