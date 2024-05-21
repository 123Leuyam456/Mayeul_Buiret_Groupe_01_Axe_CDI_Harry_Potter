document.addEventListener('DOMContentLoaded', function () {
    // Initialisation de SimpleLightbox
    const lightbox = new SimpleLightbox(".card a");

    // Options pour Filterizr
    const options = {
        gutterPixels: 50,
        layout: 'sameWidth', // or 'vertical' if you prefer
    };

    let filterizr;

    // Fonction pour récupérer les données de l'API et créer une carte
    async function fetchCharacterData() {
        try {
            const response = await fetch('https://hp-api.lainocs.fr/characters');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            data.forEach(character => {
                createCard(character);
            });

            // Initialiser Filterizr après avoir ajouté toutes les cartes
            filterizr = new Filterizr('.contain-card', options);

            // Cacher toutes les cartes par défaut
            filterizr.filter('none');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Gestion des filtres de maison
    let filtersList = document.querySelectorAll(".filters li");
    filtersList.forEach(function (filterItem) {
        filterItem.addEventListener("click", function () {
            document.querySelector(".filters .active")?.classList.remove("active");
            this.classList.add("active");
            const filterValue = this.getAttribute("data-filter");
            filterizr.filter(filterValue);
        });
    });

    // Gestion de la recherche par texte
    const searchInput = document.querySelector('input[name="filtr-search"]');
    searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        filterCards(searchText);
    });

    function filterCards(searchText) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            if (cardTitle.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Fonction pour créer une carte et l'ajouter au DOM
    function createCard(character) {
        const card = document.createElement('div');
        card.className = 'card filtr-item';
        card.dataset.category = character.house || 'Unknown';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const cardTitle = document.createElement('p');
        cardTitle.className = 'card-title';
        cardTitle.textContent = character.name;

        const cardAxe = document.createElement('div');
        cardAxe.className = 'card-axe';
        cardAxe.textContent = character.house || 'Unknown';

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardAxe);

        const cardImage = document.createElement('img');
        cardImage.src = character.image;
        cardImage.alt = character.name;

        const cardLink = document.createElement('div');
        cardLink.appendChild(cardImage);

        card.appendChild(cardHeader);
        card.appendChild(cardLink);

        document.querySelector('.contain-card').appendChild(card);
        lightbox.refresh(); // Rafraîchit la lightbox pour inclure les nouveaux éléments
    }

    // Appel de la fonction pour récupérer les données et créer les cartes au chargement de la page
    fetchCharacterData();
});
