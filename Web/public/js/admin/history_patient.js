'use strict'
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const doctorId = urlParams.get('doctorId');
const date = urlParams.get('date');

$('#linkToAdmin').click(function () {
    window.open(`/admin`, "_self");
})
$('#linkToDoctor').click(function () {
    window.open(`/admin/profile_doctor?doctorId=${doctorId}`, "_self");
})
$('#linkToPatient').click(function () {
    window.open(`/admin/profile_patient?doctorId=${doctorId}&userId=${userId}`, "_self");
})


//console.log(userId, date)

const db = firebase.firestore();

const dataTH = moment(date, 'DD-MM-YYYY').add(543, 'years').format('Do MMMM YYYY')
document.getElementById("txtDateNowTH").innerHTML = dataTH

//Check Auth
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // window.open('/public', "_self");
    } else {
        window.open('/', "_self");
    }
})
$(document).ready(function() {
    setTable()
    getRatio()
    getBalance()
    getMealDetail()
})

// Call txtRatio //
function getRatio() {
    db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("ratio").get().then(function(doc) {
        //console.log(doc.id, doc.data())
        const timestamp = doc.data().timestamp
        const dateRatio = moment(timestamp).format('Do-MMMM-YYYY')
        $('#txtRatioDate').text(dateRatio)
        $('#txtRatioRice').text(doc.data().rice)
        $('#txtRatioFruits').text(doc.data().fruits)
        $('#txtRatioVegetable').text(doc.data().vegetable)
        $('#txtRatioMilk').text(doc.data().milk)
        $('#txtRatioMeat').text(doc.data().meat)
        $('#txtRatioFat').text(doc.data().fat)
        $('#txtRatioSugar').text(doc.data().sugar)
        $('#txtRatioSodium').text(doc.data().sodium)
    })
}
// End call txtRatio //

// Call balance //
function getBalance() {
    db.collection("users").doc(userId).collection("diary").doc(date).collection("history").doc("balance").get().then(function(doc) {
        $('#txtBalanceRice').text(doc.data().rice)
        $('#txtBalanceFruits').text(doc.data().fruits)
        $('#txtBalanceVegetable').text(doc.data().vegetable)
        $('#txtBalanceMilk').text(doc.data().milk)
        $('#txtBalanceMeat').text(doc.data().meat)
        $('#txtBalanceFat').text(doc.data().fat)
        $('#txtBalanceSugar').text(doc.data().sugar)
        $('#txtBalanceSodium').text(doc.data().sodium)
    })
}
// End call balance //
function setTable() {
    const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed'];
    for (let i = 0; i < meal.length; i++) {
        db.collection("users").doc(userId).collection("diary").doc(date).collection(meal[i]).orderBy("time", "asc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                const tr = $(TABLE_TEMPLATE)
                tr.find('.txtMeal').attr('id', `txtMeal${doc.id}`)
                tr.find('.txtTime').attr('id', `txtTime${doc.id}`)
                tr.find('.txtNameFood').attr('id', `txtNameFood${doc.id}`)
                tr.find('.btnImageFood').attr('href', `#modalImageFood${doc.id}`)
                tr.find('.txtRice').attr('id', `txtRice${doc.id}`)
                tr.find('.txtFruits').attr('id', `txtFruits${doc.id}`)
                tr.find('.txtVegetable').attr('id', `txtVegetable${doc.id}`)
                tr.find('.txtMilk').attr('id', `txtMilk${doc.id}`)
                tr.find('.txtMeat').attr('id', `txtMeat${doc.id}`)
                tr.find('.txtFat').attr('id', `txtFat${doc.id}`)
                tr.find('.txtSugar').attr('id', `txtSugar${doc.id}`)
                tr.find('.txtSodium').attr('id', `txtSodium${doc.id}`)

                tr.find('.kcalRice').attr('id', `kcalRice${doc.id}`)
                tr.find('.kcalFruits').attr('id', `kcalFruits${doc.id}`)
                tr.find('.kcalVegetable').attr('id', `kcalVegetable${doc.id}`)
                tr.find('.kcalMilk').attr('id', `kcalMilk${doc.id}`)
                tr.find('.kcalMeat').attr('id', `kcalMeat${doc.id}`)
                tr.find('.kcalFat').attr('id', `kcalFat${doc.id}`)
                tr.find('.kcalSugar').attr('id', `kcalSugar${doc.id}`)
                tr.find('.btnChange').attr('data-target', `#modalChange${doc.id}`)
                $('#tableHistory').append(tr)

                const md = $(MODAL_TEMPLATE)
                md.find('.modalChange').attr('id', `modalChange${doc.id}`)
                md.find('.nameHeadModal').text(doc.data().foodname)
                md.find('.inputRice').attr('id', `inputRice${doc.id}`)
                md.find('.inputFruits').attr('id', `inputFruits${doc.id}`)
                md.find('.inputTypeMeat').attr('id', `inputTypeMeat${doc.id}`)
                md.find('.inputMeat').attr('id', `inputMeat${doc.id}`)
                md.find('.inputTypeVegetable').attr('id', `inputTypeVegetable${doc.id}`)
                md.find('.inputVegetable').attr('id', `inputVegetable${doc.id}`)
                md.find('.inputTypeMilk').attr('id', `inputTypeMilk${doc.id}`)
                md.find('.inputMilk').attr('id', `inputMilk${doc.id}`)
                md.find('.inputSugar').attr('id', `inputSugar${doc.id}`)
                md.find('.inputSodium').attr('id', `inputSodium${doc.id}`)
                md.find('.inputFat').attr('id', `inputFat${doc.id}`)
                md.find('.btnChangeSubmit').attr('id', `btnChangeSubmit${doc.id}`)
                md.find('.btnChangeSubmit').click(function() {

                    const rice = $(`#inputRice${doc.id}`).val()
                    const fruits = $(`#inputFruits${doc.id}`).val()
                    const typeMeat = $(`#inputTypeMeat${doc.id}`).val()
                    const meat = $(`#inputMeat${doc.id}`).val()
                    const typeVegetable = $(`#inputTypeVegetable${doc.id}`).val()
                    const vegetable = $(`#inputVegetable${doc.id}`).val()
                    const typemilk = $(`#inputTypeMilk${doc.id}`).val()
                    const milk = $(`#inputMilk${doc.id}`).val()
                    const sugar = $(`#inputSugar${doc.id}`).val()
                    const sodium = $(`#inputSodium${doc.id}`).val()
                    const fat = $(`#inputFat${doc.id}`).val()
                    const kcal = calBalanceUpdate(rice, fruits, typeMeat, meat, typeVegetable, vegetable, typemilk, milk, sugar, sodium, fat)
                    updateDetailToDB(userId, date, meal[i], doc.id, kcal, rice, fruits, typeMeat, meat, typeVegetable, vegetable, typemilk, milk, sugar, sodium, fat)
                    $(`#modalChange${doc.id}`).modal('hide')
                })
                $('#modal_insert').append(md)

                const img = $(MODAL_IMAGE_TEMPLATE)
                img.find('.modalImageFood').attr('id', `modalImageFood${doc.id}`)
                img.find('.modalNameFood').text(doc.data().foodname)
                img.find('.modalSrcImage').attr('src', doc.data().image)
                $('#modal_imagefood_insert').append(img)

            });
        });
    }
}

