import Items from "./class.js";
import { getItems, editForm, deleteItem } from "./functions.js";
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => navMenu.classList.toggle("show"))

fetch("http://localhost:3000/Items")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => getItems(element));
        document.querySelectorAll("#delete").forEach(btn => {
        btn.addEventListener("click", e => {
                deleteItem(e.target.parentElement.id)
            })
        })
        document.querySelectorAll("#edit").forEach(btn => {
            btn.addEventListener("click", e => {
                console.log(e.target.parentElement.id)
                editForm(e.target.parentElement.id);
                let submitform = document.querySelector("#form")
                submitform.style.display = "none"
                let editform=document.querySelector("#editform")
                editform.style.display="block";
                window.location.href = "#editform";
            })

        })

    })
    .catch(err => console.log(err, "Įvyko klaida, patikrinkite duomenis"))

document.querySelector("#form").addEventListener("submit", e => {
    e.preventDefault();
    let title = e.target.elements.title.value;
    let image = e.target.elements.url.value;
    let price = e.target.elements.price.value;
    let size = e.target.elements.itemSize.value;
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

});
document.querySelector("#editform").addEventListener("submit", e => {
    e.preventDefault()
    const id = e.target.elements.submitEdit.id;
    let title = e.target.elements.edittitle.value;
    let image = e.target.elements.editurl.value;
    let price = e.target.elements.editprice.value;
    let size = e.target.elements.editItemSize.value;
    let about = e.target.elements.editabout.value;
    let items = new Items(title, image, price, size, about)
    console.log(id)
    fetch(`http://localhost:3000/Items/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
           "Accept": "application/json plain/text "
        },
        body: JSON.stringify(items)
    })
});
