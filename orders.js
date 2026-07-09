import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    query,
    where
} from "./firebase.js";

// ================= CART COUNT =================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.innerText = cart.length;
}

const cartIcon = document.querySelector(".cart-icon");

if (cartIcon) {
    cartIcon.addEventListener("click", () => {
        window.location.href = "cart.html";
    });
}

// ================= ORDERS =================

const ordersContainer = document.getElementById("orders-container");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        ordersContainer.innerHTML = `
            <h2 style="text-align:center;color:#777;">
                Please login to view your orders.
            </h2>
        `;
        return;
    }

    try {

        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
        );

        console.log("Logged in UID:", user.uid);

        const querySnapshot = await getDocs(q);

        console.log("Orders Found:", querySnapshot.size);

        ordersContainer.innerHTML = "";

        if (querySnapshot.empty) {
            ordersContainer.innerHTML = `
                <h2 style="text-align:center;color:#777;">
                    You haven't placed any orders yet. 📦
                </h2>
            `;
            return;
        }

        querySnapshot.forEach((doc) => {

            const order = doc.data();

            let productsHTML = "";

            order.products.forEach(product => {

                productsHTML += `
                    <div style="display:flex;align-items:center;gap:12px;margin:12px 0;">

                        <img src="${product.image}"
                        style="width:70px;height:70px;border-radius:12px;object-fit:cover;">

                        <div>
                            <h4>${product.name}</h4>
                            <p>${product.price}</p>
                            <p>Qty: ${product.quantity || 1}</p>
                        </div>

                    </div>
                `;

            });

            ordersContainer.innerHTML += `
                <div class="order-card">

                    <h3>📦 ${order.orderId}</h3>

                    ${productsHTML}

                    <p><strong>City:</strong> ${order.city}</p>

                    <p><strong>Payment:</strong> ${order.payment}</p>

                    <p><strong>Total:</strong> Rs. ${order.total}</p>

                    <p><strong>Status:</strong> ${order.status}</p>

                </div>
            `;

        });

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

});
