import { useEffect, useState } from 'react';
import PokemonList from '../PokemonList/pokemonlist';
import Search from '../Search/Search';


//css import
import './pokedex.css';
import PokemonDetails from '../PokemonDetails/pokemondetails';


function Pokedex(){

    const [searchterm , setsearchterm] = useState('');


    return(
        <>
         <div className="pokedex-wrapper">
            <Search UpdateSearchTerm = {setsearchterm}/>
            {(!searchterm) ? <PokemonList/> : <PokemonDetails key={searchterm} PokemonName={searchterm}/>}
         </div>
        </>
    )
}

export default Pokedex;