import { useEffect, useState } from "react"
import axios from 'axios'
import './pokemonlist.css'
import Pokemon from "../Pokemon/pokemon";

function PokemonList(){

    const [pokemonlist , setpokemonlist] = useState([]);
    const [isloading , setisloading] = useState(true);
    const [pokedex_url , setpokedex_url] = useState('https://pokeapi.co/api/v2/pokemon');
    const[nexturl , setnexturl] = useState('');
    const[Prevurl, setprevurl] = useState('');

    async function downloadPokemons(){
        setisloading(true);

        const response = await axios.get(pokedex_url)

        const pokemonresults = response.data.results;

        setnexturl(response.data.next);
        setprevurl(response.data.previous);

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

        setpokemonlist(result);
        setisloading(false);
    }

    useEffect(() => {
        downloadPokemons();
    },[pokedex_url]);

    return(
        <div className="Pokemon-list-wrapper">
          <div className="pokemon-wrapper">{(isloading) ? ' loading....' : pokemonlist.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}</div>
          <div className='controls'>
                <button disabled={Prevurl==null} onClick={() => setpokedex_url(Prevurl)}>Prev</button>
                <button disabled={nexturl==null} onClick={() => setpokedex_url(nexturl)}>Next</button>
          </div>
        </div>
    )
}

export default PokemonList