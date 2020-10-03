const { response } = require('express');
const express = require ('express')
const mongoose = require('mongoose')
 
const app = express();
app.use(express.json());

require('./models/Produto')
const Produto = mongoose.model('produto')

mongoose.connect('mongodb://localhost/base403', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com mongo Successfully");
}).catch((err) => console.log("Conexão errada"));

app.get('/', (req, res) => {
    Produto.find({}).then((produto) => {
        return res.json(produto)
    }).catch((err) => {
       return res.status(400).json({
           error: true,
           messege: "Nenhum Produto encontrado"
       })
    })
})
app.post("/produto", (req, res) => {
    const produto = Produto.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
    
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});


app.put("/produto/:id", (req, res) => {
    const produto = Produto.updateOne({_id:req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            messege: "Produto não foi alterado"
        })
        return res.json({
            error: false,
            messege:"Produto alterao com sucesso"
        })
    })
})

app.delete("/produto/:id", (req, res) => {
    const produto = Produto.deleteOne({_id:req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message:"Não foi possivel deletar produto"
        })
        return res.json({
            error: false,
            messege: "Produto apagado com sucesso"
        })
    })
})



app.get("/produto/:id", (req, res) => {

    Produto.findOne({_id: req.params.id})
        .then((produto) => {return res.json(produto)})
        .catch((err) => {return res.status(400).json({
            error: true,
            messege: "Não foi possível encontrar id"
        })})


})

app.listen(3000, () => {
    console.log("IT'S RUNNING");
})