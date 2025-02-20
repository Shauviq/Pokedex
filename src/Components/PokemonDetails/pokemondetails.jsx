import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

import './PokemonDetails.css'

function PokemonDetails(){
    
    const {id} = useParams();
    const [pokemon , setpokemon] = useState({});

    async function downloadpokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=>t.type.name)
        })
    }

    console.log(pokemon)

    useEffect(() => {
        downloadpokemon();
    },[]);
    
    return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-detail-image" src={pokemon.image}/>
            <div className="pokemon-detail-name">name: {pokemon.name}</div>
            <div className="pokemon-detail-name">Height: {pokemon.height}</div>
            <div className="pokemon-detail-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-detail-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>
        </div>
    );
}

export default PokemonDetails