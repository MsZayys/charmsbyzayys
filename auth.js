import {
  auth,
  onAuthStateChanged,
  signOut
} from "./firebase.js";

const loginLink = document.getElementById("login-link");
const userMenu = document.getElementById("user-menu");
const userName = document.getElementById("user-display-name");
const userAvatar = document.getElementById("user-avatar");
const userTrigger = document.getElementById("user-trigger");
const userDropdown = document.getElementById("user-dropdown");
const logoutBtn = document.getElementById("logout-btn");
const adminLink = document.getElementById("admin-link");

// ================= LOGIN STATE =================

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (loginLink) loginLink.style.display = "none";

        if (userMenu) userMenu.style.display = "block";

        const customerName =
            localStorage.getItem("customerName") ||
            user.displayName ||
            user.email.split("@")[0];

        if (userName) {
            userName.innerText = customerName;
        }

        if (userAvatar) {
            userAvatar.innerText = customerName.charAt(0).toUpperCase();
        }
        // ================= ADMIN CHECK =================

if (adminLink) {

    if (user.email === "mszayys@gmail.com") {

        adminLink.style.display = "flex";

    } else {

        adminLink.style.display = "none";

    }

}


    } else {

        if (loginLink) loginLink.style.display = "inline-flex";

        if (userMenu) userMenu.style.display = "none";

    }

});

// ================= DROPDOWN =================

if (userTrigger) {

    userTrigger.addEventListener("click", (e) => {

        e.stopPropagation();

        userDropdown.classList.toggle("show");

    });

}

document.addEventListener("click", () => {

    if (userDropdown) {
        userDropdown.classList.remove("show");
    }

});

// ================= LOGOUT =================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        alert("Logged Out Successfully!");

        window.location.href = "index.html";

    });

}
// ================= ACTIVE NAVBAR =================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav ul li a").forEach(link => {

    if(link.getAttribute("href") === currentPage){

        link.classList.add("active");

    }

});