const express =require('express')
const router =express.Router()
const pokemon =require('./pokemon')

function isSuffcientParam(v) {
  return v !== null && v !== "" && v !== undefined;
}

router.get("/pokemons", (req, res) => res.send(pokemon.getPokemon()));

//router.get("/pokemons", (req, res) => res.send(pokemons));

router.get("/pokemon/:id", (req, res) => {
  if (!isSuffcientParam(req.params.id - 1)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }

  if (!pokemon.isPokemonExisted(req.params.id)) {
    res.status(400).send({ error: "The Pokemon could not be found" });
    return;
  }
  res.send(pokemon.getPokemonById(req.params.id));
});

router.put("/pokemon/:id", (req, res) => {
  if (!isSuffcientParam(req.body.type2)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters: type2 is required parameter"
      });
    return;
  }
  if (!isSuffcientParam(req.params.id)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters: id is required parameter"
      });
    return;
  }
  if (!pokemon.isPokemonExisted(req.params.id)) {
    res.status(400).send({ error: "The Pokemon could not be found" });
    return;
  }
  let p = pokemon.getPokemonById(req.params.id)
  let success = pokemon.update(p)
  if(!success){
    res.status(400).send({ error:"The Pokemon fail edit type"})
  }
  //pokemons[req.params.id-1] = req.body
  res.sendStatus(200);
});

//POST /pokemon -> add pokemon to list
router.post("/pokemons", (req, res) => {
  if (!isSuffcientParam(req.body.name) || !isSuffcientParam(req.body.type)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }

//  let p = pokemon.createPokemon(req.body.name, req.body.type);
  let success = pokemon.savePokemon(req.body.name, req.body.type);
  if(!success){
res.status(400).send({ error: 'Create pokemon fail'});
  }
  
  res.sendStatus(201);
});

router.delete("/pokemon/:id", (req, res) => {
  if (!isSuffcientParam(req.params.id)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }
  let id = req.params.id;

  if (!pokemon.isPokemonExisted(id)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }

  delete pokemons[id - 1];
  res.send(204);
});


module.exports = router