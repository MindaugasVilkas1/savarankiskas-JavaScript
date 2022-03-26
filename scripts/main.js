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





let getItems = (item) => {
    document.querySelector("#items").innerHTML += `
    <div>
        <h3>${item.title}</h3>
        <img src="${item.image}"><br>
        <span>Kaina: ${item.price}</span><br>
        <span>Dydis: ${item.size}. ${item.about}</span>
    </div>
    `
}