import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

import './PokemonDetails.css'
import usePokemonList from "../../Hooks/usePokemonList";
import usepokemondetails from "../../Hooks/usepokemondetails";


function PokemonDetails({PokemonName}){
    const {id} = useParams();
    const [pokemon] = usepokemondetails(id , PokemonName);
    
    return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-detail-image" src={pokemon.image}/>
            <div className="pokemon-detail-name">name: {pokemon.name}</div>
            <div className="pokemon-detail-name">Height: {pokemon.height}</div>
            <div className="pokemon-detail-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-detail-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>

            {
                pokemon.types && pokemon.similarPokemon && 
                <div className="similarpokemonlist-wrapper">
                    More {pokemon.types[0]} type pokemons
                    <ul className="similarpokemonlist">
                        {pokemon.similarPokemon.map((p) => 
                            <li key={p.pokemon.url}>
                                {p.pokemon.name}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
}

export default PokemonDetails