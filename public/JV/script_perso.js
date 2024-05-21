function fetchInfoCard(carte) {
  return fetch('https://hp-api.lainocs.fr/characters/' + carte)
    .then(response => response.json());
}

async function displayCardInfo(carte) {
  const data = await fetchInfoCard(carte);
  
  document.getElementById("head-img").innerHTML = `
    <img src="${data.image}" alt="${data.name}" /> 
  `;
  
  document.getElementById("titre-plan").innerHTML = `
    <h3 id="persNameTitle">${data.name}</h3>
  `;

  document.getElementById("contenu").innerHTML =` 
      <h3>Actor : <em>${data.actor ? data.actor : "None"}</em></h3>
      <h3>Eyes : <em>${data.eyes ? data.eyes : "None"}</em></h3>
      <h3>Hairs : <em>${data.hairs ? data.hairs : "None"}</em></h3>
      <h3>Blood : <em>${data.blood ? data.blood : "None"}</em></h3>
      <h3>Role : <em>${data.role ? data.role : "None"}</em></h3>
      <h3>House : <em>${data.house ? data.house : "None"}</em></h3>
      <h3>Wand : <em>${data.wand ? data.wand : "None"}</em></h3>
      <h3>Patronus : <em>${data.patronus ? data.patronus : "None"}</em></h3>
      `;

  
  async function updateLastCard() {
    const response = await fetch("/tutu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lastHouseVisited: data.house,
      }),
    });
    
    const newData = await response.json();
    const card = newData.message;
    console.log("house ", card);
  }
  
  updateLastCard();
}

const lastVisitedCharacter = localStorage.getItem('lastVisitedCharacter');
if (lastVisitedCharacter) {
    displayCardInfo(lastVisitedCharacter.replace(/ /g, '-').toLowerCase());
}

let accordeons = document.querySelectorAll(".accordeon");

for (let i = 0; i < accordeons.length; i++) {
  accordeons[i].addEventListener("click", function () {
    this.classList.toggle("open");
  });
}

const magicButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

magicButton.addEventListener("click", toggleNav);

// Permet de déverrouiller/montrer le menu nav
function toggleNav() {
  magicButton.classList.toggle("active");
  navigation.classList.toggle("active");
}