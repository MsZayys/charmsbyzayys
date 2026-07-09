import {
    auth,
    onAuthStateChanged
} from "./firebase.js";

const avatar = document.getElementById("profile-avatar");
const name = document.getElementById("profile-name");
const email = document.getElementById("profile-email");

onAuthStateChanged(auth,(user)=>{

    if(user){

        const customerName =
        localStorage.getItem("customerName")
        || user.displayName
        || user.email.split("@")[0];

        avatar.innerText =
        customerName.charAt(0).toUpperCase();

        name.innerText =
        customerName;

        email.innerText =
        user.email;

    }else{

        window.location.href="login.html";

    }

});
