document.addEventListener('DOMContentLoaded', function () {
    const lightbox = new SimpleLightbox(".card a");

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

            const options = {
                gutterPixels: 50,
            };

            let filterizr = new Filterizr(".contain-card", options);

            let filtersList = document.querySelectorAll(".filters li");
            filtersList.forEach(function (filterItem) {
                filterItem.addEventListener("click", function () {
                    document.querySelector(".filters .active")?.classList.remove("active");
                    this.classList.add("active");
                    const filterValue = this.getAttribute("data-filter");
                    if (filterValue === 'all') {
                        filterizr.filter('all');
                    } else {
                        filterizr.filter(filterValue);
                    }
                });
            });

            document.querySelector('[data-filter="all"]').classList.add('active');
            filterizr.filter('all');

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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

        const cardLink = document.createElement('a');
        cardLink.href = `perso.html?name=${encodeURIComponent(character.name)}`;
        cardLink.appendChild(cardImage);

        card.appendChild(cardHeader);
        card.appendChild(cardLink);

        card.addEventListener('click', function() {
            localStorage.setItem('lastVisitedCharacter', character.name);
            window.location.href = 'perso.html';
        });

        document.querySelector('.contain-card').appendChild(card);
        lightbox.refresh();
    }

    fetchCharacterData();
});

document.addEventListener('DOMContentLoaded', function() {
    const lastVisitedCharacter = localStorage.getItem('lastVisitedCharacter');
    if (lastVisitedCharacter) {
        
        displayCardInfo(lastVisitedCharacter.replace(/ /g, '-').toLowerCase()); 
    }
});