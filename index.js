const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const app = document.getElementById("app");

const loading = document.createElement("p");
loading.innerText = "Loading...";
loading.classList.add("loading");

let currentPokemon = 1;

async function loadAndRenderPokemons() {
  const pokemonElement = document.getElementById("pokemonContainer");
  pokemonElement.remove();

  app.appendChild(loading);

  const pokemon = await getPokemon();
  loading.remove();
  app.appendChild(createPokemon(pokemon));
}

function goPrev() {
  if(currentPokemon <= 1) return;
  currentPokemon -= 1;
  loadAndRenderPokemons();
}

function goNext() {
  if(currentPokemon >= 893) return;
  currentPokemon += 1;
  loadAndRenderPokemons();
}

function createButtons() {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Prev.";
  buttonContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  buttonContainer.appendChild(nextButton);

  prevButton.addEventListener('click', goPrev);
  nextButton.addEventListener('click', goNext);

  return buttonContainer;
}

async function getPokemon() {
  const response = await fetch(`${baseUrl}${currentPokemon}`)
  const result = await response.json();
  return result;
}

function createPokemon( pokemon ) {
  const pokemonElement = document.createElement("div");
  pokemonElement.id = "pokemonContainer";
  pokemonElement.classList.add("pokemon-container");

  const pokemonImage= document.createElement("img");
  pokemonImage.src =
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;
  pokemonImage.classList.add("pokemonImage");
  pokemonElement.appendChild(pokemonImage);

  const pokemonInfo = document.createElement("div");
  pokemonElement.appendChild(pokemonInfo);

  const pokemonId = document.createElement("p");
  pokemonId.classList.add("pokemon-id");
  pokemonId.innerText = pokemon.id;
  pokemonInfo.appendChild(pokemonId);

  const pokemonName = document.createElement("p");
  pokemonName.innerText = pokemon.name[0].toUpperCase() + pokemon.name;
  pokemonName.classList.add("pokemon-name");
  pokemonInfo.appendChild(pokemonName);

  const pokemonTypes = document.createElement("div");
  pokemonTypes.classList.add("pokemon-types");

  pokemon.types.forEach(type => {
    const typeElement = document.createElement("div");
    typeElement.classList.add(type.type.name);
    typeElement.innerText = type.type.name;
    pokemonTypes.appendChild(typeElement);
  });
  pokemonInfo.appendChild(pokemonTypes);

  const buttons = createButtons();
  pokemonElement.appendChild(buttons);

  return pokemonElement;
}

async function init() {
  app.appendChild(loading);
  const pokemon = await getPokemon(1);
  loading.remove();
  app.appendChild(createPokemon(pokemon));
}

init();