const pokemonGrid = document.getElementById('pokemon-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');
const searchInput = document.getElementById('search-input');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const typeFiltersContainer = document.getElementById('type-filters');

let allPokemons = [];
let offset = 0;
const limit = 20;
const maxPokemon = 151;
let activeTypeFilter = 'all';

// Favorites
let favorites = JSON.parse(localStorage.getItem('pokedex_favorites')) || [];

// Comparison State
let isComparisonMode = false;
let comparisonList = [];

const colors = {
    grass: 'bg-green-500',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    bug: 'bg-lime-600',
    normal: 'bg-neutral-400',
    poison: 'bg-fuchsia-600',
    electric: 'bg-yellow-400',
    ground: 'bg-amber-600',
    fairy: 'bg-pink-400',
    fighting: 'bg-red-700',
    psychic: 'bg-pink-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    ice: 'bg-cyan-400',
    dragon: 'bg-violet-600',
    dark: 'bg-stone-700',
    steel: 'bg-slate-400',
    flying: 'bg-indigo-400',
};

const typeTranslations = {
    grass: 'Grama',
    fire: 'Fogo',
    water: 'Água',
    bug: 'Inseto',
    normal: 'Normal',
    poison: 'Venenoso',
    electric: 'Elétrico',
    ground: 'Terra',
    fairy: 'Fada',
    fighting: 'Lutador',
    psychic: 'Psíquico',
    rock: 'Pedra',
    ghost: 'Fantasma',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Sombrio',
    steel: 'Aço',
    flying: 'Voador',
};

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons();
    renderTypeFilters();

    searchInput.addEventListener('input', (e) => {
        filterPokemon();
    });

    loadMoreBtn.addEventListener('click', () => {
        offset += limit;
        fetchPokemons();
    });

    // Minigame Listeners
    document.getElementById('game-btn').addEventListener('click', () => {
        document.getElementById('game-modal').classList.remove('hidden');
        startGame();
    });

    // Comparison Listeners
    document.getElementById('compare-mode-btn').addEventListener('click', () => {
        if (isComparisonMode && comparisonList.length === 2) {
            openComparisonModal();
        } else {
            toggleComparisonMode();
        }
    });
});

function renderTypeFilters() {
    Object.keys(colors).forEach(type => {
        const btn = document.createElement('button');
        btn.className = `px-5 py-2 rounded-full text-sm font-semibold shrink-0 shadow-sm hover:shadow-md transition-all bg-white text-gray-600 capitalize`;
        btn.textContent = typeTranslations[type] || type;
        btn.dataset.type = type;

        btn.addEventListener('click', () => {
            document.querySelectorAll('#type-filters button').forEach(b => {
                b.classList.remove('bg-gray-800', 'text-white');
                if (b.dataset.type !== 'favorites') b.classList.add('bg-white', 'text-gray-600');
            });

            if (activeTypeFilter === type) {
                activeTypeFilter = 'all';
                document.querySelector('[data-type="all"]').classList.add('bg-gray-800', 'text-white');
                document.querySelector('[data-type="all"]').classList.remove('bg-white', 'text-gray-600');
            } else {
                activeTypeFilter = type;
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-gray-800', 'text-white');
            }
            filterPokemon();
        });

        typeFiltersContainer.appendChild(btn);
    });

    const allBtn = document.querySelector('[data-type="all"]');
    allBtn.addEventListener('click', () => {
        activeTypeFilter = 'all';
        resetFilterStyles();
        allBtn.classList.remove('bg-white', 'text-gray-600');
        allBtn.classList.add('bg-gray-800', 'text-white');
        filterPokemon();
    });

    const favBtn = document.querySelector('[data-type="favorites"]');
    favBtn.addEventListener('click', () => {
        if (activeTypeFilter === 'favorites') {
            activeTypeFilter = 'all';
            resetFilterStyles();
            document.querySelector('[data-type="all"]').classList.add('bg-gray-800', 'text-white');
            document.querySelector('[data-type="all"]').classList.remove('bg-white', 'text-gray-600');
        } else {
            activeTypeFilter = 'favorites';
            resetFilterStyles();
            favBtn.classList.add('ring-2', 'ring-red-400');
        }
        filterPokemon();
    });
}

