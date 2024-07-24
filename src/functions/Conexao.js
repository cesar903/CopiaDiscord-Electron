const mongoose = require("mongoose")

const endereco = "mongodb+srv://admin:admin@cesar.wsjekpm.mongodb.net/"
const configuracao = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set("strictQuery", false)

mongoose.connect(endereco, configuracao)
    .then(function () {
        console.log("CONECTADO COM O BANCO DE DADOS!")
    })

    .catch(function (erro) {
        console.log(erro.message)
    })

    

