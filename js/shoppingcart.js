var db = firebase.firestore();
var ShoppingCartColl = db.collection('shoppingcart');
var displayShoppingcart = document.querySelector('#displayShoppingcart');

//add to shoppingcart
var addBookShoppingCart = (navn, bilde, pris) => {
    var firebaseUser = firebase.auth().currentUser;
    if(firebaseUser){
        var uid = firebaseUser.uid;
        var timemsString = String(new Date().getTime());
        ShoppingCartColl.doc(timemsString).set({
            navn: navn,
            bilde: bilde,
            pris: Number(pris),
            uid: uid
        });
    }
}

//display shoppingcart
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid
      displayShoppingCart(uid)
    }
});
var displayShoppingCart = async (uid) => {
    ShoppingCartColl.where('uid', '==', uid).get().then(snapshot => skrivResultatShoppingCart(snapshot));
}

var skrivResultatShoppingCart = (snapshot) => {
    snapshot.forEach(snap => lagHTMLShoppingCart(snap.data()));
}

var totalPrisInput = document.querySelector('#totalPrisInput');
let totalPris = 0;

var lagHTMLShoppingCart = (info) => {
    displayShoppingcart.innerHTML += `
        <div class="shoppingcart-item">
            <img src="${info.bilde}" alt="Bilde av ${info.navn}">
            <div>
                <h3>${info.navn}</h3>
                <p>${info.pris}</p>                      
            </div>
        </div>
    `;
    totalPris += info.pris
    totalPrisInput.innerHTML = 'Totalpris: ' + totalPris;
}

//delete shoppingcart
var deleteBookShoppingCart = () => {
    var firebaseUser = firebase.auth().currentUser;
    if(firebaseUser){
        var uid = firebaseUser.uid;
        var deleteBooks = ShoppingCartColl.where('uid', '==', uid);
        deleteBooks.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
            });
        });
        setTimeout(function(){location.reload()}, 1000);
    }
    else{
        loadToast('Logg inn for å tømme handlekurv');
    }
}
