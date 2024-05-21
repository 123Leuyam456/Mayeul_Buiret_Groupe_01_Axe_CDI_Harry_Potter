document.addEventListener("DOMContentLoaded", function() {
    const formulaire = document.getElementById("connexion-form");
    formulaire.addEventListener("submit", async (event) => {
        event.preventDefault();
      
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
      
        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
          
            const result = await response.json();
            
            if (response.status === 200) {
                alert("Connexion réussi");
                const token = result.token;
                localStorage.setItem("token", token);
                

                window.location.href = "C:/Users/leuya/OneDrive/Bureau/Coding Projet/public/profile.html";
            } else {
                console.error("erreur d'identifiant:", result.message);

                alert("Mauvais identifiant ou mot de passe")
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    });
});