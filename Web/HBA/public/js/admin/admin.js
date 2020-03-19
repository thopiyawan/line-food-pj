'use strict'
const db = firebase.firestore();
firebase.auth().languageCode = 'th';

const date = moment().format('Do-MMMM-YYYY');
const time = moment().format('HH:mm:ss')

const dataTH = moment().add(543, 'years').format('Do MMMM YYYY')
$('#txtDateNowTH').text(dataTH)
const dataNow = moment().add(543, 'years').format('Do/MM/YY')
$("#txtDate1").text(dataNow)
$("#txtDate2").text(dataNow)
$("#txtDate3").text(dataNow)
$("#txtDate4").text(dataNow)
//Check Auth
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        getAdminName(user.email)
        // window.open('/public', "_self");
    } else {
        window.open('/', "_self");
    }
})
//name admin
function getAdminName(email) {
    db.collection("admin").where("email", "==", email).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                document.getElementById("adminName").innerHTML = `${doc.data().fullname} ${doc.data().lastname}`
                db.collection("admin").doc(doc.id).update({
                    recently: date,
                    recentlyTimestamp: new Date().getTime(),
                    time: time
                })
            });
        })
}


//alluser
db.collection("admin").get().then(function (querySnapshot) {
    $("#allUser").text(querySnapshot.size)
});
db.collection("admin").where("role", "==", "doctor").get().then(function (querySnapshot) {
    $("#allDoctor").text(querySnapshot.size)
})
db.collection("admin").where("role", "==", "dietician").get().then(function (querySnapshot) {
    $("#allDietician").text(querySnapshot.size)
})
db.collection("admin").where("role", "==", "other").get().then(function (querySnapshot) {
    $("#allOther").text(querySnapshot.size)
})

