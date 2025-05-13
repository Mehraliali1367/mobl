const products = [
  {
    id: 1,
    name: "مدل مونیکا",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "راحتی",
    discount_price: 12,
    price: 35000000,
    del_price: 41000000,
    count_sales: 15,
  },
  {
    id: 2,
    name: "مدل سونامی",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "استیل",
    discount_price: 18,
    price: 52000000,
    del_price: 68000000,
    count_sales: 17,
  },
  {
    id: 3,
    name: "مدل سولماز",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "استیل",
    discount_price: 25,
    price: 25000000,
    del_price: 29000000,
    count_sales: 20,
  },
  {
    id: 4,
    name: "مدل مونیکا2",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "راحتی",
    discount_price: 12,
    price: 35000000,
    del_price: 41000000,
    count_sales: 15,
  },
  {
    id: 5,
    name: "2مدل سونامی",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "استیل",
    discount_price: 18,
    price: 52000000,
    del_price: 68000000,
    count_sales: 17,
  },
  {
    id: 6,
    name: "2مدل سولماز",
    description:
      "این طرح شامل چهار رنگ و پایه هایی از جنس چوب و با استادان با مهارت در کارگاه به مجهزترین دستگاه های روز صنعت مبل ساخته شده است امیدوارم تا مورد پسند شما قرارگیرد.",
    url: "./images/card.webp",
    category: "استیل",
    discount_price: 25,
    price: 25000000,
    del_price: 29000000,
    count_sales: 20,
  },
];

// Get DOM elements
const productsWrapper = document.getElementById("products-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainerProduct = document.getElementById(
  "filters-container-product"
);
const filtersContainerPrice = document.getElementById(
  "filters-container-price"
);
const radioButtons = document.querySelectorAll('input[name="radio"]');
const searchInput = document.getElementById("search");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cart_status = document.getElementById("cart_status");
const tooltiptext = document.querySelector(".tooltiptext");
// Initialize cart item count
let cartItemCount = 0;
let productsorted = [];

// Initialize products
const productElements = [];

// Loop over the products and create the product elements
window.onload = function () {
  loopCreateProduct(descendingPrice(products));
};
function loopCreateProduct(listproduct) {
  productsWrapper.innerHTML = "";
  listproduct.forEach((product) => {
    const productElement = createProductElement(product);
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);
  });
}

// Add filter event listeners
filtersContainerProduct.addEventListener("change", filterProducts);
filtersContainerPrice.addEventListener("change", filterProducts);

searchInput.addEventListener("input", filterProducts);

// Create product element
function createProductElement(product) {
  const productElement = document.createElement("div");

  productElement.className = "card-item";

  productElement.innerHTML = `<div class="cart-container-img">
              <img class="cart-img" src=${product.url} alt="" />
              <span class="card-discount">${product.discount_price.toLocaleString()} %</span>
            </div>
            <div class="product-profile">
              <div class="card-container-title">
                <a class="link-title" href="#">${product.name}</a>
              </div>
              <p class="card-info">${product.description}</p>
              <div class="card-sale">
                <p class="card-price">${product.price.toLocaleString()} <span>تومان</span></p>
                <button class="status-buy tooltip add-to-cart" id="cart-button"><span id="cart_status"><i class="bi bi-cart-check"></i></span><span class="tooltiptext">افزودن به سبد خرید</span></button>
                
                <p class="card-price">
                  <del> ${product.del_price.toLocaleString()}تومان</del>
                </p>
              </div>
            </div>`;

  productElement
    .querySelector("#cart-button")
    .addEventListener("click", updateCart);
  return productElement;
}

// Toggle add/remove from cart
function updateCart(e) {
  // const statusEl = ((e.target).parentElement).parentElement;
  const statusEl = e.currentTarget;

  if (statusEl.classList.contains("added")) {
    // Remove from cart
    statusEl.classList.remove("added");
    statusEl.innerHTML = "";
    statusEl.innerHTML =
      '<span id="cart_status"><i class="bi bi-cart-check"></i></span><span class="tooltiptext">افزودن به سبد خرید</span>';
    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add("added");
    statusEl.innerHTML = "";
    statusEl.innerHTML =
      '<span id="cart_status"><i class="bi bi-cart-x"></i></span><span class="tooltiptext">حذف از سبد خرید</span>';
    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// Filter products by search or checkbox
function filterProducts() {
  //custom sorted product
  productsorted = [];
  const radiocheckedTypes = Array.from(radioButtons)
    .filter((check) => check.checked)
    .map((check) => check.id);
  if (radiocheckedTypes[0] === "ascendingPrice") {
    productsorted = ascendingPrice(products);
    productElements.length=0
    loopCreateProduct(productsorted);
  }
  if (radiocheckedTypes[0] === "descendingPrice") {
    productsorted = descendingPrice(products);
    productElements.length=0
    loopCreateProduct(productsorted);
  }
  if (radiocheckedTypes[0] === "bestseller") {
    productsorted = bestseller(products);
    productElements.length=0
    loopCreateProduct(productsorted);
  }
  if (radiocheckedTypes[0] === "discountPrice") {
    productsorted = discountPrice(products);
    productElements.length=0
    loopCreateProduct(productsorted);
  }
  // Get search term
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Get checked categories
  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);
  // Loop over products and check for matches
  console.log(productElements);
  productElements.forEach((productElement, index) => {
    let sortListProduct = productsorted[index];
    // Check to see if product matches the search or checked items
    const matchesSearchTerm = sortListProduct.name.toLowerCase().includes(searchTerm);

    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(sortListProduct.category);
    const test = matchesSearchTerm && isInCheckedCategory;

    // Show or hide product based on matches
    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
  });
}

// sort Type
//بیشترین قیمت
function ascendingPrice(products) {
  let sorted = products.sort((p1, p2) =>
    p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
  );
  return sorted;
}
//کمترین قیمت
function descendingPrice(products) {
  let sorted = products.sort((p1, p2) =>
    p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
  );
  return sorted;
}
// بیشترین فروش
function bestseller(products) {
  let sorted = products.sort((p1, p2) =>
    p1.count_sales < p2.count_sales
      ? 1
      : p1.count_sales > p2.count_sales
      ? -1
      : 0
  );
  return sorted;
}
// بیشترین تخفیف
function discountPrice(products) {
  let sorted = products.sort((p1, p2) =>
    p1.discount_price < p2.discount_price
      ? 1
      : p1.discount_price > p2.discount_price
      ? -1
      : 0
  );
  return sorted;
}
