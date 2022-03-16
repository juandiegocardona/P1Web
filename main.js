// URL
const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
fetch(url).then(res => res.json()).then(execute);

//Funcionalidad 1
let selectedItems = [];
function execute (arrayFood) {
  let categories = document.getElementById("listCategories");
  arrayFood.forEach(category => {
    let li = document.createElement("li");
    li.className = "nav-item ";
    let a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = category.name;
    li.appendChild(a);
    categories.appendChild(li);
  });

  let products = document.getElementById("products");
  let tableItems = document.getElementById("tableItems");
  let optionsItems = document.getElementById("optionsItems");
  let quantity = [];

  document.querySelectorAll(".nav-link").forEach(itemNav => {
    itemNav.addEventListener("click", (event) => {
      let category = event.target.text;
      let title = document.getElementById("titleCategory");
      title.textContent = category;
      let listCategory = arrayFood.find(elementFood => elementFood.name == category);
      while (products.lastElementChild) {
        products.removeChild(products.lastElementChild);
      }

      listCategory.products.forEach(item => {
        let card = document.createElement("div");
        card.className = "card cardItem";
        card.setAttribute("style", "width: 18rem;");
        let image = document.createElement("img");
        image.className = "card-img-top imgFood";
        image.setAttribute("src", item.image);
        image.setAttribute("alt", item.name);
        let body = document.createElement("div");
        body.className = "card-body";
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.textContent = item.name;
        let description = document.createElement("p");
        description.className = "card-text";
        description.textContent = item.description;
        let price = document.createElement("p");
        price.className = "card-text";
        price.setAttribute("id", "itemPrice");
        price.textContent = "$" + item.price;
        let addButton = document.createElement("a");
        addButton.className = "btn btn-yellow";
        addButton.setAttribute("type", "button");
        addButton.setAttribute("id", "button-" + category + "-" + item.name);
        addButton.textContent = "Add to cart";

        //Funcionalidad 2
        addButton.addEventListener("click", function() {
          countItems(item, quantity);
        });
        addButton.addEventListener("click", function () {
          addItems(item);
        });
        card.appendChild(image);
        body.appendChild(h5);
        body.appendChild(description);
        body.appendChild(price);
        body.appendChild(addButton);
        card.appendChild(body);
        products.appendChild(card);
      });
      tableItems.innerHTML = "";
      optionsItems.innerHTML = "";
    });
  });


  //Funcionalidad 3
  let tableHead = false;
  document.getElementById("carItems").addEventListener("click", function () {
    tableItems.innerHTML = "";
    optionsItems.innerHTML = "";
    while (products.lastElementChild) {
      products.removeChild(products.lastElementChild);
    }
    let title = document.getElementById("titleCategory");
    title.textContent = "ORDER DETAIL";
    let table = document.createElement("table");
    table.className ="table table-striped";
    if(tableHead == false)
    {
      let tHead = document.createElement("thead");
      let trHead = document.createElement("tr");
      let nameColumns = ["Item", "Qty.", "Description", "Unit Price", "Amount", "Modify"];
      for (let i = 0; i < nameColumns.length; i++) {
        let trHd = document.createElement("th");
        trHd.textContent = nameColumns[i];
        trHd.setAttribute("scope", "col");
        trHead.appendChild(trHd);
      }
      tHead.appendChild(trHead);
      table.appendChild(tHead);
      tableHead = true;
    }

    let tBody = document.createElement("tbody");
    let spanTotal;
    let index = 0;
    let total = 0;
    quantity.forEach(element => {
      let tr = document.createElement("tr");
      let thIndex = document.createElement("th");
      thIndex.setAttribute("scope", "col");
      thIndex.textContent = index;
      let tdQty = document.createElement("td");
      tdQty.textContent = element.quantity;
      let tdDescription = document.createElement("td");
      tdDescription.textContent = element.food;
      let tdUnitPrice = document.createElement("td");
      tdUnitPrice.textContent = element.unitPrice;
      let tdAmount = document.createElement("td");
      tdAmount.textContent = element.amount;
      let tdButtons = document.createElement("td");

//Funcinalidad 4

      let plusButton = document.createElement("a");
      plusButton.className = "btn btn-yellow";
      plusButton.textContent = "+";
      plusButton.addEventListener("click", function() {
        tdQty.textContent = ++element.quantity;
        tdAmount.textContent = element.quantity * element.unitPrice;
        element.amount = element.quantity * element.unitPrice;
        spanTotal.textContent = "Total $" + updateAddToTotal(quantity);
      });

      let minusButton = document.createElement("a");
      minusButton.className = "btn  btn-yellow";
      minusButton.textContent = "-";
      minusButton.addEventListener("click", function() {
        tdQty.textContent = --element.quantity;
        if(tdQty.textContent !== 0)
        {
          tdAmount.textContent = element.quantity * element.unitPrice;
          element.amount = element.quantity * element.unitPrice;
          spanTotal.textContent = "Total $" + updateSubstactToTotal(quantity);
        }
        if(tdQty.textContent === "0")
        {
          tr.innerHTML = "";
          substractItems();
        }
      });
      tr.appendChild(thIndex);
      tr.appendChild(tdQty);
      tr.appendChild(tdDescription);
      tr.appendChild(tdUnitPrice);
      tr.appendChild(tdAmount);

      tdButtons.appendChild(plusButton);
      tdButtons.appendChild(minusButton);
      tr.appendChild(tdButtons);
      tBody.appendChild(tr);
      total += element.amount;
      index++;
    });

    
    let row = document.createElement("div");
    row.className = "row";
    let span = document.createElement("div");
    span.className = "col";
    spanTotal = document.createElement("span");
    spanTotal.textContent = "Total: $" + total;
    spanTotal.setAttribute("id", "spanTotalItems");
    span.appendChild(spanTotal);
    let buttons = document.createElement("div");
    buttons.className = "col d-flex justify-content-end";
    buttons.setAttribute("id", "divButtoms");
    
    // Funcionalidad 5
    
    let cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-cancel";
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("data-target", "#cancelModal");
    cancelButton.setAttribute("data-toggle", "modal");
    
    // Funcionalidad 6
    
    let confirmButton = document.createElement("a");
    confirmButton.className = "btn btn-confirm";
    confirmButton.textContent = "Confirm order";
    confirmButton.addEventListener("click", function () {
      let i = 1;
      let order = [];
      quantity.forEach(element => {
        let objectOrder = {};
        objectOrder["item"] = i;
        objectOrder["quantity"] = element.quantity;
        objectOrder["description"] = element.food;
        objectOrder["unitPrice"] = element.unitPrice;
        order.push(objectOrder);
      });
      console.log(order);
    });

    buttons.appendChild(cancelButton);
    buttons.appendChild(confirmButton);

    row.appendChild(span);
    row.appendChild(buttons);
        
    table.appendChild(tBody);
    tableItems.appendChild(table);
    optionsItems.appendChild(row);

    document.getElementById("buttonYes").addEventListener("click", function() {
      tableItems.innerHTML = "";
      optionsItems.innerHTML = "";
      quantity = [];
      tableHead = false;
      clearCar();
    });
  });
}

//Funcionalidad 2
let numItems = 0;
let itemCar = document.getElementById("itemsAdd");
function clearCar () {
  itemCar.textContent = (0) + " items";
  numItems = 0;
}
function countItems(item, quantity) {
  itemCar.textContent = (numItems + 1) + " items";
  let encontrado = quantity.find(elementFood =>  elementFood.food == item.name);
  if(encontrado === undefined)
  {
    let event = {};
    event["food"] = item.name;
    event["quantity"] = 1;
    event["unitPrice"] = item.price;
    event["amount"] = item.price;
    quantity.push(event);
  } else {
    encontrado.quantity ++;
    encontrado.amount = encontrado.quantity * encontrado.unitPrice;
  }
  numItems = numItems + 1;
}
function addItems(item) {
  selectedItems.push(item);
}
function updateAddToTotal(quantity) {
  let total = 0;
  quantity.forEach(element => {
    total += element.amount;
  });
  return total;
}
function substractItems() {
  itemCar.textContent = (numItems - 1) + " items";
}
function updateSubstactToTotal(quantity) {
  let total = 0;
  quantity.forEach(element => {
    total -= (-element.amount);
  });
  return total;
}
