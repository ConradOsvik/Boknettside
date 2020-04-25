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
        }
        else{
            btnLogout.classList.add('hide');
            username.innerHTML = '';
            profileIMG.src = ''
        }
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

                    },

                    function complete(){

                    }
                
                );
            }
            else{
                loadToast('User not logged in');
            }
        });
    });




}());

let file = {}
var chooseFile = (e) => {
    file = e.target.files[0];

    firebase.auth().onAuthStateChanged(firebaseUser => {
        firebase.storage().ref('users/' + firebaseUser.uid + '/profile.png').put(file).then(function() {
            loadToast('Success');
        }).catch(error => {
            loadToast('error')
            console.log(error.message)
        })
    });
}

//update profil
/*
const uploadAvatar = document.getElementById("avatar-upload");
uploadAvatar.addEventListener("change", handleFiles, false);
function handleFiles() {
    const file = this.files;
    console.log(file);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.storage().ref('users/' + user.uid + '/profile.png').put(file).then(function () {
                loadToast('Success');
            }).catch(error => {
                loadToast('Error');
                console.log(error.message);
            })
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


/*
user.updateProfile({
                photoURL: fileList,
            }).then(function() {
                loadToast('Success');
            }).catch(function(error) {
                loadToast('error');
                console.log(error.message);
            });
*/