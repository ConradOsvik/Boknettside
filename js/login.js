var loginBoxBtn = document.querySelector('#loginBoxBtn');
var loginBoxBtnClose = document.querySelector('#loginBoxBtnClose')
var loginBoxWrapper = document.querySelector('#loginBoxWrapper');

loginBoxBtn.onclick = () => {
    loginBoxWrapper.style.display = 'block';
}
loginBoxBtnClose.onclick = () => {
    loginBoxWrapper.style.display = 'none';
}

(function() {

    //get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    //login event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => loadToast(e.message));



    });

    //signup event
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => loadToast(e.message));



    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    //auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            btnLogout.classList.remove('hide');
            txtEmail.value = '';
            txtPassword.value = '';
            loginBoxWrapper.style.display = 'none';
        }
        else{
            btnLogout.classList.add('hide');
        }
    });


}());