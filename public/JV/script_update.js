const updateCompte = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const userData = {
    name,
    email,
    password,
  };
  await updateProfile(userData);
};

const updateProfile = async (userData) => {
  const token = localStorage.getItem("token");

  console.log(token);
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 401 || response.status === 403) {
      window.location.href = "/login.html";
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    alert("Profile updated successfully!");

  } catch (error) {
    console.error("An error occurred while updating profile:", error);
    alert("An error occurred while updating profile. Please try again later.");
  }
};

const editProfileForm = document.getElementById("connexion-form");
editProfileForm.addEventListener("submit", updateCompte);


const magicButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

magicButton.addEventListener("click", toggleNav);

// Permet de déverrouiller/montrer le menu nav
function toggleNav() {
  magicButton.classList.toggle("active");
  navigation.classList.toggle("active");
}