function resetFilterStyles() {
    document.querySelectorAll('#type-filters button').forEach(b => {
        if (b.dataset.type === 'favorites') {
            b.classList.remove('ring-2', 'ring-red-400');
        } else {
            b.classList.remove('bg-gray-800', 'text-white');
            b.classList.add('bg-white', 'text-gray-600');
        }
    });
}

function isFavorite(id) {
    return favorites.includes(id);
}

function toggleFavorite(id, btnElement) {
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
        if (btnElement) fillHeart(btnElement);
    } else {
        favorites.splice(index, 1);
        if (btnElement) emptyHeart(btnElement);
        if (activeTypeFilter === 'favorites') filterPokemon();
    }
    localStorage.setItem('pokedex_favorites', JSON.stringify(favorites));
}

function fillHeart(element) {
    element.classList.remove('text-white/50', 'text-gray-300');
    element.classList.add('text-red-500', 'fill-current');
}

function emptyHeart(element) {
    element.classList.remove('text-red-500', 'fill-current');
    element.classList.add(element.tagName === 'svg' ? 'text-gray-300' : 'text-white/50');
}


async function fetchPokemons() {
    try {
        const promises = [];
        const end = Math.min(offset + limit, maxPokemon);

        if (offset >= maxPokemon) return;

        for (let i = offset + 1; i <= end; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then(res => res.json()));
        }

        const results = await Promise.all(promises);

        results.forEach(pokemon => {
            const formattedPokemon = {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(type => type.type.name),
                img: pokemon.sprites.other['official-artwork'].front_default,
                stats: pokemon.stats,
                height: pokemon.height,
                weight: pokemon.weight,
                cries: pokemon.cries
            };
            allPokemons.push(formattedPokemon);
            createPokemonCard(formattedPokemon);
        });

        if (offset + limit >= maxPokemon) {
            loadMoreContainer.classList.add('hidden');
        } else {
            loadMoreContainer.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
}

function createPokemonCard(pokemon) {
    const mainType = pokemon.types[0];

    const card = document.createElement('div');
    card.className = `pokemon-card relative p-6 rounded-[2rem] shadow-lg cursor-pointer overflow-hidden bg-white hover:shadow-2xl transition-all duration-300`;
    card.style.background = `linear-gradient(135deg, white 60%, var(--tw-color-${mainType}) 100%)`;
    card.classList.add(`border-2`, `border-transparent`, `hover:border-${mainType}-400`);
    card.dataset.id = pokemon.id;

    // Comparison State Check
    if (isComparisonMode) {
        card.classList.add('comparing');
        if (comparisonList.some(p => p.id === pokemon.id)) {
            card.classList.add('selected-compare');
        }
    }

    const idFormatted = String(pokemon.id).padStart(3, '0');
    const isFav = isFavorite(pokemon.id);

    card.innerHTML = `
        <div class="flex justify-between items-start z-10 relative">
            <div>
                <span class="text-sm font-bold text-gray-400">#${idFormatted}</span>
                <h2 class="text-2xl font-bold capitalize text-gray-800 mb-2">${pokemon.name}</h2>
                <div class="flex gap-2">
                    ${pokemon.types.map(type => `
                        <span class="type-badge text-xs font-semibold px-3 py-1 rounded-full text-white ${colors[type]} shadow-sm">
                            ${typeTranslations[type] || type}
                        </span>
                    `).join('')}
                </div>
            </div>
            <button class="fav-btn p-2 rounded-full hover:bg-black/5 transition-colors z-20" data-id="${pokemon.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isFav ? 'text-red-500 fill-current' : 'text-gray-300'}" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>
        
        <div class="absolute -right-4 -bottom-4 w-40 h-40 opacity-10 bg-black rounded-full z-0"></div>
        
        <div class="flex justify-end mt-4 relative z-10">
            <img src="${pokemon.img}" alt="${pokemon.name}" class="w-32 h-32 object-contain drop-shadow-lg transform hover:scale-110 transition-transform duration-300">
        </div>

        <!-- Comparison Overlay -->
        <div class="comparison-overlay">
            <div class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg transform scale-0 transition-transform duration-200 check-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div class="text-indigo-600 bg-white/90 px-4 py-2 rounded-full font-bold shadow-sm opacity-100 select-text">
                Selecionar
            </div>
        </div>
    `;

    // 3D Tilt Initialization
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(card, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
    } else {
        // Fallback or retry later if script loads async
        setTimeout(() => {
            if (typeof VanillaTilt !== 'undefined') VanillaTilt.init(card, { max: 15, speed: 400, glare: true });
        }, 1000);
    }

    // Handlers
    card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;

        if (isComparisonMode) {
            handleComparisonSelection(pokemon, card);
        } else {
            openModal(pokemon);
        }
    });

    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(pokemon.id, favBtn.querySelector('svg'));
    });

    pokemonGrid.appendChild(card);
}


