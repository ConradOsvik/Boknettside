var displayDB = document.querySelector('#displayDB');
var searchTypeForfattere = document.querySelector('#searchTypeForfattere');
var selTypeForfattere = document.querySelector('#selTypeForfattere');

var loader = document.querySelector('#loading');

var db = firebase.firestore();
var forfatterColl = db.collection('forfattere');

window.onload = () => {
    forfatterColl.orderBy('navn').get().then(snapshot => skrivResultatForfattere(snapshot));
}

selTypeForfattere.onchange = async () => {
    displayDB.innerHTML = '';
    loader.innerHTML = `
        <section id="loading">
            <div class="loader">Loading...</div>
        </section>
    `;
    if(selTypeForfattere.value === 'forfatterGammel'){
        await forfatterColl.orderBy('alder', 'desc').get().then(snapshot => skrivResultatForfattere(snapshot));
    }
    else if(selTypeForfattere.value === 'forfatterNy'){
        await forfatterColl.orderBy('alder').get().then(snapshot => skrivResultatForfattere(snapshot));
    }
    else{
        await forfatterColl.orderBy('navn').get().then(snapshot => skrivResultatForfattere(snapshot));
    }
}

searchTypeForfattere.onchange = () => {
    var lowercase = searchTypeForfattere.value.toLowerCase();
    displayDB.innerHTML = '';
    loader.innerHTML = `
        <section id="loading">
            <div class="loader">Loading...</div>
        </section>
    `;
    if(searchTypeForfattere.value == ''){
        forfatterColl.orderBy('navn').get().then(snapshot => skrivResultatForfattere(snapshot));
    }
    else{
        forfatterColl.where('navn', '==', lowercase).get().then(snapshot => skrivResultatForfattere(snapshot));
    }
}

var skrivResultatForfattere = (snapshot) => {
    loader.innerHTML = '';
    snapshot.forEach(snap => lagHTMLForfattere(snap.id, snap.data()));
}
var lagHTMLForfattere = (id, info) => {
    displayDB.innerHTML += `
        <a href="forfattere.html?id=${id}" class="displaycontent">
        <img src="${info["bilde"]}" alt="Bilde av ${info.navn}">
        <h1>${info["navn"]}</h1>
        <p>Alder: ${info["alder"]}</p>
        <p>Antall bøker: ${info["antallboker"]}</p>
        </a>
    `;
}

var url = new URL(window.location.href);
var id = url.searchParams.get("id");

var visForfatter = async (id) => {
    var svar = await forfatterColl.doc(id).get();
    lagHTML(svar.data());
}

var lagHTML = (info) => {
    displayDB.innerHTML += `
            <section class="content-underside">
                <h1>${info.navn}</h1>
                <img src=${info.bilde} alt="Bilde av ${info.navn}">
                <p>Alder: ${info["alder"]}</p>
                <p>Antall bøker: ${info["antallboker"]}</p>
                <section class="content-underside-beskrivelse">
                <h1>Beskrivelse av forfatteren</h1>
                <p>${info["beskrivelse"]}</p>
                </section>
            </section>
        `;
}

visForfatter(id);