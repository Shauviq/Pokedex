import axios from "axios";
import { useEffect, useState } from "react";

function UsePokemonList(type){

    const [pokemonliststate , setpokemonliststate] = useState({
            pokemonlist : [],
            isloading : true,
            pokedex_url : 'https://pokeapi.co/api/v2/pokemon',
            nexturl : '',
            prevurl : '',
        })

        async function downloadPokemons(){

                setpokemonliststate((state) => ({...state , isloading: true}))
    
                const response = await axios.get(pokemonliststate.pokedex_url)
        
                const pokemonresults = response.data.results;
        
                setpokemonliststate((state) => ({...state, nexturl : response.data.next , prevurl : response.data.previous}))
                const pokemonresultpromise = pokemonresults.map((pokemon) => axios.get(pokemon.url))
                const pokemondata = await axios.all(pokemonresultpromise);
                const result = pokemondata.map((pokedata) => {
                    const pokemon = pokedata.data;
                    return {
                        id: pokemon.id,
                        name: pokemon.name, 
                        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                        types: pokemon.types 
                    }
                });
        
                setpokemonliststate((state) => ({...state , pokemonlist : result , isloading : false}))
            }

        useEffect(() => {
            downloadPokemons()
        },[pokemonliststate.pokedex_url])

        return[pokemonliststate,setpokemonliststate]
}

export default UsePokemonList;