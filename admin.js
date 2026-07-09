import {
    auth,
    db,
    onAuthStateChanged,
    collection,
    getDocs,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
    serverTimestamp
} from "./firebase.js";

const adminName = document.getElementById("admin-name");
const ordersContainer = document.getElementById("orders-container");
const productsList = document.getElementById("products-list");
const editBox = document.getElementById("edit-product-box");

const editForm = document.getElementById("edit-product-form");

let editingProductId = "";
onAuthStateChanged(auth, (user) => {

    // Login nahi hai
    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // Sirf admin ko allow karo
    if (user.email !== "mszayys@gmail.com") {
        alert("Access Denied!");
        window.location.href = "index.html";
        return;
    }

    

    if (adminName) {
        adminName.innerHTML = `
            <h2 style="text-align:center;color:#7d5a83;margin-top:20px;">
                Welcome Admin 💜
            </h2>

            <p style="text-align:center;font-size:18px;">
                ${user.email}
            </p>
        `;
    }
    loadOrders();
    loadProducts();

});
// ================= LOAD ORDERS =================

async function loadOrders() {

    ordersContainer.innerHTML = "<p style='text-align:center;'>Loading Orders...</p>";
    ordersContainer.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "orders"));

    ordersContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const order = doc.data();

        ordersContainer.innerHTML += `

        <div class="order-card">

            <h3>📦 ${order.orderId}</h3>

            <p><strong>Customer:</strong> ${order.customerName}</p>

            <p><strong>Phone:</strong> ${order.phone}</p>

            <p><strong>City:</strong> ${order.city}</p>

            <p><strong>Payment:</strong> ${order.payment}</p>

            <p><strong>Total:</strong> Rs. ${order.total}</p>

            <p><strong>Status:</strong> ${order.status}</p>

<div style="margin-top:15px;">

<button
class="status-btn shipped-btn"
onclick="updateStatus('${doc.id}','🚚 Shipped')">
🚚 Shipped
</button>

<button
class="status-btn delivered-btn"
onclick="updateStatus('${doc.id}','✅ Delivered')">
✅ Delivered
</button>

</div>

        </div>

        `;

    });

}
window.updateStatus = updateStatus;

async function updateStatus(orderDocId, newStatus) {

    try {

        await updateDoc(doc(db, "orders", orderDocId), {
            status: newStatus
        });

        alert("Status Updated Successfully 💜");

        loadOrders();

    } catch (error) {

        console.log(error);

        alert("Failed to update status!");

    }

}
// ================= ADD PRODUCT =================

const productForm = document.getElementById("product-form");

if (productForm) {

    productForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const image = document.getElementById("product-image").value;
        const category = document.getElementById("product-category").value;
        const description = document.getElementById("product-description").value;

        try {

            await addDoc(collection(db, "products"), {

                name,
                price,
                image,
                category,
                description,
                createdAt: serverTimestamp()

            });

            alert("✅ Product Added Successfully!");

            productForm.reset();

        } catch (error) {

            console.log(error);
            alert(error.message);

        }

    });

}
// ================= LOAD PRODUCTS =================

async function loadProducts() {

    if (!productsList) return;

    productsList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((productDoc) => {

        const product = productDoc.data();

        productsList.innerHTML += `
        
        <div class="product-card-admin">

            <img src="${product.image}" width="70">

            <div>

                <h3>${product.name}</h3>

                <p>Rs. ${product.price}</p>

                <p>${product.category}</p>

            </div>

            <button
                class="delete-product-btn"
                onclick="deleteProduct('${productDoc.id}')">

                🗑 Delete

            </button>

        </div>

        `;

    });

}

window.deleteProduct = deleteProduct;

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {

        await deleteDoc(doc(db, "products", id));

        alert("✅ Product Deleted!");

        loadProducts();

    } catch (error) {

        console.log(error);

        alert("Failed to delete product.");

    }

}

