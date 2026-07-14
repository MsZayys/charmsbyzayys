import {
    db,
    collection,
    getDocs
} from "./firebase.js";

// ================= CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.innerText = cart.length;
}

const buttons = document.querySelectorAll(".product-card button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        const product = {

            name: card.querySelector("h3").innerText,

            price: card.querySelector(".price").innerText,

            image: card.querySelector("img").src,

            quantity: 1

        };

        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if (cartCount) {
            cartCount.innerText = cart.length;
        }

        button.innerText = "Added ✓";

        button.style.background = "#7d5a83";

        setTimeout(() => {

            button.innerText = "Add to Cart";

            button.style.background = "";

        }, 1000);

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

const detailButtons = document.querySelectorAll(".details-btn");

const closePopup = document.querySelector(".close-popup");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        popupImage.src = card.querySelector("img").src;

        popupTitle.innerText = card.querySelector("h3").innerText;

        popupPrice.innerText = card.querySelector(".price").innerText;

        popupDescription.innerText =
        "A beautifully handcrafted bracelet made with premium quality beads. Perfect for daily wear, gifts and adding elegance to your style.";
       popupQuantity = 1;
qty.innerText = popupQuantity;
        popup.style.display = "flex";

    });

});

if (closePopup) {

    closePopup.addEventListener("click", () => {

        popup.style.display = "none";

    });

}

if (popup) {

    window.addEventListener("click", (e) => {

        if (e.target === popup) {

            popup.style.display = "none";

        }

    });

}
// ===== Popup Quantity =====

let popupQuantity = 1;

const qty = document.getElementById("qty");
const plusBtn = document.getElementById("plusQty");
const minusBtn = document.getElementById("minusQty");

if (plusBtn) {

    plusBtn.addEventListener("click", () => {

        popupQuantity++;

        qty.innerText = popupQuantity;

    });

}

if (minusBtn) {

    minusBtn.addEventListener("click", () => {

        if (popupQuantity > 1) {

            popupQuantity--;

            qty.innerText = popupQuantity;

        }

    });

}
// ===== POPUP ADD TO CART =====

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

        if (cartCount) {
            cartCount.innerText = cart.length;
        }

        popupAddBtn.innerHTML = "✔ Added";

        setTimeout(() => {

            popupAddBtn.innerHTML = "🛒 Add to Cart";

        }, 1000);

    });

};


// ===== POPUP BUY NOW =====

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

// ================= FEATURED PRODUCTS (HOME PAGE) =================

const featuredProducts = document.getElementById("featured-products");

async function loadFeaturedProducts() {

    if (!featuredProducts) return;

    const querySnapshot = await getDocs(collection(db, "products"));

    featuredProducts.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const product = doc.data();

        featuredProducts.innerHTML += `

      <div class="product-card">

       <span class="badge ${product.status === "None" ? "hidden" : ""}">
    ${product.status || "New"}
</span>

       <div class="wishlist">
        <i class="fa-regular fa-heart"></i>
        </div>

       <img src="${product.image}" alt="${product.name}">

    <h3>${product.name}</h3>

    <div class="rating">
        ★★★★★
    </div>

    <p class="price">Rs. ${product.price}</p>

    <p class="product-description" style="display:none;">
        ${product.description}
    </p>

    <div class="product-buttons">
        <button class="details-btn">
            View Details
        </button>
    </div>

</div>

`;

    });
    initializeHomeProducts();

}

loadFeaturedProducts( );
function initializeHomeProducts() {

    const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        popupImage.src = card.querySelector("img").src;

        popupTitle.innerText = card.querySelector("h3").innerText;

        popupPrice.innerText = card.querySelector(".price").innerText;

        popupDescription.innerText =
            card.querySelector(".product-description")?.innerText ||
            "A beautifully handcrafted bracelet made with premium quality beads.";

        popupQuantity = 1;
        qty.innerText = popupQuantity;

        popup.style.display = "flex";

    });
const wishlistIcons = document.querySelectorAll(".wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlistIcons.forEach(icon => {

    const card = icon.closest(".product-card");

    const product = {
        name: card.querySelector("h3").innerText,
        price: card.querySelector(".price").innerText,
        image: card.querySelector("img").src
    };

    if (wishlist.find(item => item.name === product.name)) {

        icon.querySelector("i").classList.replace("fa-regular", "fa-solid");
        icon.querySelector("i").style.color = "#E6397E";

    }

    icon.addEventListener("click", () => {

        const index = wishlist.findIndex(item => item.name === product.name);

        if (index === -1) {

            wishlist.push(product);

            icon.querySelector("i").classList.replace("fa-regular", "fa-solid");
            icon.querySelector("i").style.color = "#E6397E";

        } else {

            wishlist.splice(index, 1);

            icon.querySelector("i").classList.replace("fa-solid", "fa-regular");
            icon.querySelector("i").style.color = "";

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

    });

});
});

}
// ================= ACTIVE NAVBAR =================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav ul li a").forEach(link => {

    if(link.getAttribute("href") === currentPage){

        link.classList.add("active");

    }

});
// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");

if (menuToggle) {

    const navMenu = document.querySelector("nav ul");
    const navIcons = document.querySelector(".icons");

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        navIcons.classList.toggle("active");

    });

}
// ================= CLOSE MENU AFTER CLICK =================

document.querySelectorAll("nav ul li a").forEach(link => {

    link.addEventListener("click", () => {

        const navMenu = document.querySelector("nav ul");
        const navIcons = document.querySelector(".icons");

        if(navMenu){
            navMenu.classList.remove("active");
        }

        if(navIcons){
            navIcons.classList.remove("active");
        }

    });

});

// ===== PAGE LOADER =====

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){
        loader.style.display = "none";
    }

});