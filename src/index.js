const { request } = require('express')
const express= require('express')
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const customers = []

app.post("/account", (request,response)=>{
  const { cpf, name } = request.body;

  const customerAlredyExists = customers.some((customer) => customer.cpf === cpf);

  if(customerAlredyExists){
    return response.sendStatus(400).json({error:"Custumr alredy exists"})
  }
  const id = uuidv4()

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement:[]
  })
  return response.sendStatus(201).send();
})

app.get("/statement", (request, response)=>{
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer){
    return response.sendStatus(400).json({error:"Customer not found"});

  }

  return response.json(customer.statement);
})

app.listen(3333)