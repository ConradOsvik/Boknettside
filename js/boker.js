var displayDB = document.querySelector('#displayDB');
var searchTypeBoker = document.querySelector('#searchTypeBoker');
var selTypeBoker = document.querySelector('#selTypeBoker');

var loader = document.querySelector('#loading');

var db = firebase.firestore();
var bokColl = db.collection('boker');

window.onload = () => {
    bokColl.orderBy('navn').get().then(snapshot => skrivResultatBoker(snapshot));
}

selTypeBoker.onchange = async () => {
    displayDB.innerHTML = '';
    loader.innerHTML = `
        <section id="loading">
            <div class="loader">Loading...</div>
        </section>
    `;
    if(selTypeBoker.value === 'bokNy'){
        await bokColl.orderBy('ua', 'desc').get().then(snapshot => skrivResultatBoker(snapshot));
    }
    else if(selTypeBoker.value === 'bokGammel'){
        await bokColl.orderBy('ua').get().then(snapshot => skrivResultatBoker(snapshot));
    }
    else{
        await bokColl.orderBy('navn').get().then(snapshot => skrivResultatBoker(snapshot));
    }
}

searchTypeBoker.onchange = () => {
    var lowercase = searchTypeBoker.value.toLowerCase();
    displayDB.innerHTML = '';
    loader.innerHTML = `
        <section id="loading">
            <div class="loader">Loading...</div>
        </section>
    `;
    if(searchTypeBoker.value == ''){
        bokColl.orderBy('navn').get().then(snapshot => skrivResultatBoker(snapshot));
    }
    else{
        bokColl.where('navn', '==', lowercase).get().then(snapshot => skrivResultatBoker(snapshot));
    }
}

var skrivResultatBoker = (snapshot) => {
    loader.innerHTML = '';
    snapshot.forEach(snap => lagHTMLBoker(snap.id, snap.data()));
}
var lagHTMLBoker = (id, info) => {
    displayDB.innerHTML += `
        <a href="boker.html?id=${id}" class="displaycontent">
        <img src="${info["bilde"]}" alt="">
        <h1>${info["navn"]}</h1>
        <p>Forfatter: ${info["forfatter"]}</p>
        <p>Utgivelsesår: ${info["ua"]}</p>
        </a>
    `;
}