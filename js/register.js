var db = firebase.firestore();
var bokColl = db.collection('boker');
var forfatterColl = db.collection('forfattere');

var bokForm = document.querySelector('#registrerBok');
var forfatterForm = document.querySelector('#registrerForfatter');

var bokNavn = document.querySelector('#bokNavn');
var bokUtgivelsesar = document.querySelector('#bokUtgivelsesar');
var bokForfatter = document.querySelector('#bokForfatter');
var bokBilde = document.querySelector('#bokBilde');

var forfatterNavn = document.querySelector('#forfatterNavn');
var forfatterAlder = document.querySelector('#forfatterAlder');
var forfatterAntBok = document.querySelector('#forfatterAntBok');
var forfatterBilde = document.querySelector('#forfatterBilde');

var sendForfatter = (event) => {
    event.preventDefault();
    var fnLowercase = forfatterNavn.value.toLowerCase();
    var fbLowercase = forfatterBilde.value.toLowerCase();
    var docRef = forfatterColl.doc(fnLowercase);
    docRef.get().then(function(doc){
        if(forfatterNavn.value === '' || forfatterAlder.value === '' || forfatterAntBok.value === '' || forfatterBilde.value ===''){
            alert('fyll inn alle feltene');
        }
        else{
            if(doc.exists){
                console.log('finnes');
                alert('Denne forfatteren finnes allerede i databasen');
            }
            else{
                console.log('finnes ikke');
                forfatterColl.doc(fnLowercase).set({
                    alder: Number(forfatterAlder.value),
                    antallboker: Number(forfatterAntBok.value),
                    navn: fnLowercase,
                    bilde: fbLowercase
                });
                forfatterForm.reset();
                console.log('forfatter lagt til');
            }
        }
    });
}

var sendBok = (event) => {
    event.preventDefault();
    var bnLowercase = bokNavn.value.toLowerCase();
    var bfLowercase = bokForfatter.value.toLowerCase();
    var bbLowercase = bokBilde.value.toLowerCase();
    var docRef = bokColl.doc(bnLowercase);
    docRef.get().then(function(doc){
        if(bokNavn.value === '' || bokUtgivelsesar.value === '' || bokForfatter.value === '' || bokBilde.value === ''){
            alert('fyll inn alle feltene');
        }
        else{
            if(doc.exists){
                console.log('finnes');
                alert('Denne boken finnes allerede i databasen');
            }
            else{
                console.log('finnes ikke');
                bokColl.doc(bnLowercase).set({
                    forfatter: bfLowercase,
                    ua: Number(bokUtgivelsesar.value),
                    navn: bnLowercase,
                    bilde: bbLowercase
                });
                bokForm.reset();
                console.log('bok lagt til');
            }
        }
    });
}