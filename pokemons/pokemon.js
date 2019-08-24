class pokemon {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.id = null;
    }
  }
let pokemons = [];

function savePokemon(name,type){
    let p = createPokemon(name,type)
    pokemons.push(p)
    return true

}
function mock(){
    pokemons.push(createPokemon("Cocoon", "Bug"));
    pokemons.push(createPokemon("Pikachu", "Electic"));
    }
function generateNewId(num) {
      num += 1;
      return num;
    }
function createPokemon(name, type) {
      let p = new pokemon(name, type);
      p.id = generateNewId(pokemons.length);
      return p;
    }
function isPokemonExisted(id) {
        return (
          pokemons[id - 1] !== null &&
          pokemons[id - 1] !== "" &&
          pokemons[id - 1] !== undefined
        );
      }
function update(pokemon){
        pokemons[pokemon.id -1] = pokemon
        return true
      }

function getPokemon(){
return pokemons
}
function getPokemonById(id)
{
return pokemons[id-1]
}      
mock()      
module.exports.isPokemonExisted= isPokemonExisted
module.exports.savePokemon = savePokemon
module.exports.update = update
module.exports.getPokemon = getPokemon
module.exports.getPokemonById = getPokemonById
