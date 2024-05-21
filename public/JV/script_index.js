const magicButton = document.querySelector(".nav-toggler")
const navigation = document.querySelector("nav")

magicButton.addEventListener("click", toggleNav)
/*Permet de dévérouiller/montrer le menu nav*/
function toggleNav(){
  magicButton.classList.toggle("active")
  navigation.classList.toggle("active")
}

async function getLastCard() {
  const response = await fetch("/tutu");
  const data = await response.json();
  const card = data.message;
  console.log("house", card);

}

getLastCard();