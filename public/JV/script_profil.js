const title = document.getElementById("userName");
const email = document.getElementById("userEmail");
const createdAt = document.getElementById("userCreation");

const fetchUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await response.json();
    console.log("Response status:", response.status);
    console.log("User data:", user);

    if (response.status === 401 || response.status === 403) {
      console.log("Unauthorized or forbidden, redirecting to login page.");
      window.location.href = "/login.html";
      return;
    }

    title.innerHTML = user.user.name;
    email.innerHTML = user.user.email;
    createdAt.innerHTML = user.user.createdAt;

  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération du profil:", error);
  }
};

fetchUser();