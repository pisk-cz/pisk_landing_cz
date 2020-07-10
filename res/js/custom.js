document.addEventListener('DOMContentLoaded', function (event) {
    var grid = document.getElementById('js-grid');
    var filterButtonGroup = document.getElementById('js-buttongroup');
    var tags = [];
    var iso = new Isotope(grid, {
        // options
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
    });
    function addTags(rowTags) {
        rowTagsArr = rowTags.split(',');
        rowTagsArr.forEach((element) => {
            if (tags.indexOf(element.trim()) == -1) {
                tags.push(element);
                var btn = document.createElement('BUTTON');
                var btnText = document.createTextNode(element);
                btn.setAttribute('data-filter', '.' + element);
                btn.appendChild(btnText);
                filterButtonGroup.appendChild(btn);
            }
        });
    }
    function filterEntries(event) {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        var res = event.target.getAttribute('data-filter');

        if (res !== undefined) {
            iso.arrange({
                filter: res,
            });
            document
                .getElementsByClassName('is-checked')[0]
                .classList.remove('is-checked');
            event.target.classList.add('is-checked');
        }
    }
    function createNewEntry(data) {
        var node = document.createElement('A');
        node.setAttribute('href', data.url);
        var img = document.createElement('div');
        img.classList.add('img');
        img.style.backgroundImage = "url('" + data.icon + "')";
        node.appendChild(img);
        var title = document.createElement('H5');
        var titleText = document.createTextNode(data.title);
        title.appendChild(titleText);
        node.appendChild(title);
        var subtitle = document.createElement('P');
        var subtitleText = document.createTextNode(data.subtitle);
        subtitle.appendChild(subtitleText);
        node.appendChild(subtitle);
        var tags = data.types.split(',');
        node.classList.add('grid-item');
        tags.forEach((elm) => {
            node.classList.add(elm);
        });
        grid.appendChild(node);
        iso.appended(node);
    }
    Papa.parse(
        'https://docs.google.com/spreadsheets/d/1ymM6CpLo_AORup4SV-yQTNNFabjqVNWSPUu8JnUqM5o/gviz/tq?tqx=out:csv&sheet=czech',
        {
            header: true,
            download: true,
            step: function (row) {
                if (row.data !== undefined) {
                    createNewEntry(row.data);
                    if (row.data.types !== undefined) addTags(row.data.types);
                }
            },
            complete: function () {
                iso.layout();
                filterButtonGroup.addEventListener('click', filterEntries);
                console.warn('complete');
            },
        }
    );
});
