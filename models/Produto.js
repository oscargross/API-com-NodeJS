const mongoose = require('mongoose')
 
const Produto = new mongoose.Schema({
  produto: {
    type: String,
    required: true  
  },
  produtoValor: {
      type: String,
      required: true
  }},{
      timestamps: true//Cria automaticamente o createApp e updateApp
});

mongoose.model("produto", Produto);