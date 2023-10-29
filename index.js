import { getCookie } from "./utils/cookie.js";
import { getProducts } from "./utils/httpReq.js";
import { beatHandler } from "./utils/iconBeat.js";
import { shortenText } from "./utils/stringFunc.js";

const category = document.querySelector("#category");
const ul = document.querySelector("ul");
const loginButton = document.querySelector("#login-button");
const dashboardButton = document.querySelector("#dashboard-button");
const loader = document.querySelector("#loader");
const productsSection = document.querySelector("#products");
const searchInput = document.querySelector("#search-box").children[0];
const searchButton = document.querySelector("#search-box").children[1];
const listItems = document.querySelector("ul").querySelectorAll("li");
let allProducts = null;
let filteredByCategory = false;
let filteredByCategoryProducts = null;

const loadDom = () => {
  checkLogin();
  showProducts();
};
const checkLogin = () => {
  if (getCookie()) {
    loginButton.style.display = "none";
    dashboardButton.style.display = "flex";
  } else if (!getCookie()) {
    loginButton.style.display = "flex";
    dashboardButton.style.display = "none";
  }
};
const showProducts = async () => {
  try {
    allProducts = await getProducts("products");
    loader.style.display = "none";
    createCard(allProducts);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
const showcategory = () => {
  if (allProducts) {
    if (ul.style.display === "none") {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  }
};
const searchHandler = () => {
  const searched = searchInput.value.toLowerCase().trim();
  const filteredProducts = allProducts.filter((item) =>
    item.title.toLowerCase().includes(searched)
  );
  if (filteredByCategory) {
    searchAndFilterHandler(searched);
  } else {
    if (!searched) {
      createCard(allProducts);
    } else {
      createCard(filteredProducts);
    }
  }
};
const searchAndFilterHandler = (searched) => {
  const filteredProducts = filteredByCategoryProducts.filter((item) =>
    item.title.toLowerCase().includes(searched)
  );
  console.log(filteredProducts);
  createCard(filteredProducts);
};
const filterHandler = (event) => {
  const filter = event.target.innerText.toLowerCase();
  listItems.forEach((item) => {
    item.className = "";
    if (item.innerText.toLowerCase() === filter) {
      item.className = "selected";
    }
  });
  if (filter === "all") {
    filteredByCategory = false;
    createCard(allProducts);
  } else {
    filteredByCategoryProducts = allProducts.filter(
      (item) => item.category.toLowerCase() === filter
    );
    createCard(filteredByCategoryProducts);
    filteredByCategory = true;
  }
};

const deleteHandler = (event) => {
  console.log(event);
  if (event.key === "Backspace" && searchInput.value === "") {
    createCard(allProducts);
    listItems.forEach((item) => {
      item.className = "";
    });
  }
};

const createCard = (products) => {
  productsSection.innerHTML = "";
  products.forEach((product) => {
    const { image, title, rating, price } = product;
    productsSection.innerHTML += `
      <div class="product-box"><div>
      <div id="rating"><span><i class="fa-solid fa-star"></i> ${
        rating.rate
      }</span><span><i class="fa-solid fa-user"></i> ${
      rating.count
    }</span></div>
      <img src="${image}" alt="${title}">
      <h5>${shortenText(title)}</h5></div>
      <div id="price">
      <span> ${price} $</span>
      <button onmouseover="beatHandler(event, 'in')" onmouseout="(beatHandler(event, 'out'))">Buy <i class="fa-solid fa-cart-shopping"></i></button>
      </div>
      </div>
      `;
  });
}

document.addEventListener("DOMContentLoaded", loadDom);
category.addEventListener("click", showcategory);
searchButton.addEventListener("click", searchHandler);
searchInput.addEventListener("keyup", deleteHandler);
listItems.forEach((item) => {
  item.addEventListener("click", filterHandler);
});
