let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

function loadCart() {

    cartItems.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        total.innerText = "Rs. 0";

        return;

    }

    cart.forEach((item, index) => {

        let price = parseInt(item.price.replace("Rs.", "").trim());

        let quantity = item.quantity || 1;

        grandTotal += price * quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div>

                <h3>${item.name}</h3>

                <p>${item.price}</p>

                <div class="quantity">

                    <button onclick="decrease(${index})">−</button>

                    <span>${quantity}</span>

                    <button onclick="increase(${index})">+</button>

                </div>

                <button onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    total.innerText = "Rs. " + grandTotal;

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function increase(index) {

    if (!cart[index].quantity) {

        cart[index].quantity = 1;

    }

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function decrease(index) {

    if (!cart[index].quantity) {

        cart[index].quantity = 1;

    }

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

loadCart();