function getMealDetail() {
    const meal = ['breakfast', 'morningsnack', 'lunch', 'afternoonsnack', 'dinner', 'beforebed'];
    const mealTh = ['เช้า', 'ว่างเช้า', 'กลางวัน', 'ว่างบ่าย', 'เย็น', 'ก่อนนอน'];
    for (let i = 0; i < meal.length; i++) {
        db.collection("users").doc(userId).collection("diary").doc(date).collection(meal[i]).orderBy("time", "asc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots

                const foodname = doc.data().foodname
                const rice = doc.data().rice
                const fruits = doc.data().fruits
                const typeVegetable = doc.data().typeVegetable
                const vegetable = doc.data().vegetable
                const typemilk = doc.data().typemilk
                const milk = doc.data().milk
                const typeMeat = doc.data().typeMeat
                const meat = doc.data().meat
                const fat = doc.data().fat
                const sugar = doc.data().sugar
                const sodium = doc.data().sodium
                    //kcal rice
                var kcalRice = rice * 80
                    //kcal fruits
                var kcalFruits = fruits * 60
                    //kcal vegetable
                var kcalVegetable
                if (typeVegetable == 'a') { kcalVegetable = vegetable * 0 }
                if (typeVegetable == 'b') { kcalVegetable = vegetable * 25 }
                //kcal milk
                var kcalMilk
                if (typemilk == 'nonfat') { kcalMilk = milk * 90 }
                if (typemilk == 'lowfat') { kcalMilk = milk * 120 }
                if (typemilk == 'fat') { kcalMilk = milk * 150 }
                //kcal meat
                var kcalMeat
                if (typeMeat == 'nonfat') { kcalMeat = meat * 35 }
                if (typeMeat == 'lowfat') { kcalMeat = meat * 55 }
                if (typeMeat == 'medium') { kcalMeat = meat * 75 }
                if (typeMeat == 'highfat') { kcalMeat = meat * 100 }
                //kcal fat
                var kcalFat = fat * 45
                    //kcal sugar
                var kcalSugar = sugar * 16

                $(`#txtMeal${doc.id}`).text(mealTh[i])
                $(`#txtTime${doc.id}`).text(doc.data().time)
                $(`#txtNameFood${doc.id}`).text(foodname)
                $(`#txtRice${doc.id}`).text(rice)
                $(`#txtFruits${doc.id}`).text(fruits)
                $(`#txtVegetable${doc.id}`).text(vegetable)
                $(`#txtMilk${doc.id}`).text(milk)
                $(`#txtMeat${doc.id}`).text(meat)
                $(`#txtFat${doc.id}`).text(fat)
                $(`#txtSugar${doc.id}`).text(sugar)
                $(`#txtSodium${doc.id}`).text(sodium)

                //Kcal
                $(`#kcalRice${doc.id}`).text(kcalRice)
                $(`#kcalFruits${doc.id}`).text(kcalFruits)
                $(`#kcalVegetable${doc.id}`).text(kcalVegetable)
                $(`#kcalMilk${doc.id}`).text(kcalMilk)
                $(`#kcalMeat${doc.id}`).text(kcalMeat)
                $(`#kcalFat${doc.id}`).text(kcalFat)
                $(`#kcalSugar${doc.id}`).text(kcalSugar)

                //modal
                $(`#inputRice${doc.id}`).val(rice)
                $(`#inputFruits${doc.id}`).val(fruits)
                $(`#inputTypeMeat${doc.id}`).val(typeMeat)
                $(`#inputMeat${doc.id}`).val(meat)
                $(`#inputTypeVegetable${doc.id}`).val(typeVegetable)
                $(`#inputVegetable${doc.id}`).val(vegetable)
                $(`#inputTypeMilk${doc.id}`).val(typemilk)
                $(`#inputMilk${doc.id}`).val(milk)
                $(`#inputSugar${doc.id}`).val(sugar)
                $(`#inputSodium${doc.id}`).val(sodium)
                $(`#inputFat${doc.id}`).val(fat)

            });
        });
    }
}

// logout
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
})


