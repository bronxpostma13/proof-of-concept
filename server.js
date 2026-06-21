// Importeer het npm package Express
import express from 'express'
// Importeer de Liquid package
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))
app.use('/assets', express.static('assets'))

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views')

const USER_ID = 2 // Bronx
async function fetchWithLimit(items, limit, fn) {
  const results = []
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index++
      results[current] = await fn(items[current], current)
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))
  return results
}
const regions = [
  { name: 'kanto', offset: 0, limit: 151 },
  { name: 'johto', offset: 151, limit: 100 },
  { name: 'hoenn', offset: 251, limit: 135 },
  { name: 'sinnoh', offset: 386, limit: 107 },
  { name: 'unova', offset: 494, limit: 155 },
  { name: 'kalos', offset: 649, limit: 72 },
  { name: 'alola', offset: 721, limit: 86 }
  
]

const pokemons = (await Promise.all(
  regions.map(async (region) => {
    const regionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${region.offset}&limit=${region.limit}`)
    const regionResponseJSON = await regionResponse.json()

    return fetchWithLimit(regionResponseJSON.results, 10, async (entry) => {
        const detailResponse = await fetch(entry.url)
        const detail = await detailResponse.json()
        return {
          name: detail.name,
          id: detail.id,
          dex: detail.id.toString().padStart(4, '0'),
          sprite: detail.sprites.other['official-artwork'].front_default,
          types: detail.types.map(t => t.type.name),
          stats: detail.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
          region: region.name
        }
      })
    
  })
)).flat()

function flattenChain(node, list = []) {
  list.push(node.species.name)
  node.evolves_to.forEach(next => flattenChain(next, list))
  return list
}

async function getUserCatches() {
  const response = await fetch(`https://fdnd-agency.directus.app/items/pokemon_catches?filter[user_id][_eq]=${USER_ID}`)
  const json = await response.json()
  return json.data
}

app.get('/', async function (request, response) {
  const catches = await getUserCatches()
  const favoriteIds = catches.map(c => c.pokemon_id)
  response.render('index.liquid', { pokemons, favoriteIds, page: 'index' })
})

app.get('/favorites', async function (request, response) {
  const catches = await getUserCatches()
  const favoriteIds = catches.map(c => c.pokemon_id)
  const favoritePokemons = pokemons.filter(p => favoriteIds.includes(p.id))
  response.render('index.liquid', { pokemons: favoritePokemons, favoriteIds, page: 'favorites' })
})

app.get('/pokemon-detail/:id', async function (request, response) {
  const pokemon = pokemons.find(p => p.id === Number(request.params.id))

  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
  const species = await speciesResponse.json()

  const flavorTextEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en')
  const description = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ') : ''

  const evolutionChainResponse = await fetch(species.evolution_chain.url)
  const evolutionChainJSON = await evolutionChainResponse.json()
  const evolutionNames = flattenChain(evolutionChainJSON.chain).filter(name => name !== pokemon.name)
  const evolutions = pokemons.filter(p => evolutionNames.includes(p.name))

  response.render('detail.liquid', {
    pokemon: { ...pokemon, description, evolutions }
  })
})

app.post('/favorites/:pokemonId', async function (request, response) {
  await fetch('https://fdnd-agency.directus.app/items/pokemon_catches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pokemon_id: Number(request.params.pokemonId), user_id: USER_ID })
  })
  response.sendStatus(200)
})

app.delete('/favorites/:pokemonId', async function (request, response) {
  const catches = await getUserCatches()
  const match = catches.find(c => c.pokemon_id === Number(request.params.pokemonId))

  if (match) {
    await fetch(`https://fdnd-agency.directus.app/items/pokemon_catches/${match.id}`, {
      method: 'DELETE'
    })
  }

  response.sendStatus(200)
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.use((request, response) => {
  response.render("404.liquid");
});