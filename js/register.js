var db = firebase.firestore();
var bokColl = db.collection('boker');
var forfatterColl = db.collection('forfattere');

var bokForm = document.querySelector('#registrerBok');
var forfatterForm = document.querySelector('#registrerForfatter');

var bokNavn = document.querySelector('#bokNavn');
var bokUtgivelsesar = document.querySelector('#bokUtgivelsesar');
var bokForfatter = document.querySelector('#bokForfatter');
var bokBeskrivelse = document.querySelector('#bokBeskrivelse');
var bokPris = document.querySelector('#bokPris');
var bokBilde = document.querySelector('#bokBilde');

var forfatterNavn = document.querySelector('#forfatterNavn');
var forfatterAlder = document.querySelector('#forfatterAlder');
var forfatterAntBok = document.querySelector('#forfatterAntBok');
var forfatterBeskrivelse = document.querySelector('#forfatterBeskrivelse');
var forfatterBilde = document.querySelector('#forfatterBilde');

var slettBokForm = document.querySelector('#slettBok');
var slettForfatterForm = document.querySelector('#slettForfatter');
var slettBokNavn = document.querySelector('#slettBokNavn');
var slettForfatterNavn = document.querySelector('#slettForfatterNavn');

var sendForfatter = (event) => {
    event.preventDefault();
    var fnLowercase = forfatterNavn.value.toLowerCase();
    var fbLowercase = forfatterBilde.value.toLowerCase();
    var fbeLowercase = forfatterBeskrivelse.value.toLowerCase();
    var docRef = forfatterColl.doc(fnLowercase);
    docRef.get().then(function(doc){
        if(forfatterNavn.value === '' || forfatterAlder.value === '' || forfatterAntBok.value === '' || forfatterBilde.value ==='' || forfatterBeskrivelse.value === ''){
            loadToast('fyll inn alle feltene');
        }
        else{
            if(doc.exists){
                console.log('finnes');
                if (confirm('Forfatteren finnes, press "OK" for å oppdatere forfatter-profilen eller "CANCEL" for å avbryte')) {
                    forfatterColl.doc(fnLowercase).update({
                        alder: Number(forfatterAlder.value),
                        antallboker: Number(forfatterAntBok.value),
                        navn: fnLowercase,
                        beskrivelse: fbeLowercase,
                        bilde: fbLowercase
                    });
                    forfatterForm.reset();
                    console.log('forfatter oppdatert');
                    loadToast('forfatter oppdatert');
                } 
                else {
                    forfatterForm.reset();
                    console.log('kanselert');
                }
            }
            else{
                console.log('finnes ikke');
                forfatterColl.doc(fnLowercase).set({
                    alder: Number(forfatterAlder.value),
                    antallboker: Number(forfatterAntBok.value),
                    navn: fnLowercase,
                    beskrivelse: fbeLowercase,
                    bilde: fbLowercase
                });
                forfatterForm.reset();
                console.log('forfatter lagt til');
                loadToast('forfatter lagt til');
            }
        }
    });
}

var sendBok = (event) => {
    event.preventDefault();
    var bnLowercase = bokNavn.value.toLowerCase();
    var bfLowercase = bokForfatter.value.toLowerCase();
    var bbLowercase = bokBilde.value.toLowerCase();
    var bbeLowercase = bokBeskrivelse.value.toLowerCase();
    var docRef = bokColl.doc(bnLowercase);
    docRef.get().then(function(doc){
        if(bokNavn.value === '' || bokUtgivelsesar.value === '' || bokForfatter.value === '' || bokBilde.value === '' || bokBeskrivelse.value === ''){
            loadToast('fyll inn alle feltene');
        }
        else{
            if(doc.exists){
                console.log('finnes');
                if (confirm('Boken finnes, press "OK" for å oppdatere bok-profilen eller "CANCEL" for å avbryte')) {
                    bokColl.doc(bnLowercase).update({
                        forfatter: bfLowercase,
                        ua: Number(bokUtgivelsesar.value),
                        pris: Number(bokPris.value),
                        navn: bnLowercase,
                        beskrivelse: bbeLowercase,
                        bilde: bbLowercase
                    });
                    bokForm.reset();
                    console.log('bok oppdatert');
                    loadToast('bok oppdatert');
                } 
                else {
                    bokForm.reset();
                    console.log('kanselert');
                }
            }
            else{
                console.log('finnes ikke');
                bokColl.doc(bnLowercase).set({
                    forfatter: bfLowercase,
                    ua: Number(bokUtgivelsesar.value),
                    pris: Number(bokPris.value),
                    navn: bnLowercase,
                    beskrivelse: bbeLowercase,
                    bilde: bbLowercase
                });
                bokForm.reset();
                console.log('bok lagt til');
                loadToast('bok lagt til');
            }
        }
    });
}

var slettBok = (event) => {
    event.preventDefault();
    if (confirm("Er du sikker?")) {
        bokColl.doc(slettBokNavn.value).delete();
        slettBokForm.reset();
        loadToast('Bok slettet');
    } 
    else {
        slettBokForm.reset();
        loadToast('Kanselert');
    }
}

var slettForfatter = (event) => {
    event.preventDefault();
    if (confirm("Er du sikker?")) {
        forfatterColl.doc(slettForfatterNavn.value).delete();
        slettForfatterForm.reset();
        loadToast('Forfatter slettet');
    } 
    else {
        slettForfatterForm.reset();
        loadToast('Kanselert');
    }
}