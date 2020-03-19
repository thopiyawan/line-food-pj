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


            //console.log(doc.id, " => ", doc.data());
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
            cell2.innerHTML = ` ${doc.data().foodname} <br> 
                <a href="#myModal" role="button" class="btn btn-light" data-target=".bg-image" data-toggle="modal"><i class="fas fa-images"></i></a>`;
            cell3.innerHTML = `${doc.data().rice} <br> (${CalStarch(doc.data().rice)} กิโลแคลอรี)`;
            cell4.innerHTML = `${doc.data().fruits} <br> (${CalFruits(doc.data().fruits)} กิโลแคลอรี)`;
            cell5.innerHTML = `${doc.data().vegetable} <br> (${CalVetgetable(doc.data().vegetable)} กิโลแคลอรี)`;
            cell6.innerHTML = `${doc.data().milk} <br> (${CalMilk(doc.data().milk)} กิโลแคลอรี)`;
            cell7.innerHTML = `${doc.data().meat} <br> (${CalMeat(doc.data().meat)} กิโลแคลอรี)`;
            cell8.innerHTML = `${doc.data().fat} <br> (${CalFat(doc.data().fat)} กิโลแคลอรี)`;
            cell9.innerHTML = doc.data().sugar;
            cell10.innerHTML = doc.data().sodium

            //openModal button
            var openModal = document.createElement("button");
            openModal.setAttribute("class", "fas fa-edit btn btn-warning");
            openModal.setAttribute("type", "button");
            openModal.setAttribute("data-toggle", "modal");
            openModal.setAttribute("data-target", `.bd-${doc.id}`);
            openModal.id = `${doc.id}`;
            cell11.appendChild(openModal);
            // keep id
            openModal.setAttribute('data-id', doc.id);
            cell11.appendChild(openModal);

            // Modal
            var div1 = document.createElement("div");
            div1.setAttribute("class", `modal fade bd-${doc.id} bd-example-modal-l`);
            div1.setAttribute("id", "modal");
            div1.setAttribute("tabindex", "-1");
            div1.setAttribute("role", "dialog");
            div1.setAttribute("aria-labelledby", "exampleModalLabel");
            div1.setAttribute("aria-labelledby", "true");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "modal-dialog modal-lg");
            div2.setAttribute("role", "document");

            var div3 = document.createElement("div");
            div3.setAttribute("class", "modal-content modal-lg ");

            var div4 = document.createElement("div");
            div4.setAttribute("class", "modal-header");

            var div5 = document.createElement("h4");
            div5.setAttribute("class", "modal-title");
            div5.setAttribute("id", "exampleModalLabel");
            div5.innerText = meal;

            var div6 = document.createElement("button");
            div6.setAttribute("class", "close text-danger");
            div6.setAttribute("type", "button");
            div6.setAttribute("data-dismiss", "modal");
            div6.setAttribute("aria-label", "Close");

            var div7 = document.createElement("i");
            div7.setAttribute("class", "fas fa-window-close");

            var div8 = document.createElement("div");
            div8.setAttribute("class", "modal-body");

            var div9 = document.createElement("div");
            div9.setAttribute("class", "container");
            //form id
            var div10 = document.createElement("form");
            div10.setAttribute("id", doc.id);
            //form
            var div11 = document.createElement("div");
            div11.setAttribute("class", "form-row");

            //ข้าวแป้ง
            var div12 = document.createElement("div");
            div12.setAttribute("class", "form-group col-md-2");

            var div13 = document.createElement("label");
            div13.setAttribute("for", "rice");
            div13.innerText = "ข้าว-แป้ง";

            var div14 = document.createElement("input");
            div14.setAttribute("type", "number");
            div14.setAttribute("class", "form-control");
            div14.setAttribute("id", `rice${doc.id}`);
            div14.setAttribute("value", doc.data().rice);
            div14.setAttribute("name", "rice");
            div14.setAttribute("min", "0");

            //ผลไม้
            var div15 = document.createElement("div");
            div15.setAttribute("class", "form-group col-md-2");

            var div16 = document.createElement("label");
            div16.setAttribute("for", "fruits");
            div16.innerText = "ผลไม้";

            var div17 = document.createElement("input");
            div17.setAttribute("type", "number");
            div17.setAttribute("class", "form-control");
            div17.setAttribute("id", `fruits${doc.id}`);
            div17.setAttribute("value", doc.data().fruits);
            div17.setAttribute("name", "fruits");
            div17.setAttribute("min", "0");

            //ผัก ก.ข.
            var div18 = document.createElement("div");
            div18.setAttribute("class", "form-group col-md-2");

            var div19 = document.createElement("label");
            div19.setAttribute("for", "vegetable");
            div19.innerText = "ผัก ก.ข.";

            var div20 = document.createElement("input");
            div20.setAttribute("type", "number");
            div20.setAttribute("class", "form-control");
            div20.setAttribute("id", `vegetable${doc.id}`);
            div20.setAttribute("value", doc.data().vegetable);
            div20.setAttribute("name", "vegetable");
            div20.setAttribute("min", "0");

            //นม
            var div21 = document.createElement("div");
            div21.setAttribute("class", "form-group col-md-2");

            var div22 = document.createElement("label");
            div22.setAttribute("for", "milk");
            div22.innerText = "นม";

            var div23 = document.createElement("input");
            div23.setAttribute("type", "number");
            div23.setAttribute("class", "form-control");
            div23.setAttribute("id", `milk${doc.id}`);
            div23.setAttribute("value", doc.data().milk);
            div23.setAttribute("name", "milk");
            div23.setAttribute("min", "0");

            //เนื้อสัตว์
            var div24 = document.createElement("div");
            div24.setAttribute("class", "form-group col-md-2");

            var div25 = document.createElement("label");
            div25.setAttribute("for", "meat");
            div25.innerText = "เนื้อสัตว์";

            var div26 = document.createElement("input");
            div26.setAttribute("type", "number");
            div26.setAttribute("class", "form-control");
            div26.setAttribute("id", `meat${doc.id}`);
            div26.setAttribute("value", doc.data().meat);
            div26.setAttribute("name", "meat");
            div26.setAttribute("min", "0");

            //ไขมัน
            var div27 = document.createElement("div");
            div27.setAttribute("class", "form-group col-md-2");

            var div28 = document.createElement("label");
            div28.setAttribute("for", "fat");
            div28.innerText = "ไขมัน";

            var div29 = document.createElement("input");
            div29.setAttribute("type", "number");
            div29.setAttribute("class", "form-control");
            div29.setAttribute("id", `fat${doc.id}`);
            div29.setAttribute("value", doc.data().fat);
            div29.setAttribute("name", "fat");
            div29.setAttribute("min", "0");

            //--------------------
            var div30 = document.createElement("div");
            div30.setAttribute("class", "form-row");

            //น้ำตาล
            var div31 = document.createElement("div");
            div31.setAttribute("class", "form-group col-md-2");

            var div32 = document.createElement("label");
            div32.setAttribute("for", "sugar");
            div32.innerHTML = "น้ำตาล";

            var div33 = document.createElement("input");
            div33.setAttribute("type", "number");
            div33.setAttribute("class", "form-control");
            div33.setAttribute("id", `sugar${doc.id}`);
            div33.setAttribute("value", doc.data().sugar);
            div33.setAttribute("name", "sugar");
            div33.setAttribute("min", "0");

            //โซเดียม
            var div34 = document.createElement("div");
            div34.setAttribute("class", "form-group col-md-2");

            var div35 = document.createElement("label");
            div35.setAttribute("for", "sodium");
            div35.innerHTML = "โซเดียม";

            var div36 = document.createElement("input");
            div36.setAttribute("type", "number");
            div36.setAttribute("class", "form-control");
            div36.setAttribute("id", `sodium${doc.id}`);
            div36.setAttribute("value", doc.data().sodium);
            div36.setAttribute("name", "sodium");
            div36.setAttribute("min", "0");

            var div37 = document.createElement("div");
            div37.setAttribute("class", "modal-footer");

            //btn submit
            var div38 = document.createElement("button");
            div38.setAttribute("class", "btn btn-primary");
            div38.setAttribute("type", "submit");
            div38.setAttribute("data-id", doc.id);
            div38.setAttribute('onclick', 'doSomething();'); // for FF
            div38.onclick = function () {

                db.collection("users").doc(userId).collection("diary").doc(date).collection(mealName).doc(doc.id).update({
                    rice: parseFloat(document.getElementById(`rice${doc.id}`).value),
                    fruits: parseFloat(document.getElementById(`fruits${doc.id}`).value),
                    vegetable: parseFloat(document.getElementById(`vegetable${doc.id}`).value),
                    meat: parseFloat(document.getElementById(`meat${doc.id}`).value),
                    milk: parseFloat(document.getElementById(`milk${doc.id}`).value),
                    fat: parseFloat(document.getElementById(`fat${doc.id}`).value),
                    sugar: parseFloat(document.getElementById(`sugar${doc.id}`).value),
                    sodium: parseFloat(document.getElementById(`sodium${doc.id}`).value)
                }).then(async function () {
                    await calBalance();
                    location.reload();
                });
            }

            div38.innerHTML = "แก้ไข";


            // appendChild 
            document.getElementById("testModal").appendChild(div1);
            div1.appendChild(div2)
            div2.appendChild(div3)
            div3.appendChild(div4)
            div4.appendChild(div5)
            div4.appendChild(div6)
            div6.appendChild(div7)
            div3.appendChild(div8)
            div8.appendChild(div9)
            div9.appendChild(div10)
            div10.appendChild(div11) //form-row
            div11.appendChild(div12) //ข้าวแป้ง
            div12.appendChild(div13) //div13 label 
            div12.appendChild(div14) //div14 input
            div11.appendChild(div15) //ผลไม้
            div15.appendChild(div16) //div16 label
            div15.appendChild(div17) //div17 input
            div11.appendChild(div18) //ผัก
            div18.appendChild(div19) //div19
            div18.appendChild(div20) //div20
            div11.appendChild(div21) //นม
            div21.appendChild(div22) //div22
            div21.appendChild(div23) //div23
            div11.appendChild(div24) //เนื้อสัตว์
            div24.appendChild(div25) //div25
            div24.appendChild(div26) //div26
            div11.appendChild(div27) //ไขมัน
            div27.appendChild(div28) //div28
            div27.appendChild(div29) //div29           
            div10.appendChild(div30) //form-row2
            div30.appendChild(div31) //น้ำตาล
            div31.appendChild(div32) //div32
            div32.appendChild(div33) //div33   
            div30.appendChild(div34) //โซเดียม
            div34.appendChild(div35) //div35
            div35.appendChild(div36) //div36  
            div8.appendChild(div37)
            div37.appendChild(div38)
            //--------------------//


            // Modal img
            var div100 = document.createElement("div");
            div100.setAttribute("class", `modal fade bg-image show`);
            div100.setAttribute("id", "myModal");
            div100.setAttribute("role", "dialog");

            var div101 = document.createElement("div");
            div101.setAttribute("class", "modal-dialog");

            var div102 = document.createElement("div");
            div102.setAttribute("class", "modal-content");

            var div103 = document.createElement("div");
            div103.setAttribute("class", "modal-header");

            var div104 = document.createElement("h5");
            div104.innerHTML = "ชื่ออาหาร";

            var div105 = document.createElement("button");
            div105.setAttribute("class", "close text-danger");
            div105.setAttribute("data-dismiss", "modal");

            var div106 = document.createElement("span");
            div106.setAttribute("class", "fas fa-window-close");

            var div107 = document.createElement("div");
            div107.setAttribute("class", "modal-body");
            div107.setAttribute("id", "dynamic-content");

            var div108 = document.createElement("img");
            div108.setAttribute("class", "img-fluid");
            div108.setAttribute("src", "//placehold.it/600x400"); //insert img

            // appendChild modal img
            document.getElementById("myModal").appendChild(div100);
            div100.appendChild(div101)
            div101.appendChild(div102)
            div102.appendChild(div103)
            div103.appendChild(div104)
            div103.appendChild(div105)
            div105.appendChild(div106)
            div102.appendChild(div107)
            div107.appendChild(div108)

        });


    });

    //Call ratio
    db.collection("users").doc(userId).collection("information").doc("ratio").get().then(function (doc) {
        //console.log("Document data:", doc.data());
        document.getElementById("RatioRiceID").innerHTML = doc.data().rice
        document.getElementById("RatioFruitsID").innerHTML = doc.data().fruits
        document.getElementById("RatioVegetID").innerHTML = doc.data().vegetable
        document.getElementById("RatioMilkID").innerHTML = doc.data().milk
        document.getElementById("RatioMeatID").innerHTML = doc.data().meat
        document.getElementById("RatioFatID").innerHTML = doc.data().fat
        document.getElementById("RatioSugarID").innerHTML = doc.data().sugar
        document.getElementById("RatioSodiumID").innerHTML = doc.data().sodium

        //modal
        document.getElementById("rice01").value = doc.data().rice
        document.getElementById("fruits01").value = doc.data().fruits
        document.getElementById("vegetable01").value = doc.data().vegetable
        document.getElementById("milk01").value = doc.data().milk
        document.getElementById("meat01").value = doc.data().meat
        document.getElementById("fat01").value = doc.data().fat
        document.getElementById("sugar01").value = doc.data().sugar
        document.getElementById("sodium01").value = doc.data().sodium
    })

    //Call balacne
    db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").get().then(function (doc) {
        //console.log("Document data:", doc.data());
        document.getElementById("BalanceRiceID").innerHTML = doc.data().rice
        document.getElementById("BalanceFruitsID").innerHTML = doc.data().fruits
        document.getElementById("BalanceVegetID").innerHTML = doc.data().vegetable
        document.getElementById("BalanceMilkID").innerHTML = doc.data().milk
        document.getElementById("BalanceMeatID").innerHTML = doc.data().meat
        document.getElementById("BalanceFatID").innerHTML = doc.data().fat
        document.getElementById("BalanceSugarID").innerHTML = doc.data().sugar
        document.getElementById("BalanceSodiumID").innerHTML = doc.data().sodium
    })

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


