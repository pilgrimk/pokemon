const express = require('express');
const request = require('request');
const port = process.env.PORT || 8000;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const app = express();

let pokemon;

function getPokemon(res, res, next) {
    const pokemonId = Math.floor(Math.random() * 965) + 1;
    const options = {
        url: `${pokeAPI}${pokemonId}`
    };
    request(options, function (err, res, body) {
        if (err) {
            console.error(`Request got an error: `, err);
            return next();
        }

        if (res.statusCode !== 200) {
            console.log(`Attempted to get Pokemon #${pokemonId}`);
            console.error(`Request was not successful ${res.body}`);
            return next();
        }

        pokemon = JSON.parse(body);
        console.log(`Setting global pokemon to ${pokemon.name}`);
        next();
    });
};

app.use(getPokemon);
function properName(str) {
    return str[0].toUpperCase() + str.slice(1);
}

app.get('/', function (req, res) {
    if (typeof pokemon.name !== 'string' || pokemon.name === '') {
        res.send(`Invalid pokemon`);
        return;
    };
    const body = `
        <div>
        <img src="${pokemon.sprites.front_default}">
            <ul>Stats
                <li>Name: ${properName(pokemon.name)}</li>
                <li>Height: ${pokemon.height}</li>
                <li>Weigt: ${pokemon.weight}</li>
            </ul>
        </div>`

    res.send(body);
});

app.listen(port, function (err) {
    if (err) {
        console.error(`Error starting server`)
    }
    console.log(`Server is running on port ${port}`);
});

/*
request(pokeAPI, function (err, res, body) {
    console.log('Error: ', err);
    console.log('Response: ', res);
    console.log('Body: ', body);
});
*/
