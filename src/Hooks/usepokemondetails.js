import axios from "axios";
import { useEffect, useState } from "react";
import UsePokemonList from "./usePokemonList";

function usepokemondetails(id){
    const [pokemon , setpokemon] = useState({});

    async function downloadpokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonofsametypes = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`)

        setpokemon(state => ({
            ...state, 
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=>t.type.name),
        }));

        pokemonofsametypes.then((response) => {
            setpokemon(state => ({
                ...state, 
                similarPokemon: response.data.pokemon.slice(0,9)
            }));
        })

        setpokemonliststate({...pokemonliststate , type: response.data.types ? response.data.types[0].type.name : ''})
    }

    const [pokemonliststate, setpokemonliststate] = UsePokemonList()

    useEffect(() => {
        downloadpokemon();
    },[]);

    return [pokemon];
}

export default usepokemondetails