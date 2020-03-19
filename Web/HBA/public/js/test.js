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
var db = firebase.firestore();


window.onload = function () {
    const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed'];
    callDataMeal(meal[0])
    callDataMeal(meal[1])
    callDataMeal(meal[2])
    callDataMeal(meal[3])
    callDataMeal(meal[4])
    callDataMeal(meal[5])
}

function callDataMeal(mealName) {
    if (mealName == 'breakfast') { var meal = 'เช้า' }
    if (mealName == 'morningsnack') { var meal = 'ว่างเช้า' }
    if (mealName == 'lunch') { var meal = 'กลางวัน' }
    if (mealName == 'afternoonsnack') { var meal = 'ว่างบ่าย' }
    if (mealName == 'dinner') { var meal = 'เย็น' }
    if (mealName == 'beforebed') { var meal = 'ก่อนนอน' }

    db.collection("users").doc(userId).collection("diary").doc(date).collection(mealName).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            console.log(doc.id, " => ", doc.data());
            var table = document.getElementById("tbresult");
            var rowIndex = document.getElementById("row").rowIndex;

            var row = table.insertRow(rowIndex);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            var cell9 = row.insertCell(8);
            var cell10 = row.insertCell(9);
            var cell11 = row.insertCell(10);

            //showdata
            cell1.innerHTML = `${meal} <br> ${doc.data().time} น.`;  //day
            cell2.innerHTML = `${doc.data().foodname} <br> 
                <button type="button" class="btn btn-light " data-toggle="modal" data-target="#imgModal"><i class="fas fa-images"></i> </button>`;
            cell3.innerHTML = `${doc.data().rice} <br> (${CalStarch(doc.data().rice)} กิโลแคลอรี)`;
            cell4.innerHTML = `${doc.data().fruits} <br> (${CalFruits(doc.data().fruits)} กิโลแคลอรี)`;
            cell5.innerHTML = `${doc.data().vegetable} <br> (${CalVetgetable(doc.data().vegetable)} กิโลแคลอรี)`;
            cell6.innerHTML = `${doc.data().milk} <br> (${CalMilk(doc.data().milk)} กิโลแคลอรี)`;
            cell7.innerHTML = `${doc.data().meat} <br> (${CalMeat(doc.data().meat)} กิโลแคลอรี)`;
            cell8.innerHTML = `${doc.data().fat} <br> (${CalFat(doc.data().fat)} กิโลแคลอรี)`;
            cell9.innerHTML = doc.data().sugar;
            cell10.innerHTML = doc.data().sodium

            const MY_EVENT_TEMPLATE =
                '<div class="media mb-3">' +
                '<img src="/images/temp.png" class="image mr-3" style="width: 180px">' +
                '<div class="media-body">' +
                '<h5 class="card-title"><a href="#" class="name" data-toggle="modal" data-target="#eventDetailModal"></a></h5>' +
                '<h6 class="date mb-2 text-muted"></h6>' +
                '<p class="description"></p>' +
                '</div>' +
                '</div>'
            const div = $(MY_EVENT_TEMPLATE)

            cell11.append(MY_EVENT_TEMPLATE);


            //cell11.innerHTML = obj;





        });


    });




    function CalStarch(Cal) {
        var result = Cal;
        var CalStarch = Cal * 80 //ข้าว-แป้ง
        return CalStarch;
    }
    function CalFruits(Cal) {
        var result = Cal;
        var CalFruits = Cal * 60; //ผลไม้
        return CalFruits;
    }
    function CalVetgetable(Cal) {
        var result = Cal;
        var CalVetgetable = Cal * 25; //ผัก ก.
        return CalVetgetable;
    }
    function CalMilk(Cal) {
        var result = Cal;
        var CalMilkNonfat = Cal * 90; //นมจืดไม่มีไขมัน
        // var CalMilkLowfat = Cal * 120; //นมจืดพร่องไขมัน
        // var CalMilkFullfat = Cal * 150; //นมจืดไขมันเต็ม
        return CalMilkNonfat;
    }
    function CalMeat(Cal) {
        var result = Cal;
        //var CalMeatNonfat = Cal * 35; //เนื้อสัตว์ไม่มีไขมัน
        var CalMeatLowfat = Cal * 55; //เนื้อสัตว์ไขมันต่ำ
        //var CalMeatMediumfat = Cal * 75; //เนื้อสัตว์ไขมันปานกลาง
        //var CalMeatHighfat = Cal * 100; //เนื้อสัตว์ไขมันสูง
        return CalMeatLowfat;
    }
    function CalFat(Cal) {
        var result = Cal;
        var CalFat = Cal * 45; //ไขมัน
        return CalFat;
    }
}
// -------------- modal --------------
