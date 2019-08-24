const express = require("express");
const pokemonsRouter = require('./pokemons/router') 
const app = express(); //create express app invoke express


app.use(express.json())
app.use('/',pokemonsRouter)

 app.get("/", (req, res) => res.send({ message: "Hello World" }));


module.exports = app;
//app.listen(port, () => console.log(`Example app listening on port ${port}`))
