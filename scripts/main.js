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
    console.log(items)
    fetch("http://localhost:3000/Items", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json plain/text "
        },
        body: JSON.stringify(items)
    })

})

let getItems = (item) => {
    document.querySelector("#items").innerHTML += `
    <div class=allItems>
        <h3>${item.title}</h3>
        <img src="${item.image}"><br>
        <span>Kaina: ${item.price}€</span><br>
        <span>Dydis: ${item.size}. ${item.about}</span>
    </div>
    `
}