//update ratio
document.getElementById("ratioSubmit").addEventListener("click", updateRatio);
function updateRatio() {
    db.collection("users").doc(userId).collection("information").doc("ratio").update({
        rice: document.getElementById("rice01").value,
        fruits: document.getElementById("fruits01").value,
        vegetable: document.getElementById("vegetable01").value,
        milk: document.getElementById("milk01").value,
        meat: document.getElementById("meat01").value,
        fat: document.getElementById("fat01").value,
        sugar: document.getElementById("sugar01").value,
        sodium: document.getElementById("sodium01").value,
    }).then(function () {
        location.reload();
    })
}


// calculate balance
async function calBalance() {
    var ratio;
    await db.collection("users").doc(userId).collection("information").doc("ratio").get().then(function (doc) {
        //console.log("Document data:", doc.data());
        ratio = doc.data()
    })
    //console.log(ratio)

    var data = [
        breakfastData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        morningsnackData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        lunchData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        afternoonsnackData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        dinnerData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 },
        beforebedData = { rice: 0, fruits: 0, vegetable: 0, milk: 0, meat: 0, fat: 0, sugar: 0, sodium: 0 }
    ]
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('breakfast').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[0].rice = data[0].rice + doc.data().rice
                data[0].fruits = data[0].fruits + doc.data().fruits
                data[0].vegetable = data[0].vegetable + doc.data().vegetable
                data[0].milk = data[0].milk + doc.data().milk
                data[0].meat = data[0].meat + doc.data().meat
                data[0].fat = data[0].fat + doc.data().fat
                data[0].sugar = data[0].sugar + doc.data().sugar
                data[0].sodium = data[0].sodium + doc.data().sodium
            });
        })
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('morningsnack').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[1].rice = data[1].rice + doc.data().rice
                data[1].fruits = data[1].fruits + doc.data().fruits
                data[1].vegetable = data[1].vegetable + doc.data().vegetable
                data[1].milk = data[1].milk + doc.data().milk
                data[1].meat = data[1].meat + doc.data().meat
                data[1].fat = data[1].fat + doc.data().fat
                data[1].sugar = data[1].sugar + doc.data().sugar
                data[1].sodium = data[1].sodium + doc.data().sodium
            });
        })
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('lunch').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[2].rice = data[2].rice + doc.data().rice
                data[2].fruits = data[2].fruits + doc.data().fruits
                data[2].vegetable = data[2].vegetable + doc.data().vegetable
                data[2].milk = data[2].milk + doc.data().milk
                data[2].meat = data[2].meat + doc.data().meat
                data[2].fat = data[2].fat + doc.data().fat
                data[2].sugar = data[2].sugar + doc.data().sugar
                data[2].sodium = data[2].sodium + doc.data().sodium
            });
        })
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('afternoonsnack').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[3].rice = data[3].rice + doc.data().rice
                data[3].fruits = data[3].fruits + doc.data().fruits
                data[3].vegetable = data[3].vegetable + doc.data().vegetable
                data[3].milk = data[3].milk + doc.data().milk
                data[3].meat = data[3].meat + doc.data().meat
                data[3].fat = data[3].fat + doc.data().fat
                data[3].sugar = data[3].sugar + doc.data().sugar
                data[3].sodium = data[3].sodium + doc.data().sodium
            });
        })
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('dinner').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[4].rice = data[4].rice + doc.data().rice
                data[4].fruits = data[4].fruits + doc.data().fruits
                data[4].vegetable = data[4].vegetable + doc.data().vegetable
                data[4].milk = data[4].milk + doc.data().milk
                data[4].meat = data[4].meat + doc.data().meat
                data[4].fat = data[4].fat + doc.data().fat
                data[4].sugar = data[4].sugar + doc.data().sugar
                data[4].sodium = data[4].sodium + doc.data().sodium
            });
        })
    await db.collection("users").doc(userId).collection("diary").doc(date).collection('beforebed').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                data[5].rice = data[5].rice + doc.data().rice
                data[5].fruits = data[5].fruits + doc.data().fruits
                data[5].vegetable = data[5].vegetable + doc.data().vegetable
                data[5].milk = data[5].milk + doc.data().milk
                data[5].meat = data[5].meat + doc.data().meat
                data[5].fat = data[5].fat + doc.data().fat
                data[5].sugar = data[5].sugar + doc.data().sugar
                data[5].sodium = data[5].sodium + doc.data().sodium
            });
        })

    var dataTotal = {
        rice: data[0].rice + data[1].rice + data[2].rice + data[3].rice + data[4].rice + data[5].rice,
        fruits: data[0].fruits + data[1].fruits + data[2].fruits + data[3].fruits + data[4].fruits + data[5].fruits,
        vegetable: data[0].vegetable + data[1].vegetable + data[2].vegetable + data[3].vegetable + data[4].vegetable + data[5].vegetable,
        milk: data[0].milk + data[1].milk + data[2].milk + data[3].milk + data[4].milk + data[5].milk,
        meat: data[0].meat + data[1].meat + data[2].meat + data[3].meat + data[4].meat + data[5].meat,
        fat: data[0].fat + data[1].fat + data[2].fat + data[3].fat + data[4].fat + data[5].fat,
        sugar: data[0].sugar + data[1].sugar + data[2].sugar + data[3].sugar + data[4].sugar + data[5].sugar,
        sodium: data[0].sodium + data[1].sodium + data[2].sodium + data[3].sodium + data[4].sodium + data[5].sodium,
    }

    //console.log(dataTotal)
    var balance = {
        rice: calculate(ratio.rice, dataTotal.rice),
        fruits: calculate(ratio.fruits, dataTotal.fruits),
        vegetable: calculate(ratio.vegetable, dataTotal.vegetable),
        milk: calculate(ratio.milk, dataTotal.milk),
        meat: calculate(ratio.meat, dataTotal.meat),
        fat: calculate(ratio.fat, dataTotal.fat),
        sugar: calculate(ratio.sugar, dataTotal.sugar),
        sodium: calculate(ratio.sodium, dataTotal.sodium),
    }
    //console.log(balance)

    await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").set(ratio);
    await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("total").set(dataTotal);
    await db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").set(balance);


    function calculate(ratio, dataTotal) {
        var result = ratio - dataTotal

        return parseFloat(result)
    }

}


