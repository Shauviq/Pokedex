import UseDebounce from '../../Hooks/UseDebounce';
import './search.css'

function Search({UpdateSearchTerm}){

    const debouncedCallback = UseDebounce((e) => UpdateSearchTerm(e.target.value),200);

    return(
        <div className='search-wrapper'>
            <input id='pokemon-name-search'
               type="text"
               placeholder="pokemon name...."
               onChange={debouncedCallback}
           />
        </div>
    )
}


export default Search;