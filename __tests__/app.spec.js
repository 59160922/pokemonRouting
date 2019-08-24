const request = require('supertest')
const chai = require('chai')
const app =require('../app')
chai.should()

describe('Pokemon API',()=>{
    describe('GET /',()=>{
        it('should return 200 OK with "Hello World"',(done) =>{
            request(app).get('/') //request to app module at / method get
                .expect(200)
                .end((err,res)=>{
                    res.body.should.deep.equal({message: 'Hello World'})
                    done()
                })
        })
    })

    describe('GET /pokemon/:id', ()=>{
        it('should return 200 Ok with a pokemon',(done)=>{
            request(app).get('/pokemon/1')
                .expect(200)
                .end((err,res)=>{
                    res.body.should.to.be.an('Object')
                    res.body.should.to.have.a.property('id')
                    res.body.should.to.have.a.property('name')
                    res.body.should.to.have.a.property('type')
                    
                    done()
                })
        }),
        it('should return 400 bad require',(done)=>{
            request(app).get('/pokemon/9')
            .expect(400)
            .end((err,res)=>{
             
                res.body.error.should.equal('The Pokemon could not be found')
                done()
            })
        })
    })
    describe('POST /pokemons',()=>{
        it('should return 201 Created and have new pokemon',(done)=>{
            request(app).post('/pokemons')
            .send({name:"Arbok",type:"Poison"})
            .set('Accept','application/json')
            .expect(201,done)
            
        })
        it('should return 400 Bad Request when missed required field',(done)=>{
            request(app).post('/pokemons',{type:"Poison"})
            .send({type:"Poison"})
            .set('Accept','application/json')
            .expect(400)
            .end((err,res)=>{
                res.body.error.should.equal('Insufficient parameters:name and type are required parameter')
                done()

            })
        })
        })
    

    describe('PUT /pokemon/:id',()=>{
        it('should return 200 OK and the pokemon has type2',(done)=>{
            request(app).put('/pokemon/1')
            .send({type2:"Poison"})
            .set('Accept','application/json')
            .expect(200,done)
        })
        it('should return 400 Bad Request when try to update not existed pokemon',(done)=>{
            request(app).put('/pokemon/9')
            .send({type2:"Poison"})
            .set('Accept','application/json')
            .expect(400)
            .end((err,res)=>{
                res.body.error.should.equal('The Pokemon could not be found')
                done()

            })
        })
    })
})





describe('Integraion test',()=>{
    it('GET / pokemons should return list of pokemons ',(done) =>{
        request('http://localhost:3000').get('/pokemons')
        .expect(200)
        .end((err,res)=>{
            res.body.should.be.a('array')
            done()
        })
    })
})
