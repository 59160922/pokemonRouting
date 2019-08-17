const express = require("express");
const app = express(); //create express app invoke express

app.use(express.json());
//https://pokemon.fandom.com/wiki/List_of_Pok%C3%A9mon
class pokemon {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.id = null;
  }
}

var pokemons = [];
pokemons.push(createPokemon("Cocoon", "Bug"));
pokemons.push(createPokemon("Pikachu", "Electic"));

function generateNewId(num) {
  num += 1;
  return num;
}
function createPokemon(name, type) {
  let p = new pokemon(name, type);
  p.id = generateNewId(pokemons.length);
  return p;
}
function isSuffcientParam(v) {
  return v !== null && v !== "" && v !== undefined;
}
function isPokemonExisted(id) {
  return (
    pokemons[id - 1] !== null &&
    pokemons[id - 1] !== "" &&
    pokemons[id - 1] !== undefined
  );
}

app.get("/", (req, res) => res.send({ message: "Hello World" }));
//app.post('/pokemon',(req,res) => res.send(pokemon))
app.get("/pokemon", (req, res) => res.send(pokemons));

app.get("/pokemon/:id", (req, res) => {
  if (!isSuffcientParam(req.params.id - 1)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }

  if (
    pokemons[req.params.id - 1] === undefined ||
    pokemons[req.params.id - 1] === null
  ) {
    res.status(400).send({ error: "The Pokemon could not be found" });
    return;
  }
  res.send(pokemons[req.params.id - 1]);
});

app.put("/pokemon/:id", (req, res) => {
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
  if (pokemons[req.params.id - 1] === undefined) {
    res.status(400).send({ error: "The Pokemon could not be found" });
    return;
  }
  pokemons[req.params.id - 1].type2 = req.body.type2;
  //pokemons[req.params.id-1] = req.body
  res.sendStatus(200);
});

//POST /pokemon -> add pokemon to list
app.post("/pokemon", (req, res) => {
  if (!isSuffcientParam(req.body.name) || !isSuffcientParam(req.body.type)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }

  let p = createPokemon(req.body.name, req.body.type);
  pokemons.push(p);
  res.sendStatus(201);
});
app.delete("/pokemon/:id", (req, res) => {
  if (!isSuffcientParam(req.params.id)) {
    res
      .status(400)
      .send({
        error: "Insufficient parameters:name and type are required parameter"
      });
    return;
  }
  let id = req.params.id;

  if (!isPokemonExisted(id)) {
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

module.exports = app;
//app.listen(port, () => console.log(`Example app listening on port ${port}`))
