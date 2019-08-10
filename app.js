const express = require('express')
const app = express() //create express app invoke express
const port =3000
app.use(express.json())
var pokemons = [
                {name:'Cocoon' ,type:'Bug'},
                {name:'Nidorina',type:'poison'},
                { name:'Arbok',type:'Bug'}
               ]



app.get('/',(req,res) => res.send('Hello World!'))
//app.post('/pokemon',(req,res) => res.send(pokemon))
app.get('/pokemon',(req,res) => res.send(pokemons))

//POST /pokemon -> add pokemon to list
app.post('/pokemon',(req,res)=>{
  pokemons.push(req.body.body)
  res.sendStatus(201)
  console.log()
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))