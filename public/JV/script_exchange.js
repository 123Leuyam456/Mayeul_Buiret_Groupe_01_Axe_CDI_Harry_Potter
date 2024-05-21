const magicButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

magicButton.addEventListener("click", toggleNav);

// Permet de déverrouiller/montrer le menu nav
function toggleNav() {
  magicButton.classList.toggle("active");
  navigation.classList.toggle("active");
}