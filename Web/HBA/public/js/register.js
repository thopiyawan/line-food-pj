const db = firebase.firestore();

const date = moment().format('Do-MMMM-YYYY')
const time = moment().format('HH:mm:ss')

const inputFullnameRegis = document.getElementById("inputFullnameRegis");
const inputlastnameRegis = document.getElementById("inputLastnameRegis");
const inputEmailRegis = document.getElementById("inputEmailRegis");
const passwordRegis = document.getElementById("passwordRegis");
const officeNameRegis = document.getElementById("officeNameRegis")

const ratioDoctor = document.getElementById("ratioDoctor");
const ratioDietician = document.getElementById("ratioDietician");

btnRegis.addEventListener('click', async e => {
    const fullname = inputFullnameRegis.value;
    const lastname = inputLastnameRegis.value;
    const email = inputEmailRegis.value;
    const password = passwordRegis.value;
    const officename = officeNameRegis.value

    var role
    if (ratioDoctor.checked) {
        role = ratioDoctor.value;
    }
    if (ratioDietician.checked) {
        role = ratioDietician.value;
    }


    if (!fullname || !lastname || !email || !password || !officename || !role) {
        Swal.fire({
            icon: 'error',
            title: '<h5>กรุณากรอกข้อมูลให้ครบถ้วย</h5>'
        })
    } else {
        const auth = firebase.auth();
        auth.languageCode = 'th';
        Swal.fire({
            icon: 'warning',
            title: '<h4>รอสักครู่กำลังสมัครสมาชิก</h4>',
            showConfirmButton: false,
            timer: 10000
        })
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            await db.collection("admin").add({
                role: role,
                fullname: fullname,
                lastname: lastname,
                email: email,
                submit: date,
                recently: date,
                officename: officename,
                imgProfile : "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Fimage_2020011622192773579.png?alt=media&token=86a9df6a-f12a-4400-bb2d-d0dda119622c",
                recentlyTimestamp: new Date().getTime(),
                time: time
            })
            await auth.currentUser.updateProfile({
                displayName: role
            })
            await auth.currentUser.sendEmailVerification().then(function () {
            })
            await auth.signOut().then(function () {

            })
            Swal.fire({
                icon: 'success',
                title: 'ลงทะเบียนสำเร็จ',
                text: 'กรุณายืนยันตัวตนใน Email ของท่าน',
            }).then(function () {
                window.open('/', "_self");
            })
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'มีบัญชี Email ในระบบแล้ว',
                text: 'กรุณาระบุ Email ใหม่',
            })
        }
    }


})
