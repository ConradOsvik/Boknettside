var chatBox = document.getElementById('chatBox');
var chatBtn = document.getElementById('chatBtn');
var chatBtnBox = document.getElementById('chatBtnBox');
var chatBtnClose = document.getElementById('chatBtnClose');

var chatMsgInput = document.getElementById('chatMsgInput');
var chatMsgButton = document.getElementById('chatMsgButton');

var db = firebase.firestore();
var chatColl = db.collection('chat');

var meldingBox = document.getElementById('meldingBox');

//nav x change
function burgerChange(x) {
    x.classList.toggle("change");
    var sidenav = document.querySelector('.sidenav');
    sidenav.classList.toggle('hidenav');

    var bar1 = document.querySelector('.bar1');
    var bar2 = document.querySelector('.bar2');
    var bar3 = document.querySelector('.bar3');

    bar1.classList.toggle('white');
    bar2.classList.toggle('white');
    bar3.classList.toggle('white');
}

chatBtn.addEventListener('click', e => {
    e.preventDefault();
    chatBox.classList.remove('hide');
    chatBtnBox.classList.add('hide');
});

chatBtnClose.addEventListener('click', e => {
    chatBox.classList.add('hide');
    chatBtnBox.classList.remove('hide');
    chatMsgInput.value = '';
});
var chatOpen = false;
//website wide keycheck
document.addEventListener('keydown', e => {
    var key = e.key; 
    if(key === 'Enter'){
        chatBox.classList.remove('hide');
        chatBtnBox.classList.add('hide');
        chatOpen = true;
    }
    else if(key === 'Escape'){
        if(chatOpen){
            chatBox.classList.add('hide');
            chatBtnBox.classList.remove('hide');
            chatOpen = false
        }
    }
    else if(key === 'm' && chatOpen == false){
        console.log('test');
    }
});
//convert time to dobbledigit
var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
var timems = currentTime.getTime();

function clock(){
    //convert time to dobbledigit
    currentTime = new Date();
    currentHours = currentTime.getHours();
    currentMinutes = currentTime.getMinutes();
    timems = currentTime.getTime();
    if (currentMinutes.toString().length == 1) {
    currentMinutes = "0" + currentMinutes;
    }
    if (currentHours.toString().length == 1) {
    currentHours = "0" + currentHours;
    } 
}
//send msg
chatMsgButton.addEventListener('click', e => {
    var user = firebase.auth().currentUser
    if(user){
        if(chatMsgInput.value == ''){
            loadToast('Skriv inn melding');
            console.log(currentHours, currentMinutes);
        }
        else{
            if(user.displayName == null || user.displayName == ''){
                loadToast('Sett et displayname i profilen din');
            }
            else{
                var userid = user.displayName;
            
                clock();

                var weekday = new Array(7);
                weekday[0] = "Søndag";
                weekday[1] = "Mandag";
                weekday[2] = "Tirsdag";
                weekday[3] = "Onsdag";
                weekday[4] = "Torsdag";
                weekday[5] = "Fredag";
                weekday[6] = "Lørdag";

                var day = weekday[currentTime.getDay()];

                var timemsString = String(new Date().getTime());

                chatColl.doc(timemsString).set({
                    userid: userid,
                    msg: chatMsgInput.value,
                    time: "" + currentHours + ":" + currentMinutes + "",
                    day: day
                });

                chatMsgInput.value = '';

                console.log(timemsString);
            }
        }
    }
    else{
        loadToast('Logg inn for å skrive melding');
    }
});

//display msg
chatColl.onSnapshot(snap => {
    for(const melding of snap.docChanges()){
      if(melding.type === "added"){
        meldingBox.innerHTML += `
            <section class="chatMsg">

                <p>
                    <span>
                        [${melding.doc.data().day}: ${melding.doc.data().time}]
                    </span>
                    <span>
                        (${melding.doc.data().userid})
                    </span>
                    <span>
                        ${melding.doc.data().msg}
                    </span>
                </p>

            </section>
        `;
      }
    }
});

//scroll bottom on msg load
/*
var scrollBottom = () => {
    var element = document.getElementById('meldingBox');
    element.scrollTop = element.scrollHeight;
}
scrollBottom();
*/