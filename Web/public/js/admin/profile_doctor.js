'use strict'

const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('doctorId');

const db = firebase.firestore();

$('#linkToAdmin').click(function () {
    window.open(`/admin`, "_self");
})

const date = moment().format('Do-MMMM-YYYY');
const dateNow = moment().add(543, 'years').format('Do MMMM YYYY');
const time = moment().format('HH:mm:ss')
document.getElementById("txtDateNow").innerHTML = `วันที่ ${dateNow}`
//Check Auth
var email;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //console.log(user)
        email = user.email;
        getAdminName()
        createTable()
        // window.open('/public', "_self");
    } else {
        window.open('/', "_self");
    }
})
//name admin
function getAdminName() {
    db.collection("admin").doc(doctorId).get().then(function (doc) {
        $('#qrcode').text('')
        new QRCode(document.getElementById('qrcode'), doc.id);

        $("#txtQrcode").text(`QR CODE: ${doc.id}`)
        $("#nameDoctor").text(`${doc.data().fullname} ${doc.data().lastname}`)

        if (doc.data().role == 'doctor') { $('#txtRole').text('คุณหมอ') }
        if (doc.data().role == 'dietician') { $('#txtRole').text('นักโภชนาการ') }
        if (doc.data().role == 'other') { $('#txtRole').text('อื่นๆ') }
        if (doc.data().role == 'admin') { $('#txtRole').text('แอดมิน') }

        $("#txtOfficename").text(doc.data().officename)

        $("#inputName").val(doc.data().fullname)
        $("#inputLastName").val(doc.data().lastname)
        $("#inputOfficeName").val(doc.data().officename)

        const profilePictureDiv = document.getElementById('profilePictureDiv');
        if (profilePictureDiv.firstElementChild) {
            profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
        }
        const img = document.createElement('img');

        img.src = doc.data().imgProfile;
        img.setAttribute('class', 'card-img ');
        profilePictureDiv.appendChild(img);
    })
}
//อัพเดทโปรไฟล์ผู้ใช้งาน
btnUpdateProfile.addEventListener('click', e => {
    const fullname = document.getElementById("inputName").value
    const lastname = document.getElementById("inputLastName").value
    const officename = document.getElementById("inputOfficeName").value
    const imgProfile = document.getElementById("imgProfile").files[0];
//ถ้าใส่รูป
    if (imgProfile) {
        //img profile
        var imageName = new Date().getTime();
        var imagepath = `admin/image/${email}/profile/${imageName}`

        var storageref = firebase.storage().ref(imagepath);
        var uploadTask = storageref.put(imgProfile);

        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            console.error(error);
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                db.collection("admin").doc(doctorId).update({
                    fullname: fullname,
                    lastname: lastname,
                    officename: officename,
                    imgProfile: downloadURL
                })
            })
        })
    } else {
        db.collection("admin").doc(doctorId).update({
            fullname: fullname,
            lastname: lastname,
            officename: officename,
        })
    }
    getAdminName()
    Swal.fire({
        icon: 'success',
        title: '<h4>อัพเดทข้อมูลสำเร็จ!</h4>',
    })


})
//สร้างตารางคนไข้
async function createTable() {
    var sum = 0
    try {
        await db.collection("users").orderBy("LoginTimestamp", "desc").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().trainer == doctorId) {
                    sum++

                    const table = document.getElementById('tb-userdata')

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
                    // var col9 = row.insertCell(8);

                    //Get data from userId
                    db.collection("users").doc(doc.data().userId).collection("information").doc("profile").get().then(function (doc) {

                        //console.log("Document data:", doc.data());
                        col1.innerHTML = doc.data().fullname;
                        col2.innerHTML = doc.data().lastname;
                        col3.innerHTML = doc.data().gender;
                        col4.innerHTML = doc.data().age;
                        col5.innerHTML = doc.data().height;
                        col6.innerHTML = doc.data().weight;
                        col7.innerHTML = doc.data().bmi;
                    })
                    db.collection("users").doc(doc.data().userId).get().then(function (doc) {
                        const dateTH = moment(doc.data().LoginDate, 'DD-MM-YYYY').add(543, 'years').format('Do/MM/YYYY')
                        col8.innerHTML = dateTH;

                    })


                    // profile button2
                    let btn2 = document.createElement('button');
                    btn2.textContent = 'ดูข้อมูล';
                    col9.appendChild(btn2);
                    btn2.setAttribute('class', 'btn btn-primary btn-sm mr-3');

                    // keep id
                    btn2.setAttribute('data-id', doc.id);
                    col9.appendChild(btn2);

                    // profile btn
                    btn2.addEventListener("click", (e) => {
                        let id = e.target.getAttribute('data-id');
                        db.collection("users").doc(id).get();

                        window.open(`/admin/profile_patient?doctorId=${doctorId}&userId=${id}`, "_self");

                        console.log(e.target.getAttribute('data-id'));
                    });
                    //======================================================//
                }

            });
        });
        $("#sumPatient").text(sum)
    } catch (error) {
        console.log(error)
    }

}

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})