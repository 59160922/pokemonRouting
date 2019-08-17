const express = require('express')
const app = express() //create express app invoke express
const port =3000
app.use(express.json())

class pokemon{
  constructor(name,type){
    this.name = name
    this.type = type
    this.id = null
  }
}

var pokemons = []
pokemons.push(createPokemon('Cocoon','Bug'))

function generateNewId(num){
  num+=1
  return num
}
function createPokemon(name,type){
  let p = new pokemon(name,type)
  p.id = generateNewId(pokemons.length)
  return p    

}

app.get('/',(req,res) => res.send('Hello World!'))
//app.post('/pokemon',(req,res) => res.send(pokemon))
app.get('/pokemon',(req,res) => res.send(pokemons))

//POST /pokemon -> add pokemon to list
app.post('/pokemon',(req,res)=>{
  let p = createPokemon(req.body.name,req.body.type)
  pokemons.push(p)
  res.sendStatus(201)
  console.log()
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))