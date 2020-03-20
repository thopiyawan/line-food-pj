const db = firebase.firestore();

const inputEmail = document.getElementById("inputEmail");

btnSend.addEventListener('click', e => {
    const email = inputEmail.value;
    console.log(email)

    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function () {
        Swal.fire({
            icon: 'success',
            title: 'กรุณาตรวจสอบ Email ของท่าน',
        })
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'ไม่มีอีเมลล์ในระบบ',
        })
    });
})

