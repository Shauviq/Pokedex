import './pokemonlist.css'
import Pokemon from "../Pokemon/pokemon";
import usePokemonList from "../../Hooks/usePokemonList";

function PokemonList(){

    const [pokemonliststate, setpokemonliststate] = usePokemonList(false);

    return(
        <div className="Pokemon-list-wrapper">
          <div className="pokemon-wrapper">{(pokemonliststate.isloading) ? ' loading....' : pokemonliststate.pokemonlist.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}</div>
          <div className='controls'>
                <button disabled={pokemonliststate.prevurl==null} onClick={() => {
                    const urlsetto = pokemonliststate.prevurl
                    setpokemonliststate({...pokemonliststate, pokedex_url: urlsetto})}}>Prev</button>
                <button disabled={pokemonliststate.nexturl==null} onClick={() => {
                    const seturlto = pokemonliststate.nexturl;
                    setpokemonliststate({...pokemonliststate, pokedex_url: seturlto})}}>Next</button>
          </div>
        </div>
    )
}

export default PokemonList