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

    var profileIMG = document.getElementById('profileIMG');
    var username = document.getElementById('username');

    //auth listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            btnLogout.classList.remove('hide');
            txtEmail.value = '';
            txtPassword.value = '';
            loginBoxWrapper.style.display = 'none';
            console.log(firebaseUser);
            username.innerHTML = firebaseUser.displayName;
            profileIMG.src = firebaseUser.photoURL;
        }
        else{
            btnLogout.classList.add('hide');
            username.innerHTML = '';
            profileIMG.src = ''
        }
    });


}());

//update profil
/*
var uploadAvatar = document.getElementById('avatar-upload');
uploadAvatar.onchange = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateProfile({
                photoURL: uploadAvatar.files[0],
            }).then(function() {
                loadToast('Success');
            }).catch(function(error) {
                loadToast('error');
                console.log(error.message);
            });
        } 
        else {
            loadToast('Logg inn for å bytte profilbilde');
        }
    });
}
*/
var displaynameInput = document.getElementById('displaynameInput');
var displaynameButton = document.getElementById('displaynameButton');

displaynameButton.addEventListener('click', e => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(displaynameInput.value == ''){
                loadToast('Skriv inn displayname');
            }
            else{
                user.updateProfile({
                    displayName: displaynameInput.value,
                }).then(function() {
                    loadToast('Success');
                }).catch(function(error) {
                    loadToast('error');
                    console.log(error.message);
                });
                //setTimeout(function(){ location.reload(); }, 1000); man må refreshe for å se det nye navnet

            }
        } else {
            loadToast('Logg inn for å bytte displayname');
        }
      });
});
