import PokemonList from '../PokemonList/pokemonlist';
import Search from '../Search/Search';


//css import
import './pokedex.css';


function Pokedex(){
    return(
        <>
         <div className="pokedex-wrapper">
            <Search/>
            <PokemonList/>
         </div>
        </>
    )
}

export default Pokedex;