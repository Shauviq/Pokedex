function UseDebounce(cb , delay = 1000){
    let timerid;

    return (...args) => {
        clearTimeout(timerid);
        timerid = setTimeout(() => {
            cb(...args);
        } , delay)
    }
}

export default UseDebounce;