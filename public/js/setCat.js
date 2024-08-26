var catColorMap = {
    "TECH": "cat-color-tech",
    "ENT": "cat-color-ent",
    "LIFE": "cat-color-life",
}

$(document).ready(function () {
    $(".blogCat").each(function (i, cat) {
        var category = $(cat).text().trim();
        switch(category) {
            case 'TECH':
                $(cat).addClass('bg-cat-color-tech');
                break;
            case 'ENT':
                $(cat).addClass('bg-cat-color-ent');
                break;
            case 'LIFE':
                $(cat).addClass('bg-cat-color-life');
                break;
        }
    })
})