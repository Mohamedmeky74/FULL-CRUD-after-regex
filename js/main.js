
var productsList;

localStorage.getItem("productsList") == null
  ? (productsList = [])
  : (productsList = JSON.parse(localStorage.getItem("productsList")));

displayProduct(productsList);

var counter;
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var svaeBtn = document.getElementById("svaeBtn");

function localStorageUpdate() {
  localStorage.setItem("productsList", JSON.stringify(productsList));
}
function addProduct() {
  if (validateName() ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      categ: productCategory.value,
      desc: productDesc.value,
    };

    productsList.push(product);
    localStorageUpdate();
    displayProduct(productsList);
    validateName();
    clearInputs();
    svaeBtn.classList.add("d-none");
  } 
}
function displayProduct(data) {
  var cartona = "";
  for (var i = 0; i < data.length; i++) {
    cartona += `  <tr>
  <td>${i + 1}</td>
  <td>${data[i].newName ? data[i].newName : data[i].name}</td>
  <td>${data[i].price}</td>
  <td>${data[i].categ}</td>
  <td>${data[i].desc}</td>
  <td><button  onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
  <td><button onclick=" deleteProduct(${i})"   class="btn btn-danger" >Delete</button></td>
</tr>`;
  }
  document.getElementById("data").innerHTML = cartona;
}
function deleteProduct(index) {
  productsList.splice(index, 1);
  localStorageUpdate();
  console.log(productsList);
  displayProduct(productsList);
}
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
function updateProduct(index) {
  productName.value = productsList[index].name;
  productPrice.value = productsList[index].price;
  productCategory.value = productsList[index].categ;
  productDesc.value = productsList[index].desc;
  counter = index;
  svaeBtn.classList.remove("d-none");
  console.log(counter);
}
function savaUpdate() {
  if (validateName()) {
    productsList[counter].name = productName.value;
    productsList[counter].price = productPrice.value;
    productsList[counter].categ = productCategory.value;
    productsList[counter].desc = productDesc.value;

    localStorageUpdate();
    displayProduct(productsList);
    console.log(productsList);
    svaeBtn.classList.add("d-none");

    clearInputs();
  }
}
function searchProduct(data) {
  var newProductsList = [];

  for (var i = 0; i < productsList.length; i++) {
    var newData = data.toLowerCase();
    if (productsList[i].name.toLowerCase().includes(newData)) {
      productsList[i].newName = productsList[i].name
        .toLowerCase()
        .replaceAll(newData, `<span class = "text-warning">${newData}</span>`);

      newProductsList.push(productsList[i]);
    }

    displayProduct(newProductsList);
  }
}

function validateName() {
  var regex = /^[a-z]{5}$/;

  if (regex.test(productName.value)) {
    productName.style.border= "none"
    document.getElementById("invalidName").classList.add("d-none")
    return true;
  } else {

    productName.style.border= "dotted 5px red"
    document.getElementById("invalidName").classList.remove("d-none")
    return false;
  }
}
