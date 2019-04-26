let myLink = "http://mediakutka.com/srotas/wp-json/wp/v2/";
const template = document.querySelector("template").content;
const parent = document.querySelector("main");
const urlParms = new URLSearchParams(window.location.search);
const catID = urlParms.get("cat");
const catnav = document.querySelector("nav");


function loadData(link) {
    fetch(link + "band?_embed").then(e => e.json()).then(data => show(data));
}

function show(data) {
    data.forEach(object => {
        console.log(object);
        //clone
        const clone = template.cloneNode(true);
        //populate
        clone.querySelector("a").href = "details.html?myBandID=" + object.id;
        clone.querySelector("h1").textContent = object.title.rendered;
        clone.querySelector("h3.members").textContent = "Members: " + object.members;

        clone.querySelector("h3.genre").textContent = "Music Genre: " + object.music_genre;
        clone.querySelector("h3.fyear").textContent = "Founded: " + object.founded;
        if (object.disbanded == "0") {
            clone.querySelector("h3.dyear").classList.add("hide");
        } else {
            clone.querySelector("h3.dyear").textContent = "Disbanded: " + object.disbanded;
        }
        clone.querySelector("img").src = object._embedded["wp:featuredmedia"]['0'].source_url;
        //append DOMxd
        parent.appendChild(clone);

    });
}



function loadCats() {
    fetch(myLink + "categories?per_page=15").then(e => e.json()).then(buildCatMenu);
}

function loadByCat(cat) {
    fetch(myLink + "band?categories=" + cat + "&_embed").then(e => e.json()).then(show);
}

function loadAll() {
    fetch(myLink + "band?_embed").then(e => e.json()).then(show);
}

loadCats()
if (catID) {
    loadByCat(catID)
} else {
    loadAll()
}

function buildCatMenu(data) {
    data.forEach(cat => {
        const newA = document.createElement("a");
        newA.textContent = cat.name;
        newA.href = "?cat=" + cat.id;
        catnav.appendChild(newA);
    })
}

