var chatBox = document.getElementById('chatBox');
var chatBtn = document.getElementById('chatBtn');
var chatBtnBox = document.getElementById('chatBtnBox');
var chatBtnClose = document.getElementById('chatBtnClose');

var chatMsgInput = document.getElementById('chatMsgInput');
var chatMsgButton = document.getElementById('chatMsgButton');

var db = firebase.firestore();
var chatColl = db.collection('chat');

var meldingBox = document.getElementById('meldingBox');

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

//convert time to dobbledigit
var currentTime = new Date();
var currentHours = currentTime.getHours();
var currentMinutes = currentTime.getMinutes();
var timems = currentTime.getTime();

function clock(){
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
        }
        else{
            if(user.displayName == null || user.displayName == ''){
                loadToast('Sett et displayname i profilen din');
            }
            else{
                var userid = user.displayName;
            
                clock();

                var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "Søndag";
                weekday[1] = "Mandag";
                weekday[2] = "Tirsdag";
                weekday[3] = "Onsdag";
                weekday[4] = "Torsdag";
                weekday[5] = "Fredag";
                weekday[6] = "Lørdag";

                var day = weekday[d.getDay()];

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