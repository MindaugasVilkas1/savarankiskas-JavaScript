 let deleteItem = (id) => {
     fetch(`http://localhost:3000/Items/${id}`, {
         method: "DELETE"
     })
 }
 let editForm = (id) => {
     fetch(`http://localhost:3000/Items/${id}`)
         .then(res => res.json())
         .then(data => {
             const form = document.querySelector("#form");
             form.elements.submitEdit.id = data.id;
             form.elements.title.value = data.title;
             form.elements.url.value = data.image;
             form.elements.price.value = data.price;
             form.elements.itemSize.value = data.size;
             form.elements.about.value = data.about;

         })
 }

 let getItems = (item) => {
     document.querySelector("#items").innerHTML += `
    <div class=allItems id="${item.id}">
        <h3>${item.title}</h3>
        <img src="${item.image}"><br>
        <span>Kaina: ${item.price}€</span><br>
        <span>Dydis: ${item.size} ${item.about}</span><br>
        <input type="submit" name="edit" id="edit" value="Redaguoti Skelbimą">
        <input type="submit" name="delete" id="delete" value="Trinti">
    </div>
    `

 }
 export { getItems, editForm, deleteItem }