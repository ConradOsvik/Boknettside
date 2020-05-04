function burgerChange(x) { //nav x change
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