// API Calling
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//all product in UI

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="${product.image}"></img>
      </div>
      <h3>${product.title}</h3>
      <p><strong>Category:</strong> ${product.category}</p>

      <p><strong>Ratings:</strong><i class="fas fa-star colored-icon"></i> <span class="fw-bolder text-secondary fs-4
      "> ${product.rating.rate}</span> / <strong><i class="fas fa-user-check"></i></strong> ${product.rating.count} peoples</p>
      
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-dark"><i class="fas fa-shopping-cart me-2"></i>Add to cart</button>

      <button id="details-btn" class="btn btn-warning data-bs-toggle="tooltip" type="button" data-bs-placement="right" title='${product.description}'">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// Product count

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
// All info input
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price 

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};


// set innerText

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};


// update delivery charge and total Tax

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};


//grandTotal update

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


//end end end 
