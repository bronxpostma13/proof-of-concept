// Importeer het npm package Express
import express from 'express'

// Importeer de Liquid package
import { Liquid } from 'liquidjs';

const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden
app.use('/assets' , express.static('assets'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views')


const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const pokemonResponseJSON = await pokemonResponse.json()
   const pokemons = await Promise.all(
    pokemonResponseJSON.results.map(async (entry) => {
      const detailResponse = await fetch(entry.url)
      const detail = await detailResponse.json()

      return {
        name: detail.name,
        id: detail.id,
        sprite: detail.sprites.other['official-artwork'].front_default,
        types: detail.types.map(t => t.type.name)  // bijv. ['grass', 'poison']
      }
    })
  )

// Maak een GET route voor de index
app.get('/', async function (request, response) {
 
  response.render('index.liquid', { pokemons })
})

// Stel de poort in
app.set('port', process.env.PORT || 8000)

// Start Express op
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

// 404-pagina als de route niet bestaat
app.use((request, response) => {
    response.render("404.liquid");
});
