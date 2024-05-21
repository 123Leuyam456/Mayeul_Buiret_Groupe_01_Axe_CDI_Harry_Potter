document.addEventListener("DOMContentLoaded", function() {
    const formulaire = document.getElementById("inscription-form");
    formulaire.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        try {
            const creation = await fetch("http://127.0.0.1:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            const result = await creation.json();

            if (creation.status === 201) {
                alert("Account created");
                window.location.href = "C:/Users/leuya/OneDrive/Bureau/Coding Projet/public/login.html";
            } else {
                console.error("Error : ", result.message);

            }
        } catch (error) {
            console.error("Error", error);

        }
    });
});
const magicButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

magicButton.addEventListener("click", toggleNav);

// Permet de déverrouiller/montrer le menu nav
function toggleNav() {
  magicButton.classList.toggle("active");
  navigation.classList.toggle("active");
}