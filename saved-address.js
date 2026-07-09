const form = document.getElementById("addressForm");

// Agar pehle address save hai to form me dikhao
const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));

if (savedAddress) {

    document.getElementById("fullName").value = savedAddress.fullName;
    document.getElementById("phone").value = savedAddress.phone;
    document.getElementById("city").value = savedAddress.city;
    document.getElementById("address").value = savedAddress.address;

}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const addressData = {

        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value

    };

    localStorage.setItem("savedAddress", JSON.stringify(addressData));

    alert("✅ Address saved successfully!");

});