const TABLE_TEMPLATE_ALL = `
<tbody>
    <td id="txtName"></td>
    <td id="txtEmail"></td>
    <td id="txtSubmitDate"></td>
    <td id="txtRole"></td>
    <td id="txtLoginDate">D</td>
    <td>
    <button class="btn btn-dark btn-sm" id="btnModalChange" data-toggle="modal"><i class="fas fa-exchange-alt"></i></button>
    <button class="btn btn-primary btn-sm" id="btnSee"><i class="fas fa-file-alt"></i></button>
    <button class="btn btn-warning btn-sm" id="btnRePass"><i class="fas fas fa-redo"></i></button>
    </td>
</tbody>
`
const TABLE_TEMPLATE_DOCTOR = `
<tbody>
    <td id="txtName"></td>
    <td id="txtEmail"></td>
    <td id="txtSubmitDate"></td>
    <td id="txtLoginDate"></td>
    <td>
    <button class="btn btn-dark btn-sm" id="btnModalChange" data-toggle="modal"><i class="fas fa-exchange-alt"></i></button>
    <button class="btn btn-primary btn-sm" id="btnSee"><i class="fas fa-file-alt"></i></button>
    <button class="btn btn-warning btn-sm" id="btnRePass"><i class="fas fas fa-redo"></i></button>
    </td>
</tbody>
`
const MODAL_CHANGE_ROLE_TEMPLATE = `
<div>
    <div class="modal fade bd-example-modal-sm modalChange" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">เปลี่ยนสถานะผู้ใช้งาน</h5>
                
                <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
                    <i class="fas fa-window-close"></i>
                </button>
            </div>
            <div class="modal-body">
                <h6 class="modal-title">สถานะปัจจุบัน:</h6>
                <br>
                <div class="form-group row">
                    <div class="col">
                        <div class="input-group">
                            <select class="custom-select custom-select-sm inputRole" >
                                <option value="admin">แอดมิน</option>
                                <option value="doctor">หมอ</option>
                                <option value="dietician">นักโภชนาการ</option>
                                <option value="other">อื่นๆ</option>
                            </select>
                        </div>
                    </div>
                </div>      
                

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary btn-sm" id="btnSubmitChange">Save changes</button>
            </div>
        </div>
    </div>
    </div>
</div>
`
//เรียกข้อมูลผู้ใช้ระบบทั้งหมด เรียงจากวันใช้งานล่าสุด
db.collection("admin").orderBy("recentlyTimestamp", "desc").get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //ผู้มช้งานทั้งหมด
            const tr = $(TABLE_TEMPLATE_ALL)
            tr.find('#txtName').text(`${doc.data().fullname} ${doc.data().lastname}`)
            tr.find('#txtEmail').text(doc.data().email)

            if (doc.data().role == 'doctor') { tr.find('#txtRole').text('คุณหมอ') }
            if (doc.data().role == 'dietician') { tr.find('#txtRole').text('นักโภชนาการ') }
            if (doc.data().role == 'other') { tr.find('#txtRole').text('อื่นๆ') }
            if (doc.data().role == 'admin') { tr.find('#txtRole').text('แอดมิน') }

            const dateSubmit = moment(doc.data().submit, 'DD-MMMM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            tr.find('#txtSubmitDate').text(dateSubmit)
            const dateLogin = moment(doc.data().recently, 'DD-MMMM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            tr.find('#txtLoginDate').text(dateLogin)
            tr.find('#btnModalChange').attr('data-target', `#modalChange${doc.id}`)
            tr.find('#btnRePass').click(function () {
                Swal.fire({
                    title: `<h3 class="font-weight-bold">เปลี่ยนรหัสผ่านใหม่หรือไม่ ?</h3>`,
                    text: "การเปลี่ยนรหัสจะส่งไปยัง Email ผู้ใช้",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่!',
                    cancelButtonText: 'ไม่!'
                }).then((result) => {
                    if (result.value) {
                        var emailReset = doc.data().email;
                        firebase.auth().sendPasswordResetEmail(emailReset).then(function () {
                            // Email sent.
                        })
                        Swal.fire(
                            'สำเร็จ!',
                            'ส่งการแก้ไขไป Email เรียบร้อย',
                            'success'
                        )
                    }
                })
            })
            tr.find('#btnSee').click(function () {
                window.open(`/admin/profile_doctor?doctorId=${doc.id}`, "_self");
            })
            $('#tb-user').append(tr)
            //เรียกข้อมูลหมอทั้งหมด
            const td = $(TABLE_TEMPLATE_DOCTOR)
            td.find('#txtName').text(`${doc.data().fullname} ${doc.data().lastname}`)
            td.find('#txtEmail').text(doc.data().email)
            td.find('#btnModalChange').attr('data-target', `#modalChange${doc.id}`)
            const dateSubmit1 = moment(doc.data().submit, 'DD-MMMM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            td.find('#txtSubmitDate').text(dateSubmit1)
            const dateLogin1 = moment(doc.data().recently, 'DD-MMMM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            td.find('#txtLoginDate').text(dateLogin1)
            td.find('#btnSee').click(function () {
                window.open(`/admin/profile_doctor?doctorId=${doc.id}`, "_self");
            })
            td.find('#btnRePass').click(function () {
                Swal.fire({
                    title: `<h3 class="font-weight-bold">เปลี่ยนรหัสผ่านใหม่หรือไม่ ?</h3>`,
                    text: "การเปลี่ยนรหัสจะส่งไปยัง Email ผู้ใช้",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่!',
                    cancelButtonText: 'ไม่!'
                }).then((result) => {
                    if (result.value) {
                        var emailReset = doc.data().email;
                        firebase.auth().sendPasswordResetEmail(emailReset).then(function () {
                            // Email sent.
                        })
                        Swal.fire(
                            'สำเร็จ!',
                            'ส่งการแก้ไขไป Email เร็ยบร้อย',
                            'success'
                        )
                    }
                })
            })
            if (doc.data().role == 'doctor') {
                $('#tb-doctor').append(td)
            }
            if (doc.data().role == 'dietician') {
                $('#tb-dietician').append(td)
            }
            if (doc.data().role == 'admin') {
                $('#tb-admin').append(td)
            }
            //ปุ่มแก้ไขสถานะแต่ละคน
            const md = $(MODAL_CHANGE_ROLE_TEMPLATE)

            md.find('.modalChange').attr('id', `modalChange${doc.id}`)
            md.find('.inputRole').val(doc.data().role)
            md.find('.inputRole').attr('id', `inputRole${doc.id}`)
            md.find('#btnSubmitChange').click(function () {
                const role = $(`#inputRole${doc.id}`).val()
                db.collection("admin").doc(doc.id).update({
                    role: role,
                })
                window.open('/admin', "_self");
            })
            $('#modalinsert').append(md)
        });
    })


//ลงชื่อออก
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
});



