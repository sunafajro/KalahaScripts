var sidebar = document.getElementById('flashcards-sidebar');
sidebar.innerText = '';
function changeCard(e){
    clearBorder();
    var target = e.target.id;
    var thumb  = document.getElementById(target);
    thumb.style.border = '1px solid #75caeb';
    var id     = target.split('-')[1];
    var img    = document.querySelector('#main-card');
    img.src    = './medium/' + id + '.jpg';
    img.alt    = 'Карточка ' + id;
}
function clearBorder() {
    for (var i = 1; i < 91; i++) {
    var thumb = document.getElementById('CardTumb-' + i);
    thumb.style.border = '1px solid #ffffff';
    }
}
for (var i = 1; i < 91; i++) {
    var img = document.createElement('img');
    img.id = 'CardTumb-' + i;
    img.src = './small/' + i + '.jpg';
    img.alt = 'Карточка ' + i;
    img.style.cursor = 'pointer';
    if (i === 1) {
    img.style.border = '1px solid #75caeb';
    } else {
    img.style.border = '1px solid #ffffff';
    }
    img.addEventListener('click', changeCard);
    sidebar.appendChild(img);
}