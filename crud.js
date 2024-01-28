const productName = document.getElementsByClassName("inputField")[0];
const productPrice = document.getElementsByClassName("inputField")[1];
const productDescription = document.querySelector("textarea");
const productImg = document.getElementById("img");
const addProductBtn = document.getElementById("addProduct");
const productsContainer = document.getElementsByClassName("products")[0];
const searchInput = document.getElementById("search");
const warning = document.getElementById("warning");
const up = document.getElementById("up");
const scrollUP = document.getElementById("scrollUP");
const uploadTitle = document.getElementById("upload");
const inputs = document.getElementsByClassName("input");
addProductBtn.addEventListener("click", addProduct);
let products = [];
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProducts(products);
}
checkScroll();
function addProduct() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productDescription.value ||
    !productImg.value
  ) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
    const img = productImg.files[0];
    const pName = productName.value;
    const pPrice = productPrice.value;
    const pDesc = productDescription.value;
    // img src
    const fr = new FileReader();
    fr.readAsDataURL(img);
    fr.addEventListener("load", () => {
      const ImgSrc = fr.result;
      const product = {
        pId: products.length == 0 ? 0 : products.length,
        pName,
        pPrice,
        pDesc,
        img: ImgSrc,
      };
      products.push(product);
      localStorage.setItem("productsList", JSON.stringify(products));
      displayProducts(products);
    });
    clearData();
    setTimeout(() => {
      goDown(document.body.scrollHeight);
    }, 100);
    checkScroll();
  }
}
function displayProducts(list) {
  if (list.length == 0) {
    productsContainer.innerHTML = ` <img src="./notfound.png" style="width:500px;height:500px;margin:auto">`;
  } else {
    let productsData = ``;
    for (let i = 0; i < list.length; i++) {
      productsData += `
     <div class="product">
        <div class="productContainer">
            <div class="head">
              <div class="title">
                <h3 id="productName">${list[i].pName}</h3>
                <p id="productPrice">${list[i].pPrice} EGP</p>
              </div>
               <img id="myImg" src="${list[i].img}" />
              </div>
            <div class="body">
             <p id="productDesc">${list[i].pDesc}</p>
             <button id="delete"  onclick="deleteProduct(${list[i].pId})">delete</button>
             <button id="edit" onclick="editProduct(${list[i].pId})">edit</button>
            </div>
        </div>
     </div>
`;
    }
    productsContainer.innerHTML = productsData;
  }
}
function deleteProduct(id) {
  const pIndex = products.findIndex(function (item) {
    return id == item.pId;
  });
  products.splice(pIndex, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayProducts(products);
  checkScroll();
}
function productSearch() {
  let searchWord = searchInput.value;
  let searchResult = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].pName.toLowerCase().includes(searchWord.toLowerCase())) {
      searchResult.push(products[i]);
      displayProducts(searchResult);
    } else if (searchResult.length == 0) {
      displayProducts([]);
    }
  }
}
let pIndex;
let pId;
let pHeight;
let editProductBtn = document.getElementById("editProduct");
function editProduct(pId) {
  pHeight = window.scrollY;
  pId = pId;
  pIndex = products.findIndex(function (item) {
    return pId == item.pId;
  });
  productName.value = products[pIndex].pName;
  productPrice.value = products[pIndex].pPrice;
  productDescription.value = products[pIndex].pDesc;
  productImg.files[0] = products[pIndex].img;
  goUp();
  editProductBtn.style.display = "block";
}
editProductBtn.addEventListener("click", submitEditProduct);
function submitEditProduct() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productDescription.value ||
    !productImg.value
  ) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
    const newImg = productImg.files[0];
    console.log(newImg);
    const pName = productName.value;
    const pPrice = productPrice.value;
    let pDesc = productDescription.value;
    // img src
    const fr = new FileReader();
    fr.readAsDataURL(newImg);
    fr.addEventListener("load", () => {
      const ImgSrc = fr.result;
      const updatedProduct = {
        pId: pId,
        pName,
        pPrice,
        pDesc,
        img: ImgSrc,
      };
      products[pIndex] = updatedProduct;
      localStorage.setItem("productsList", JSON.stringify(products));
      displayProducts(products);
    });
    editProductBtn.style.display = "none";
    clearData();
    goDown(pHeight);
  }
}
function clearData() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
}
function goUp() {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
function goDown(pHeight) {
  scrollTo({
    top: pHeight,
    left: 0,
    behavior: "smooth",
  });
}
up.addEventListener("click", goUp);
function checkScroll() {
  if (products.length > 4) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
}
let moon = document.getElementById("moon");
moon.addEventListener("click", dark);
function dark() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "gold";
  scrollUP.style.backgroundColor = "gold";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "3px solid blue";
  }
}
let sun = document.getElementById("sun");
sun.addEventListener("click", light);
function light() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  scrollUP.style.backgroundColor = "grey";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "1px solid #ced4da";
  }
}
