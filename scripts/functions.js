 let deleteItem = (id) => {
     fetch(`http://localhost:3000/Items/${id}`, {
         method: "DELETE"
     })
 }
 let editForm = (id) => {
     fetch(`http://localhost:3000/Items/${id}`)
         .then(res => res.json())
         .then(data => {
             const form = document.querySelector("#editform");
             form.elements.submitEdit.id = data.id;
             form.elements.edittitle.value = data.title;
             form.elements.editurl.value = data.image;
             form.elements.editprice.value = data.price;
             form.elements.editItemSize.value = data.size;
             form.elements.editabout.value = data.about;

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