function filterPokemon() {
    const searchTerm = searchInput.value.toLowerCase();

    // Clear Grid
    pokemonGrid.innerHTML = '';

    // Filter
    const filtered = allPokemons.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm) || String(pokemon.id).includes(searchTerm);
        let matchesType = true;
        if (activeTypeFilter !== 'all') {
            if (activeTypeFilter === 'favorites') {
                matchesType = isFavorite(pokemon.id);
            } else {
                matchesType = pokemon.types.includes(activeTypeFilter);
            }
        }
        return matchesSearch && matchesType;
    });

    filtered.forEach(pokemon => createPokemonCard(pokemon));

    if (searchTerm.length > 0 || activeTypeFilter !== 'all') {
        loadMoreContainer.classList.add('hidden');
    } else if (offset + limit < maxPokemon) {
        loadMoreContainer.classList.remove('hidden');
    }
}

// ==========================================
//           MODAL & DETAILS
// ==========================================

async function openModal(pokemon) {
    const mainType = pokemon.types[0];
    const colorClass = colors[mainType] || 'bg-gray-400';

    if (pokemon.cries && pokemon.cries.latest) {
        const audio = new Audio(pokemon.cries.latest);
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio needed interaction"));
    }

    const modalHeaderBg = document.getElementById('modal-header-bg');
    modalHeaderBg.className = `w-full md:w-2/5 p-8 flex flex-col items-center justify-center relative text-white ${colorClass}`;

    document.getElementById('modal-id').textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    document.getElementById('modal-img').src = pokemon.img;
    document.getElementById('modal-name').textContent = pokemon.name;

    const typesContainer = document.getElementById('modal-types');
    typesContainer.innerHTML = pokemon.types.map(type => `
        <span class="text-sm font-semibold px-4 py-1.5 rounded-full text-white bg-black/10 backdrop-blur-md border border-white/20 capitalize">
            ${typeTranslations[type] || type}
        </span>
    `).join('');

    const modalFavBtn = document.getElementById('modal-fav-btn');
    const modalFavSvg = modalFavBtn.querySelector('svg');
    modalFavSvg.classList.remove('text-red-500', 'fill-current');
    modalFavSvg.classList.add('text-gray-300');

    if (isFavorite(pokemon.id)) fillHeart(modalFavSvg);

    const newFavBtn = modalFavBtn.cloneNode(true);
    modalFavBtn.parentNode.replaceChild(newFavBtn, modalFavBtn);

    newFavBtn.addEventListener('click', () => {
        toggleFavorite(pokemon.id, newFavBtn.querySelector('svg'));
        const gridCard = document.querySelector(`.pokemon-card[data-id="${pokemon.id}"] .fav-btn svg`);
        if (gridCard) {
            if (isFavorite(pokemon.id)) fillHeart(gridCard);
            else emptyHeart(gridCard);
        }
    });

    const statsContainer = document.getElementById('modal-stats');
    const statTranslations = { 'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF', 'special-attack': 'SpA', 'special-defense': 'SpD', 'speed': 'SPD' };

    statsContainer.innerHTML = pokemon.stats.map(stat => {
        const value = stat.base_stat;
        const maxStat = 255;
        const percentage = (value / maxStat) * 100;
        let barColor = 'bg-red-400';
        if (value >= 60) barColor = 'bg-yellow-400';
        if (value >= 100) barColor = 'bg-green-400';

        return `
            <div class="grid grid-cols-4 gap-4 items-center">
                <span class="text-sm font-semibold text-gray-500 uppercase col-span-1">${statTranslations[stat.stat.name] || stat.stat.name}</span>
                <span class="text-sm font-bold text-gray-800 text-right col-span-1">${value}</span>
                <div class="col-span-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full ${barColor} rounded-full stat-bar-fill" style="--stat-width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');

    const descriptionEl = document.getElementById('modal-description');
    const evolutionEl = document.getElementById('modal-evolution');
    descriptionEl.textContent = 'Carregando...';
    evolutionEl.innerHTML = '<p class="text-sm text-gray-400">Carregando...</p>';

    modalOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        modalOverlay.classList.add('modal-open');
        modalContent.classList.add('modal-content-open');
    });

    try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        const speciesData = await speciesRes.json();
        const flavorEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        descriptionEl.textContent = flavorEntry ? flavorEntry.flavor_text.replace(/\f/g, ' ') : 'Descrição não disponível.';
        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();
        const chain = getEvolutionChain(evolutionData.chain);
        renderEvolutionChain(chain, evolutionEl);
    } catch (error) {
        console.error("Error fetching species details:", error);
    }
}

function getEvolutionChain(chain) {
    const evolutions = [];
    let current = chain;
    while (current) {
        const id = current.species.url.split('/').filter(Boolean).pop();
        evolutions.push({
            name: current.species.name,
            id: id,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        });
        current = current.evolves_to[0];
    }
    return evolutions;
}

function renderEvolutionChain(chain, container) {
    if (chain.length <= 1) {
        container.innerHTML = '<p class="text-sm text-gray-400 italic">Este Pokemon não evolui.</p>';
        return;
    }
    container.innerHTML = chain.map((evo, index) => {
        const isLast = index === chain.length - 1;
        return `
            <div class="flex items-center gap-2">
                <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform" onclick="closeModal(); setTimeout(() => openModalById(${evo.id}), 350)">
                    <div class="w-16 h-16 rounded-full bg-gray-100 p-2 overflow-hidden border border-gray-200">
                        <img src="${evo.img}" alt="${evo.name}" class="w-full h-full object-contain">
                    </div>
                    <span class="text-xs font-semibold text-gray-600 mt-1 capitalize">${evo.name}</span>
                </div>
                ${!isLast ? `<span class="text-gray-300 font-bold text-lg">→</span>` : ''}
            </div>
        `;
    }).join('');
}

async function openModalById(id) {
    let pokemon = allPokemons.find(p => p.id === parseInt(id));
    if (!pokemon) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            pokemon = {
                id: data.id,
                name: data.name,
                types: data.types.map(type => type.type.name),
                img: data.sprites.other['official-artwork'].front_default,
                stats: data.stats,
                height: data.height,
                weight: data.weight,
                cries: data.cries
            };
        } catch (e) { return; }
    }
    openModal(pokemon);
}

function closeModal() {
    modalOverlay.classList.remove('modal-open');
    modalContent.classList.remove('modal-content-open');
    setTimeout(() => { modalOverlay.classList.add('hidden'); }, 300);
}

modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ==========================================
//           MINIGAME LOGIC
// ==========================================
let currentStreak = 0;
let correctPokemon;

function startGame() {
    if (allPokemons.length < 4) {
        alert("Aguarde carregar mais Pokemons para jogar!");
        return;
    }

    // Reset UI
    const imgMsg = document.getElementById('game-feedback');
    const imgEl = document.getElementById('game-img');
    const optionsDiv = document.getElementById('game-options');
    imgMsg.textContent = "";
    imgEl.classList.add('silhouette');
    imgEl.classList.remove('reveal');
    optionsDiv.innerHTML = '';

    // Pick Random
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    correctPokemon = allPokemons[randomIndex];
    imgEl.src = correctPokemon.img;

    // Pick Distractors
    const options = [correctPokemon];
    while (options.length < 4) {
        const r = allPokemons[Math.floor(Math.random() * allPokemons.length)];
        if (!options.includes(r)) options.push(r);
    }

    // Shuffle
    options.sort(() => Math.random() - 0.5);

    // Render Options
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "bg-gray-800 text-white py-3 rounded-xl font-bold border-2 border-gray-700 hover:bg-gray-700 hover:border-yellow-400 transition-all capitalize";
        btn.textContent = opt.name;
        btn.onclick = () => checkAnswer(opt, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const feedback = document.getElementById('game-feedback');
    const imgEl = document.getElementById('game-img');

    if (selected.id === correctPokemon.id) {
        // Win
        feedback.textContent = "ACERTOU!";
        feedback.className = "h-8 text-xl font-bold mb-4 text-green-400 animate-bounce";
        imgEl.classList.remove('silhouette');
        imgEl.classList.add('reveal');

        currentStreak++;
        document.getElementById('game-streak').textContent = currentStreak;

        // Disable all buttons
        const btns = document.querySelectorAll('#game-options button');
        btns.forEach(b => b.disabled = true);
        btn.classList.add('bg-green-600', 'border-green-400');

        // Play sound if available
        if (correctPokemon.cries && correctPokemon.cries.latest) {
            const audio = new Audio(correctPokemon.cries.latest);
            audio.play().catch(() => { });
        }

    } else {
        // Lose
        feedback.textContent = "Tente Novamente!";
        feedback.className = "h-8 text-xl font-bold mb-4 text-red-400 animate-shake";
        btn.classList.add('bg-red-600', 'border-red-400', 'opacity-50');
        currentStreak = 0;
        document.getElementById('game-streak').textContent = currentStreak;
    }
}

function closeGameModal() {
    document.getElementById('game-modal').classList.add('hidden');
}


// ==========================================
//           COMPARISON TOOL
// ==========================================

function toggleComparisonMode() {
    isComparisonMode = !isComparisonMode;
    comparisonList = []; // Reset selection on toggle

    const btn = document.getElementById('compare-mode-btn');
    const countSpan = document.getElementById('compare-count');

    if (isComparisonMode) {
        btn.classList.remove('bg-indigo-600');
        btn.classList.add('bg-indigo-800', 'ring-2', 'ring-offset-2', 'ring-indigo-600');
        btn.innerHTML = `Cancelar Comparação <span id="compare-count" class="bg-white text-indigo-800 text-xs px-2 py-0.5 rounded-full ml-1">0</span>`;
        document.querySelectorAll('.pokemon-card').forEach(card => card.classList.add('comparing'));
    } else {
        btn.classList.add('bg-indigo-600');
        btn.classList.remove('bg-indigo-800', 'ring-2', 'ring-offset-2', 'ring-indigo-600');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg> Comparar <span id="compare-count" class="hidden bg-white text-indigo-600 text-xs px-2 py-0.5 rounded-full ml-1">0</span>`;

        // Remove Classes
        document.querySelectorAll('.pokemon-card').forEach(card => {
            card.classList.remove('comparing', 'selected-compare');
            card.querySelector('.check-icon').classList.add('scale-0');
            card.querySelector('.select-text').textContent = 'Selecionar';
        });
    }
}

function handleComparisonSelection(pokemon, cardElement) {
    const isSelected = comparisonList.some(p => p.id === pokemon.id);

    if (isSelected) {
        // Deselect
        comparisonList = comparisonList.filter(p => p.id !== pokemon.id);
        cardElement.classList.remove('selected-compare');
        cardElement.querySelector('.check-icon').classList.add('scale-0');
        cardElement.querySelector('.select-text').textContent = 'Selecionar';
    } else {
        // Select logic
        if (comparisonList.length >= 2) {
            alert("Você só pode comparar 2 Pokémons por vez!");
            return;
        }
        comparisonList.push(pokemon);
        cardElement.classList.add('selected-compare');
        cardElement.querySelector('.check-icon').classList.remove('scale-0');
        cardElement.querySelector('.select-text').textContent = 'Selecionado';
    }

    updateCompareButton();
}

function updateCompareButton() {
    const btn = document.getElementById('compare-mode-btn');
    const span = document.getElementById('compare-count');

    if (span) span.textContent = comparisonList.length;

    if (comparisonList.length === 2) {
        btn.innerHTML = `VER COMPARAÇÃO (2)`;
        btn.classList.add('animate-pulse', 'bg-green-600');
        btn.classList.remove('bg-indigo-800');

        // Override Click listener temporarily or check state inside listener
        // For simplicity, we can let the user click the same button
    } else {
        // Reset text if deselecting
        if (comparisonList.length < 2 && btn.textContent.includes("VER")) {
            btn.innerHTML = `Cancelar Comparação <span id="compare-count" class="bg-white text-indigo-800 text-xs px-2 py-0.5 rounded-full ml-1">${comparisonList.length}</span>`;
            btn.classList.remove('animate-pulse', 'bg-green-600');
            btn.classList.add('bg-indigo-800');
        }
    }
}

function openComparisonModal() {
    if (comparisonList.length !== 2) return;

    const [p1, p2] = comparisonList;
    const content = document.getElementById('comparison-content');
    const statTranslations = { 'hp': 'HP', 'attack': 'Attack', 'defense': 'Defense', 'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', 'speed': 'Speed' };

    // Build HTML
    content.innerHTML = `
        <!-- Pokemon 1 -->
        <div class="flex flex-col items-center">
             <img src="${p1.img}" class="w-48 h-48 object-contain mb-4 filter drop-shadow-xl">
             <h3 class="text-2xl font-bold capitalize text-gray-800">${p1.name}</h3>
             <div class="flex gap-2 mt-2 mb-6">
                ${p1.types.map(t => `<span class="px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-600 capitalize">${t}</span>`).join('')}
             </div>
        </div>

        <!-- Pokemon 2 -->
        <div class="flex flex-col items-center order-last md:order-none">
             <img src="${p2.img}" class="w-48 h-48 object-contain mb-4 filter drop-shadow-xl">
             <h3 class="text-2xl font-bold capitalize text-gray-800">${p2.name}</h3>
             <div class="flex gap-2 mt-2 mb-6">
                ${p2.types.map(t => `<span class="px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-600 capitalize">${t}</span>`).join('')}
             </div>
        </div>
        
        <!-- Stats Comparison Table (Full Width Col Spanning) -->
        <div class="col-span-1 md:col-span-2 w-full mt-4 bg-gray-50 rounded-2xl p-6">
            ${p1.stats.map((s, i) => {
        const statName = s.stat.name;
        const v1 = s.base_stat;
        const v2 = p2.stats[i].base_stat;

        const w1 = (v1 / 255) * 100;
        const w2 = (v2 / 255) * 100;

        const win1 = v1 > v2 ? 'text-green-600 font-bold' : 'text-gray-500';
        const win2 = v2 > v1 ? 'text-green-600 font-bold' : 'text-gray-500';

        return `
                    <div class="mb-4">
                        <div class="flex justify-between text-sm mb-1 px-2">
                            <span class="${win1}">${v1}</span>
                            <span class="font-bold text-gray-400 uppercase tracking-widest">${statTranslations[statName] || statName}</span>
                            <span class="${win2}">${v2}</span>
                        </div>
                        <div class="flex h-3 bg-gray-200 rounded-full overflow-hidden relative">
                            <!-- Center Line -->
                            <div class="absolute inset-y-0 left-1/2 w-0.5 bg-white z-10"></div>
                            
                            <!-- Left Bar (P1) - Reversed direction for effect -->
                            <div class="w-1/2 flex justify-end">
                                <div class="h-full bg-blue-500 rounded-l-full" style="width: ${Math.min(w1, 100)}%"></div>
                            </div>
                            
                            <!-- Right Bar (P2) -->
                            <div class="w-1/2 flex justify-start">
                                <div class="h-full bg-red-500 rounded-r-full" style="width: ${Math.min(w2, 100)}%"></div>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    document.getElementById('comparison-modal').classList.remove('hidden');
}

function closeComparisonModal() {
    document.getElementById('comparison-modal').classList.add('hidden');
}
