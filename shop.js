import {
    db,
    collection,
    getDocs
} from "./firebase.js";
// ================= CART COUNT =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.innerText = cart.length;
}


// ===== Product Search =====

const searchInput = document.querySelector(".search-section input");
function getProducts() {
    return document.querySelectorAll(".product-card");
}

searchInput.addEventListener("keyup", function () {

    let searchValue = searchInput.value.toLowerCase();

    getProducts().forEach(function(product){


        let productName = product.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(searchValue)){

            product.style.display = "";

        }else{

            product.style.display = "none";

        }

    });

});
// ================= OPEN CART =================

const cartIcon = document.querySelector(".cart-icon");

if (cartIcon) {

    cartIcon.addEventListener("click", () => {

        window.location.href = "cart.html";

    });

}
// ================= PRODUCT POPUP =================

const popup = document.getElementById("productPopup");

const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupPrice = document.getElementById("popup-price");
const popupDescription = document.getElementById("popup-description");


const closePopup = document.querySelector(".close-popup");

let popupQuantity = 1;

const qty = document.getElementById("qty");
const plusBtn = document.getElementById("plusQty");
const minusBtn = document.getElementById("minusQty");

// ================= VIEW DETAILS (Works for Firebase Products) =================

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("view-btn")) return;

    e.preventDefault();

    const card = e.target.closest(".product-card");

    popupImage.src = card.querySelector("img").src;

    popupTitle.innerText = card.querySelector("h3").innerText;

    popupPrice.innerText = card.querySelector(".price").innerText;

    popupDescription.innerText =
card.querySelector(".product-description").innerText;

    popupQuantity = 1;
    qty.innerText = popupQuantity;

    popup.style.display = "flex";

});


closePopup.addEventListener("click", () => {

    popup.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === popup) {

        popup.style.display = "none";

    }

});

plusBtn.addEventListener("click", () => {

    popupQuantity++;

    qty.innerText = popupQuantity;

});

minusBtn.addEventListener("click", () => {

    if (popupQuantity > 1) {

        popupQuantity--;

        qty.innerText = popupQuantity;

    }

});
// ================= POPUP ADD TO CART =================

const popupAddBtn = document.getElementById("popupAddCart");

if (popupAddBtn) {

    popupAddBtn.addEventListener("click", () => {

        const product = {

            name: popupTitle.innerText,

            price: popupPrice.innerText,

            image: popupImage.src,

            quantity: popupQuantity

        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.name === product.name);

        if (existing) {

            existing.quantity += popupQuantity;

        } else {

            cart.push(product);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        const cartCount = document.getElementById("cart-count");

        if (cartCount) {
            cartCount.innerText = cart.length;
        }

        popupAddBtn.innerHTML = "✔ Added";

        setTimeout(() => {

            popupAddBtn.innerHTML = "🛒 Add to Cart";

        }, 1000);

    });

}

// ================= POPUP BUY NOW =================

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {

    buyNowBtn.addEventListener("click", () => {

        const product = {

            name: popupTitle.innerText,

            price: popupPrice.innerText,

            image: popupImage.src,

            quantity: popupQuantity

        };

        localStorage.setItem("cart", JSON.stringify([product]));

        window.location.href = "checkout.html";

    });

}
// ================= WISHLIST (Works for Firebase Products) =================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Page load par saved wishlist icons show karo
function updateWishlistIcons() {

    document.querySelectorAll(".product-card").forEach(card => {

        const button = card.querySelector(".wishlist-btn");
        const icon = button.querySelector("i");

        const name = card.querySelector("h3").innerText;

        if (wishlist.find(item => item.name === name)) {

            button.classList.add("active");
            icon.classList.replace("fa-regular", "fa-solid");

        } else {

            button.classList.remove("active");
            icon.classList.replace("fa-solid", "fa-regular");

        }

    });

}

document.addEventListener("click", (e) => {

    const button = e.target.closest(".wishlist-btn");

    if (!button) return;

    const card = button.closest(".product-card");

    const product = {

        name: card.querySelector("h3").innerText,
        price: card.querySelector(".price").innerText,
        image: card.querySelector("img").src

    };

    const index = wishlist.findIndex(item => item.name === product.name);

    if (index === -1) {

        wishlist.push(product);

    } else {

        wishlist.splice(index, 1);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistIcons();

});
// ================= LOAD PRODUCTS FROM FIREBASE =================

const productsContainer = document.getElementById("products-container");

async function loadProducts() {

    if (!productsContainer) return;

    productsContainer.innerHTML = "<p>Loading products...</p>";

    const querySnapshot = await getDocs(collection(db, "products"));

    productsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const product = doc.data();

        productsContainer.innerHTML += `

        <div class="product-card" data-category="${product.category}">

            <img src="${product.image}" alt="${product.name}">

            <button class="wishlist-btn">
                <i class="fa-regular fa-heart"></i>
            </button>

            <h3>${product.name}</h3>

           <p class="price">Rs. ${product.price}</p>

           <p class="product-description" style="display:none;">
          ${product.description}
               </p>

               <a href="#" class="view-btn">
           View Details
          </a>

        </div>

        `;

    });
    updateWishlistIcons();

}

loadProducts();
// ================= CATEGORY FILTER =================

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active button update
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        document.querySelectorAll(".product-card").forEach(card => {

            const productCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});