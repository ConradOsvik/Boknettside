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
            firebase.storage().ref('users/' + firebaseUser.uid + '/profile.png').getDownloadURL().then(imgURL => {
                profileIMG.src = imgURL;
                console.log(imgURL);
            });
            var displayEmail = document.getElementById('displayEmail');
            displayEmail.innerHTML = 'Din Email: ' + firebaseUser.email
        }
        else{
            btnLogout.classList.add('hide');
            username.innerHTML = '';
            profileIMG.src = ''
        }
    });




}());

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
                    displaynameInput.value = ''
                }).catch(function(error) {
                    loadToast('error');
                    console.log(error.message);
                });
                setTimeout(function(){ location.reload(); }, 4000);

            }
        } else {
            loadToast('Logg inn for å bytte displayname');
        }
      });
});

 //upload img
 var uploader = document.getElementById('uploader');
 var fileButton = document.getElementById('avatarUpload');

 //file selection
 fileButton.addEventListener('change', e => {
     firebase.auth().onAuthStateChanged(firebaseUser => {
         if(firebaseUser){
             //get file
             var file = e.target.files[0];

             //create storage
             var storageRef = firebase.storage().ref('users/' + firebaseUser.uid + '/profile.png');

             //Upload file
             var task = storageRef.put(file);

             //progress
             task.on('state_changed',
             
                 function progress(snapshot){
                     var percentage = (snapshot.bytesTransferred /
                     snapshot.totalBytes) * 100;
                     uploader.value = percentage;
                 },

                 function error(err){
                     loadToast('Feilmelding');
                     console.log(err.message);
                 },

                 function complete(){
                     loadToast('Profilbilde oppdatert');
                     setTimeout(function(){
                         location.reload();
                     }, 3000);
                 }
             
             );
         }
         else{
             loadToast('User not logged in');
         }
     });
 });

//change password
var newPasswordInput = document.getElementById('newPasswordInput');
var newPasswordButton = document.getElementById('newPasswordButton');
var newPasswordCheckBox = document.getElementById('newPasswordCheckBox');

//open checkbox
newPasswordButton.addEventListener('click', e => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            if(newPasswordInput.value == ''){
                loadToast('Skriv inn nytt passord');
            }
            else{
                newPasswordCheckBox.classList.remove('hide');
            }
        }
        else{
            loadToast('Logg inn for å bytte passord');
        }
    });
});

//check password match
var newPasswordInputCheck = document.getElementById('newPasswordInputCheck');
var newPasswordInputCheckTwice = document.getElementById('newPasswordInputCheckTwice');
var newPasswordButtonCheck = document.getElementById('newPasswordButtonCheck');

newPasswordButtonCheck.addEventListener('click', e => {
    if(newPasswordInputCheck.value === newPasswordInputCheckTwice.value && newPasswordInputCheck.value === newPasswordInput.value){
        var user = firebase.auth().currentUser;
        user.updatePassword(newPasswordInputCheck.value).then(function() {
            loadToast('Success');
        }).catch(function(error) {
            loadToast('Feil:' + error.message);
            console.log(error.message);
        });
        setTimeout(function(){
            newPasswordInput.value = '';
            newPasswordInputCheck.value = '';
            newPasswordInputCheckTwice.value = '';
            location.reload();
        }, 3000)
    }
    else{
        loadToast('Skriv inn samme passord');
    }
});

var checkPasswordBoxBtnClose = document.getElementById('checkPasswordBoxBtnClose');
checkPasswordBoxBtnClose.addEventListener('click', e => {
    newPasswordCheckBox.classList.add('hide');
    newPasswordInput.value = '';
    newPasswordInputCheck.value = '';
    newPasswordInputCheckTwice.value = '';
})