emailjs.init({
    publicKey: "tCAvWJXUI5ZdmdDbK",
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    const templateParams = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send(
        "service_4w88jvl",
        "template_sodj0pl",
        templateParams
    )

    .then(function () {

        alert("💜 Thank you! Your message has been sent successfully.");
        form.reset();

    })

    .catch(function (error) {

        console.log(error);
        alert("Error: " + JSON.stringify(error));

    });

});