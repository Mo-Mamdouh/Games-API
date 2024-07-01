let data=[]
async function fetchData(category ="MMORPG") {
    try {
        const response = await fetch(`https://www.freetogame.com/api/games?category=${category}`);
        data = await response.json();
        displayGames(data);
        console.log(category);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
window.onload = async function () {
    await fetchData();
};
const categoryLinks = document.querySelectorAll('.nav-link');

categoryLinks.forEach(link => {
    link.addEventListener('click', async function() {
        categoryLinks.forEach(otherLink => {
            otherLink.classList.remove('active');
        });
        link.classList.add('active');
        const category = link.getAttribute('data-category');
        await fetchData(category);
    });
});

function displayGames(data) {
    const gamesContainer = document.querySelector('#gameCards');
    gamesContainer.innerHTML = '';
    data.forEach(game => {
        const shortDescription = game.short_description.split(' ').slice(0, 25).join(' ');
        const gameCard= `
        <div class="col-sm-12 col-md-6 col-lg-3 mb-sm-0 cardHieght">    
        <div class="card h-100" role="button" id="${game.id}" onclick="details(event)">
               
                    <div class="card-body">
                        <img src="${game.thumbnail}" alt="${game.title}" class="w-100">
                        <div class="d-flex justify-content-between py-2">
                            <p class="title">${game.title}</p>
                            <span class="badge">Free</span>
                        </div>
                        <p class="text-center">${shortDescription}</p>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between">
                            <span class="badge">${game.genre}</span>
                            <span class="badge">${game.platform}</span>
                        </div>
                    </div>
               
            </div>
            </div>
            
        `;

        gamesContainer.innerHTML+=gameCard;
        
    });
}
function details(event) {
    const cardId = event.currentTarget.id;
    const gamesContainer = document.querySelector('.games');
    gamesContainer.classList.add('hidden');
    const detailsContainer = document.querySelector('#gameDetails');
    detailsContainer.classList.remove('hidden');
    const gameData = data.find(game => game.id == cardId);
        const Details = document.querySelector('#gameDetails');
        Details.innerHTML = `
            <div class="container">
                <div class="d-flex justify-content-between">
                    <h1 class="h3 py-4">Details Game</h1>
                    <button class="btn-close btn-close-white py-4" id="btnClose"></button>
                </div>
                <div class="row g-4" id="detailsContent">
                    <div class="col-md-4">
                        <img src="${gameData.thumbnail}" alt="${gameData.title}" class="w-100">
                    </div>
                    <div class="col-md-8">
                        <p class="title">${gameData.title}</p>
                        <p>Category: <span class="badge text-bg-info">${gameData.genre}</span></p>
                        <p>Platform: <span class="badge text-bg-info">${gameData.platform}</span></p>
                        <p>Status: <span class="badge text-bg-info">Live</span></p>
                        <p class="fs-6">${gameData.short_description}</p>
                        <a class="btn btn-outline-warning" target="_blank" href="${gameData.game_url}">Show Game</a>
                    </div>
                </div>
            </div>
        `;
        const btnClose = document.querySelector('#btnClose');
        btnClose.addEventListener('click', () => {
        Details.classList.add('hidden');
        gamesContainer.classList.remove('hidden');
});
}
