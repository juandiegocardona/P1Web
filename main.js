// URL
const urlInfo = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
fetch(urlInfo).then(res => res.json()).then(execute);

let a = [];

function execute (arrayFood) {
  let listCategories = document.getElementById("listCategories");
  arrayFood.forEach(foodCategorie => {
    let li = document.createElement("li");
    li.className = "nav-item ";
    let a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = foodCategorie.name;
    li.appendChild(a);
    listCategories.appendChild(li);
  });

  let divProductsCards = document.getElementById("products");
  let tableItems = document.getElementById("tableItems");
  let optionsItems = document.getElementById("optionsItems");
  let quantity = [];

  document.querySelectorAll(".nav-link").forEach(itemNav => {

    itemNav.addEventListener("click", (event) => {
      let category = event.target.text;
      let titleCategory = document.getElementById("titleCategory");
      titleCategory.textContent = category;
      let listCategory = arrayFood.find(elementFood => elementFood.name == category);

      while (divProductsCards.lastElementChild) {
        divProductsCards.removeChild(divProductsCards.lastElementChild);
      }

      listCategory.products.forEach(item => {
        let divCard = document.createElement("div");
        divCard.className = "card cardItem";
        divCard.setAttribute("style", "width: 18rem;");
        let imgCard = document.createElement("img");
        imgCard.className = "card-img-top imgFood";
        imgCard.setAttribute("src", item.image);
        imgCard.setAttribute("alt", item.name);
        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.textContent = item.name;
        let pDescription = document.createElement("p");
        pDescription.className = "card-text";
        pDescription.textContent = item.description;
        let pPrice = document.createElement("p");
        pPrice.className = "card-text";
        pPrice.setAttribute("id", "itemPrice");
        pPrice.textContent = "$" + item.price;
        let buttomAdd = document.createElement("a");
        buttomAdd.className = "btn btn-warning btn-item";
        buttomAdd.setAttribute("type", "button");
        buttomAdd.setAttribute("id", "button-" + category + "-" + item.name);
        buttomAdd.textContent = "Add to cart";
        buttomAdd.addEventListener("click", function() {
          countItems(item, quantity);
        });
        buttomAdd.addEventListener("click", function () {
          addItems(item);
        });
        divCard.appendChild(imgCard);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(pDescription);
        divCardBody.appendChild(pPrice);
        divCardBody.appendChild(buttomAdd);

        divCard.appendChild(divCardBody);

        divProductsCards.appendChild(divCard);
      });
      tableItems.innerHTML = "";
      optionsItems.innerHTML = "";
    });
  });
}