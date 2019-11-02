


export const fetchAllPokemon = () => {
  return $.ajax({
    method: "GET",
    url: "api/pokemon"
  })
}



// module.export = fetchAllPokemon;