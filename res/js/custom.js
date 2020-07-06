document.addEventListener('DOMContentLoaded', function (event) {
    var elem = document.querySelector('.grid');
    var iso = new Isotope(elem, {
        // options
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
    });
});
