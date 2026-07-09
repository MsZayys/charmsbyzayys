import {
  auth,
  createUserWithEmailAndPassword
} from "./firebase.js";

const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {

    await createUserWithEmailAndPassword(auth, email, password);

    // Customer name save
    localStorage.setItem("customerName", name);

    alert("🎉 Account Created Successfully!");

    // Home page par redirect
    window.location.href = "index.html";

  } catch (error) {

    console.log(error);

    alert(error.code + "\n" + error.message);

  }

});