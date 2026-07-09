import {
    auth,
    db,
    collection,
    addDoc,
    serverTimestamp
} from "./firebase.js";
// ================= LOAD SAVED ADDRESS =================

const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));

if (savedAddress) {

    document.getElementById("name").value = savedAddress.fullName;

    document.getElementById("phone").value = savedAddress.phone;

    document.getElementById("city").value = savedAddress.city;

    document.getElementById("address").value = savedAddress.address;

}


const form = document.getElementById("checkout-form");
const measurement = document.getElementById("measurement");
const customMeasurement = document.getElementById("customMeasurement");
const customLabel = document.getElementById("customLabel");

measurement.addEventListener("change", () => {

    if (measurement.value === "Custom") {

        customMeasurement.style.display = "block";
        customLabel.style.display = "block";

    } else {

        customMeasurement.style.display = "none";
        customLabel.style.display = "none";
        customMeasurement.value = "";

    }

});

emailjs.init("tCAvWJXUI5ZdmdDbK");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const payment = document.getElementById("payment").value;

    const measurement = document.getElementById("measurement").value;

const customMeasurement = document.getElementById("customMeasurement").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let products = "";
    let total = 0;

    cart.forEach(item => {

        const qty = item.quantity || 1;

        const price = parseInt(item.price.replace("Rs.", "").trim());

        total += price * qty;

        products += `${item.name} x${qty} - Rs. ${price * qty}\n`;

    });

    const orderId = "CBZ-" + Math.floor(1000 + Math.random() * 9000);

    const templateParams = {

        order_id: orderId,

        name: name,

        email: "mszayys@gmail.com",

        message: `Phone: ${phone}

Address: ${address}

City: ${city}

Payment: ${payment}
Measurement: ${measurement}

Custom Size: ${customMeasurement}

-----------------------

Products:

${products}

-----------------------

Total: Rs. ${total}`

    };

    emailjs.send(
        "service_4w88jvl",
        "template_8sjg94d",
        templateParams
    )

   .then(async function () {
    
    // ================= SAVE ORDER TO FIRESTORE =================

const currentUser = auth.currentUser;

await addDoc(collection(db, "orders"), {

    orderId: orderId,

    userId: currentUser.uid,

    userEmail: currentUser.email,

    customerName: name,

    phone: phone,

    address: address,

    city: city,

    payment: payment,
    measurement: measurement,

    customMeasurement: customMeasurement,
    products: cart,

    total: total,

    status: "🟡 Processing",

    createdAt: serverTimestamp()

});
    // ================= CLEAR CART =================

    localStorage.removeItem("cart");

    // ================= SUCCESS PAGE =================

    window.location.href = "success.html";

})


    .catch(function (error) {

    alert("Email Error: " + JSON.stringify(error));

    console.log(error);

});
});