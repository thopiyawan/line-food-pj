const db = firebase.firestore();

const auth = firebase.auth();

auth.languageCode = 'th';
//Check Auth
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified && user.displayName == "doctor") window.open('/patient', "_self");
        if (user.emailVerified && user.displayName == "dietician") window.open('/patient', "_self");
        if (user.emailVerified && user.displayName == "admin") window.open('/admin', "_self");
        if (!user.emailVerified) {
            Swal.fire({
                icon: 'error',
                title: 'Email ของท่านยังไม่ได้ยืนยันตัวตน',
                text: 'กรุณายืนยันตัวตน',
            }).then(function () {
                auth.signOut().then(function () {
                })
            })
        }
    } else {

    }
})

const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");

btnSignin.addEventListener('click', e => {
    const email = inputEmail.value;
    const password = inputPassword.value;

    //Log in
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'ผู้ใช้งานไม่ถูกต้อง',
            text: 'กรุณากรอกข้อมูลอีกครั้ง',
        })
    });
})
