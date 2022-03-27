import Items from "./class.js";
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show")
})

fetch("http://localhost:3000/Items")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => getItems(element))
        document.querySelectorAll("#edit").forEach(btn => {
            btn.addEventListener("click", e => {
                console.log(e.target.parentElement);
                editForm(e.target.parentElement.id);
                window.location.href = "#form";
            })

        })

    })




.catch(err => console.log(err, "Įvyko klaida, patikrinkite duomenis"))
document.querySelector("#form").addEventListener("submit", e => {
    e.preventDefault()
    let title = e.target.elements.title.value;
    let image = e.target.elements.url.value;
    let price = e.target.elements.price.value;
    let size = e.target.elements.size.value;
    let about = e.target.elements.about.value;
    let items = new Items(title, image, price, size, about)
    fetch("http://localhost:3000/Items", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json plain/text "
        },
        body: JSON.stringify(items)
    })

})
document.querySelector("#form").addEventListener("submit", e => {
    e.preventDefault();
    let itemDataId = e.target.elements.submit.id
    let title = e.target.elements.title.value;
    let image = e.target.elements.url.value;
    let price = e.target.elements.price.value;
    let size = e.target.elements.size.value;
    let about = e.target.elements.about.value;
    let items = new Items(title, image, price, size, about)
    fetch(`http://localhost:3000/Items/${itemDataId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json plain/text "
        },
        body: JSON.stringify(items)
    })

})
let editForm = (id) => {
    fetch(`http://localhost:3000/Items/${id}`)
        .then(res => res.json())
        .then(data => {
            const form = document.querySelector("#form");
            form.elements.submit.id = data.id;
            form.elements.title.value = data.title;
            form.elements.url.value = data.image;
            form.elements.price.value = data.price;
            form.elements.size.value = data.size;
            form.elements.about.value = data.about;
        })
}


let getItems = (item) => {
    document.querySelector("#items").innerHTML += `
    <div class=allItems id="${item.id}">
        <h3>${item.title}</h3>
        <img src="${item.image}"><br>
        <span>Kaina: ${item.price}€</span><br>
        <span>Dydis: ${item.size}. ${item.about}</span><br>
        <input type="submit" name="edit" id="edit" value="Redaguoti">
        <input type="submit" name="delete" id="delete" value="Trinti">
    </div>
    `
}