Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
De opdracht die ik heb gekregen is het maken van een Pokédex app/site voor hypersolid.
De data voor deze site komt volledig van de PokéAPI, wat weer iets nieuws is.(normaal via directus)
Het ontwerp heb ik gebaseerd op de kleuren van de game pokedex
Het doel van de site is dat gebruikers Pokémon te kunnen bekijken,  en hun favoriete Pokémon kunnen opslaan in een persoonlijke collectie.


## Gebruik
### responsive
Dit zijn de mobile, tablet en desktop views:
<img width="1728" height="995" alt="Scherm­afbeelding 2026-06-21 om 19 07 11" src="https://github.com/user-attachments/assets/d5e46f57-b3cf-49ed-a477-dbdd3be59ec7" />

<img width="984" height="868" alt="Scherm­afbeelding 2026-06-21 om 19 07 31" src="https://github.com/user-attachments/assets/43bad72f-20cd-415e-b062-c17a9e605f5a" />

<img width="590" height="899" alt="Scherm­afbeelding 2026-06-21 om 19 08 45" src="https://github.com/user-attachments/assets/84d28ee2-1d72-4189-afbc-cdcc426eccef" />



### toegankelijk
Mijn site is ook goed toegankelijk. Zo heeft de site goede kleurcontrasten, semantische HTML, en een logische tab-structuur. ARIA-attributen voeg ik alleen toe waar dit functioneel nodig is, niet standaard.

## Kenmerken
Ik heb voor deze site gebruikgemaakt van onder andere LiquidJS, Node.js, Express en de PokéAPI.

### interactie
Met deze dingen heb ik uiteindelijk een interactie moeten maken met een POST route.
De interactie die ik heb gebouwd is dat gebruikers een Pokémon aan hun favorieten kunnen toevoegen vanaf de detailpagina. Dit gaat via een POST route naar een Directus REST API, waarna een toastmelding bevestigt dat de Pokémon is toegevoegd.
Daarnaast heb ik een zoekbalk waarmee gebruikers snel de Pokémon kunnen vinden die ze zoeken.

## Installatie
Stap 1. Fork en clone de repository
Stap 2. Open de repo in je code editor
Stap 3. Open de terminal (command + j op mac) en type daar npm install
Stap 4. Nadat de node modules zijn gedownload kan je met npm start de localhost openen en daar je site zien (je moet de server wel herstarten in je terminal als je aanpassingen maakt in je Node.js bestanden).

This project is licensed under the terms of the [MIT license](./LICENSE).
