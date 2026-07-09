import {
    auth,
    db,
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "./firebase.js";

const form = document.getElementById("review-form");
const reviewsList = document.getElementById("reviews-list");

// ================= LOAD REVIEWS =================

async function loadReviews() {

    reviewsList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "reviews"));

    snapshot.forEach((doc) => {

        const review = doc.data();

        reviewsList.innerHTML += `

        <div class="review-card">

            <h3>${review.name}</h3>

            <strong>${review.rating}</strong>

            <p>${review.message}</p>

        </div>

        `;

    });

}

loadReviews();

// ================= SUBMIT REVIEW =================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!auth.currentUser) {

        alert("Please login first to leave a review.");
        return;

    }

    await addDoc(collection(db, "reviews"), {

        name: document.getElementById("review-name").value,

        rating: document.getElementById("review-rating").value,

        message: document.getElementById("review-message").value,

        userEmail: auth.currentUser.email,

        createdAt: serverTimestamp()

    });

    alert("💜 Thank you for your review!");

    form.reset();

    loadReviews();

});